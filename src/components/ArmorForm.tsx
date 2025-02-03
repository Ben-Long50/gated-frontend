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
import Loading from './Loading';
import useCreateArmorMutation from '../hooks/useCreateArmorMutation/useCreateArmorMutation';
import FormLayout from '../layouts/FormLayout';
import ArmorIcon from './icons/ArmorIcon';
import { useParams } from 'react-router-dom';
import InputFieldBasic from './InputFieldBasic';
import useDeleteArmorMutation from '../hooks/useDeleteArmorMutation/useDeleteArmorMutation';
import { Keyword } from 'src/types/keyword';
import SelectField from './SelectField';
import useArmorPieceQuery from '../hooks/useArmorPieceQuery/useArmorPieceQuery';

const ArmorForm = ({ title, mode }: { title: string; mode?: string }) => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { armorId } = useParams();

  const { data: armor } = useArmorPieceQuery(apiUrl, armorId);

  const keywords = useKeywords('armor');

  const [imagePreview, setImagePreview] = useState(
    armor?.picture?.imageUrl || '',
  );

  const createArmor = useCreateArmorMutation(apiUrl, setFormMessage);
  const deleteArmor = useDeleteArmorMutation(apiUrl, armorId, setFormMessage);

  const handleDelete = () => {
    if (deleteMode) {
      deleteArmor.mutate();
    } else {
      setDeleteMode(true);
    }
  };

  const handleReset = async () => {
    armorForm.reset();
  };

  const armorKeywordData = armor?.keywords.map(
    (item: { keyword: Keyword; value?: number }) => {
      return { keywordId: item.keyword.id, value: item.value };
    },
  );

  useEffect(() => {
    if (armor) {
      setImagePreview(armor.picture?.imageUrl);
    } else setImagePreview('');
  }, [armor, armorId]);

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

  const armorForm = useForm({
    defaultValues: {
      name: armor?.name || '',
      rarity: armor?.rarity || '',
      grade: armor?.grade || 1,
      picture: armor?.picture || '',
      description: armor?.description || '',
      stats: {
        armor: armor?.stats.armor || '',
        ward: armor?.stats.ward || '',
        block: armor?.stats.block || '',
        power: armor?.stats.power || '',
        weight: armor?.stats.weight || '',
      },
      price: armor?.price || null,
      keywords:
        armorKeywordData || ([] as { keywordId: number; value?: number }[]),
    },
    onSubmit: async ({ value }) => {
      const filteredStats = Object.fromEntries(
        Object.entries(value.stats).filter(([stat, val]) => val),
      );

      value.stats = filteredStats;

      console.log(value);

      const formData = new FormData();

      Object.entries(value).forEach(([key, value]) => {
        if (key === 'picture' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });
      formData.append('armorId', JSON.stringify(armorId || 0));
      await createArmor.mutate(formData);
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file

    if (selectedFile) {
      armorForm.setFieldValue('picture', selectedFile);

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
      itemId={armorId}
      createMutation={createArmor}
      deleteMutation={deleteArmor}
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
          armorForm.handleSubmit();
        }}
      >
        <div className="flex items-center justify-center gap-4">
          <ArmorIcon className="size-12" />
          <h1>{title} Armor</h1>
        </div>
        <div className="flex w-full gap-4 lg:gap-8">
          <armorForm.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Armor name must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <InputField className="grow" label="Armor name" field={field} />
            )}
          </armorForm.Field>
          <armorForm.Field name="price">
            {(field) => (
              <InputField
                className="max-w-28"
                type="number"
                label="Price"
                field={field}
              />
            )}
          </armorForm.Field>
        </div>
        <div className="flex w-full items-center gap-4 lg:gap-8">
          <armorForm.Field
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
          </armorForm.Field>
          <armorForm.Field
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
          </armorForm.Field>
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
                    Upload armor picture
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
                    armorForm.setFieldValue('picture', '');
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
          <armorForm.Field
            name="description"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Armor description must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <TextAreaField
                className="h-40 w-full sm:h-full"
                label="Armor description"
                field={field}
              />
            )}
          </armorForm.Field>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
            <armorForm.Field name="stats.armor">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Armor value"
                  field={field}
                />
              )}
            </armorForm.Field>
            <armorForm.Field name="stats.ward">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Ward value"
                  field={field}
                />
              )}
            </armorForm.Field>
            <armorForm.Field name="stats.block">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Block points"
                  field={field}
                />
              )}
            </armorForm.Field>
            <armorForm.Field name="stats.power">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Power"
                  field={field}
                />
              )}
            </armorForm.Field>
            <armorForm.Field name="stats.weight">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Weight"
                  field={field}
                />
              )}
            </armorForm.Field>
          </div>
        </div>
        <hr className="border-yellow-300 border-opacity-50" />
        <h2>Armor keywords</h2>
        <searchForm.Field name="query">
          {(field) => (
            <InputField
              label="Search keywords"
              field={field}
              onChange={() => {
                searchForm.handleSubmit();
              }}
            />
          )}
        </searchForm.Field>
        <armorForm.Field name="keywords">
          {(field) => (
            <div className="scrollbar-primary-2 flex max-h-[364px] flex-col gap-4 overflow-y-auto pr-2 md:grid md:grid-cols-2">
              {keywords.filteredKeywords.map((keyword) => {
                const activeKeyword = field.state.value.find(
                  (item: { keywordId: number; value?: number }) =>
                    item.keywordId === keyword.id,
                );
                return (
                  <div key={keyword.id} className="flex items-center gap-4">
                    <KeywordCard className="w-full" keyword={keyword}>
                      {activeKeyword && (
                        <InputFieldBasic
                          className="max-w-20"
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
        </armorForm.Field>
        <BtnRect type="submit" className="group w-full">
          {createArmor.isPending ? (
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

export default ArmorForm;
