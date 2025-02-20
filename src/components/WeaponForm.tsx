import { useForm } from '@tanstack/react-form';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import BtnRect from './buttons/BtnRect';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import useKeywords from '../hooks/useKeywords';
import KeywordCard from './KeywordCard';
import Icon from '@mdi/react';
import { mdiCloseBox, mdiImagePlus } from '@mdi/js';
import useCreateWeaponMutation from '../hooks/useCreateWeaponMutation/useCreateWeaponMutation';
import Loading from './Loading';
import InputFieldBasic from './InputFieldBasic';
import FormLayout from '../layouts/FormLayout';
import { useParams } from 'react-router-dom';
import useDeleteWeaponMutation from '../hooks/useDeleteWeaponMutation/useDeleteWeaponMutation';
import { Keyword } from 'src/types/keyword';
import SelectField from './SelectField';
import useWeaponQuery from '../hooks/useWeaponQuery/useWeaponQuery';
import SubactionForm from './SubactionForm';
import { WeaponStats } from 'src/types/weapon';
import useModifyWeaponMutation from '../hooks/useModifyWeaponMutation/useModifyWeaponMutation';

const WeaponForm = ({ title, mode }: { title: string; mode?: string }) => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { weaponId } = useParams();

  const { data: weapon } = useWeaponQuery(apiUrl, weaponId);

  const keywords = useKeywords('weapon');

  const [imagePreview, setImagePreview] = useState(
    weapon?.picture?.imageUrl || '',
  );

  const createWeapon = useCreateWeaponMutation(apiUrl, setFormMessage);
  const modifyWeapon = useModifyWeaponMutation(
    apiUrl,
    weaponId,
    setFormMessage,
  );
  const deleteWeapon = useDeleteWeaponMutation(
    apiUrl,
    weaponId,
    setFormMessage,
  );

  const handleDelete = () => {
    if (deleteMode) {
      deleteWeapon.mutate();
    } else {
      setDeleteMode(true);
    }
  };

  const handleReset = async () => {
    weaponForm.reset();
  };

  const weaponKeywordData = weapon?.keywords.map(
    (item: { keyword: Keyword; value?: number }) => {
      return { keywordId: item.keyword.id, value: item.value };
    },
  );

  useEffect(() => {
    if (weapon) {
      setImagePreview(weapon.picture?.imageUrl);
    }
  }, [weapon]);

  const searchForm = useForm({
    defaultValues: {
      query: '',
    },
    onSubmit: ({ value }) => {
      if (value.query === '') {
        keywords.resetList();
      } else {
        keywords.filterByQuery(value.query);
      }
    },
  });

  const weaponForm = useForm({
    defaultValues: {
      name: weapon?.name || '',
      rarity: weapon?.rarity || '',
      grade: weapon?.grade || 1,
      picture: weapon?.picture || '',
      description: weapon?.description || '',
      stats: {
        damage: weapon?.stats.damage || '',
        salvo: weapon?.stats.salvo || '',
        flurry: weapon?.stats.flurry || '',
        range: weapon?.stats.range || '',
        magCapacity: weapon?.stats.magCapacity || '',
        currentAmmoCount: weapon?.stats.currentAmmoCount || '',
        magCount: weapon?.stats.magCount || '',
        currentMagCount: weapon?.stats.currentMagCount || '',
        weight: weapon?.stats.weight || '',
      } as WeaponStats,
      actions:
        weapon?.actions ||
        ([] as {
          name: string;
          costs: { stat: string; value: number }[];
          roll: { attribute: string; skill: string }[];
          actionType: string;
          actionSubtypes: string[];
          duration: {
            unit: string;
            value: number;
          };
          description: string;
        }[]),
      price: weapon?.price || null,
      keywords:
        weaponKeywordData || ([] as { keywordId: number; value?: number }[]),
    },
    onSubmit: async ({ value }) => {
      value.stats.currentAmmoCount = value.stats.magCapacity;
      value.stats.currentMagCount = value.stats.magCount
        ? value.stats.magCount - 1
        : 0;

      const filteredStats = Object.fromEntries(
        Object.entries(value.stats).filter(([_, val]) => val),
      );

      value.stats = { ...filteredStats };

      const formData = new FormData();

      Object.entries(value).forEach(([key, value]) => {
        if (key === 'picture' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });
      formData.append('weaponId', JSON.stringify(weaponId || 0));

      if (mode === 'create' || mode === 'update') {
        await createWeapon.mutate(formData);
      } else if (mode === 'modify') {
        await modifyWeapon.mutate(formData);
      }
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file

    if (selectedFile) {
      weaponForm.setFieldValue('picture', selectedFile);

      // Create a URL for the selected file to preview
      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

  if (keywords.isLoading || keywords.isPending) {
    return <Loading />;
  }

  return (
    <FormLayout
      itemId={weaponId}
      createMutation={createWeapon}
      modifyMutation={modifyWeapon}
      deleteMutation={deleteWeapon}
      handleDelete={handleDelete}
      handleReset={handleReset}
      formMessage={formMessage}
      deleteMode={deleteMode}
      setDeleteMode={setDeleteMode}
    >
      <form
        className="flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          weaponForm.handleSubmit();
        }}
      >
        <div className="flex items-center justify-center gap-4">
          <h1>{title} Weapon</h1>
        </div>
        <div className="flex w-full gap-4 lg:gap-8">
          <weaponForm.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Weapon name must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <InputField className="grow" label="Weapon name" field={field} />
            )}
          </weaponForm.Field>
          <weaponForm.Field
            name="price"
            validators={{
              onChange: ({ value }) => {
                if (value < 0) {
                  return 'Price cannot be negative';
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <InputField
                className="max-w-28"
                type="number"
                label="Price"
                field={field}
              />
            )}
          </weaponForm.Field>
        </div>
        <div className="flex w-full items-center gap-4 lg:gap-8">
          <weaponForm.Field
            name="rarity"
            validators={{
              onSubmit: ({ value }) => (!value ? 'Select a rarity' : undefined),
            }}
          >
            {(field) => (
              <SelectField className="w-full" label="Item rarity" field={field}>
                <option value=""></option>
                <option value="common">Common</option>
                <option value="uncommon">Uncommon</option>
                <option value="rare">Rare</option>
                <option value="blackMarket">Black Market</option>
                <option value="artifact">Artifact</option>
              </SelectField>
            )}
          </weaponForm.Field>
          <weaponForm.Field
            name="grade"
            validators={{
              onChange: ({ value }) =>
                value <= 0 ? 'Minimum grade is 1' : undefined,
            }}
          >
            {(field) => (
              <InputField
                className="w-full max-w-28"
                type="number"
                label="Item grade"
                field={field}
              />
            )}
          </weaponForm.Field>
        </div>
        <div className="flex flex-col gap-8 sm:grid sm:grid-cols-2 sm:grid-rows-1">
          <ThemeContainer
            className="mx-auto w-full max-w-sm"
            chamfer="24"
            borderColor={accentPrimary}
          >
            {!imagePreview ? (
              <label className="bg-secondary flex aspect-square size-full w-full cursor-pointer flex-col items-center justify-center clip-6">
                <div className="flex flex-col items-center justify-center gap-2 pb-6 pt-5">
                  <Icon
                    className="text-tertiary"
                    path={mdiImagePlus}
                    size={3}
                  />
                  <p className="text-tertiary font-semibold">
                    Upload weapon picture
                  </p>
                  <p className="text-tertiary">PNG, JPG, JPEG</p>
                </div>
                <input
                  id="file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="bg-secondary relative flex aspect-square max-w-4xl items-center justify-center overflow-hidden bg-black clip-6">
                <img
                  className="fade-in-bottom"
                  src={imagePreview}
                  alt="Preview"
                />
                <button
                  className="text-secondary absolute right-2 top-2"
                  onClick={() => {
                    weaponForm.setFieldValue('picture', '');
                    setImagePreview('');
                  }}
                >
                  <div className="rounded bg-zinc-950">
                    <Icon path={mdiCloseBox} size={1.5} />
                  </div>
                </button>
              </div>
            )}
          </ThemeContainer>
          <weaponForm.Field
            name="description"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Weapon description must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <TextAreaField
                className="h-40 w-full sm:h-full"
                label="Weapon description"
                field={field}
              />
            )}
          </weaponForm.Field>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
            <weaponForm.Field name="stats.damage">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Damage"
                  field={field}
                />
              )}
            </weaponForm.Field>
            <weaponForm.Field name="stats.salvo">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Salvo"
                  field={field}
                />
              )}
            </weaponForm.Field>
            <weaponForm.Field name="stats.flurry">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Flurry"
                  field={field}
                />
              )}
            </weaponForm.Field>
            <weaponForm.Field name="stats.range">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Range"
                  field={field}
                />
              )}
            </weaponForm.Field>
            <weaponForm.Field name="stats.magCapacity">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Mag. capacity"
                  field={field}
                />
              )}
            </weaponForm.Field>
            <weaponForm.Field name="stats.magCount">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Mag. count"
                  field={field}
                />
              )}
            </weaponForm.Field>
            <weaponForm.Field name="stats.weight">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Weight"
                  field={field}
                />
              )}
            </weaponForm.Field>
          </div>
        </div>
        <hr className="border-yellow-300 border-opacity-50" />
        <SubactionForm form={weaponForm} />
        <hr className="border-yellow-300 border-opacity-50" />
        <h2>Weapon keywords</h2>
        <searchForm.Field name="query">
          {(field) => (
            <InputField
              className="col-span-2"
              label="Search keywords"
              field={field}
              onChange={() => {
                searchForm.handleSubmit();
              }}
            />
          )}
        </searchForm.Field>
        <weaponForm.Field name="keywords">
          {(field) => (
            <div className="scrollbar-primary-2 flex max-h-[364px] flex-col gap-4 overflow-y-auto pr-2 md:grid md:grid-cols-2">
              {keywords.filteredKeywords.map((keyword) => {
                const activeKeyword = field.state.value.find(
                  (item: { keywordId: number; value?: number }) =>
                    item.keywordId === keyword.id,
                );
                return (
                  <div key={keyword.id} className="flex items-center gap-4">
                    <KeywordCard keyword={keyword}>
                      {activeKeyword && (
                        <InputFieldBasic
                          className="max-w-20 shrink-0"
                          type="number"
                          label="Value"
                          value={activeKeyword.value}
                          onChange={(value: number) => {
                            const updatedValue = field.state.value.some(
                              (item: { keywordId: number; value?: number }) =>
                                item.keywordId === keyword.id,
                            )
                              ? field.state.value.map(
                                  (item: {
                                    keywordId: number;
                                    value?: number;
                                  }) =>
                                    item.keywordId === keyword.id
                                      ? { ...item, value }
                                      : item,
                                )
                              : [...field.state.value, { ...keyword, value }];
                            field.handleChange(updatedValue);
                          }}
                        />
                      )}
                    </KeywordCard>
                    <div className="flex flex-col items-center gap-4">
                      <input
                        className="size-6 shrink-0"
                        type="checkbox"
                        checked={activeKeyword}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.handleChange([
                              ...field.state.value,
                              { keywordId: keyword.id },
                            ]);
                          } else {
                            field.handleChange(
                              field.state.value.filter(
                                (item: { keywordId: number; value?: number }) =>
                                  item.keywordId !== keyword.id,
                              ),
                            );
                          }
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </weaponForm.Field>
        <BtnRect type="submit" className="group w-full">
          {createWeapon.isPending || modifyWeapon.isPending ? (
            <Loading
              className="group-hover:text-yellow-300 dark:text-gray-900"
              size={1.15}
            />
          ) : (
            title
          )}
        </BtnRect>
      </form>
    </FormLayout>
  );
};

export default WeaponForm;
