import { useForm } from '@tanstack/react-form';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import BtnRect from './buttons/BtnRect';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import Icon from '@mdi/react';
import { mdiCloseBox, mdiImagePlus } from '@mdi/js';
import useCreateWeaponMutation from '../hooks/useCreateWeaponMutation/useCreateWeaponMutation';
import Loading from './Loading';
import FormLayout from '../layouts/FormLayout';
import { useLocation, useParams } from 'react-router-dom';
import useDeleteWeaponMutation from '../hooks/useDeleteWeaponMutation/useDeleteWeaponMutation';
import { Keyword } from 'src/types/keyword';
import SelectField from './SelectField';
import { WeaponStats } from 'src/types/weapon';
import useModifyWeaponMutation from '../hooks/useModifyWeaponMutation/useModifyWeaponMutation';
import ArrowHeader2 from './ArrowHeader2';
import Divider from './Divider';
import { Action } from 'src/types/action';
import ActionLinkField from './form_fields/ActionLinkField';
import ArmorLinkField from './form_fields/ArmorLinkField';
import WeaponLinkField from './form_fields/WeaponLinkField';
import KeywordLinkField from './form_fields/KeywordLinkField';
import { extractItemListIds, extractKeywordListIds } from '../utils/extractIds';
import useItemQuery from 'src/hooks/useItemQuery/useItemQuery';
import { Item } from 'src/types/item';
import useWeapons from 'src/hooks/useWeapons';
import useArmor from 'src/hooks/useArmor';

const WeaponForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { weaponId } = useParams();
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const mode = parts[parts.length - 1];

  const { data: weapon } = useItemQuery(apiUrl, Number(weaponId), 'weapon');

  const { filteredWeapons: weapons } = useWeapons({
    excludedKeywords: ['Cyber Weapon', 'Vehicle Weapon', 'Drone Weapon'],
  });

  const { filteredArmor: armors } = useArmor({
    excludedKeywords: ['Cyber Armor'],
  });

  const [imagePreview, setImagePreview] = useState(
    weapon?.picture?.imageUrl || '',
  );

  const createWeapon = useCreateWeaponMutation(
    apiUrl,
    setFormMessage,
    Number(weaponId),
  );
  const modifyWeapon = useModifyWeaponMutation(
    apiUrl,
    Number(weaponId),
    setFormMessage,
  );
  const deleteWeapon = useDeleteWeaponMutation(
    apiUrl,
    Number(weaponId),
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

  useEffect(() => {
    if (weapon) {
      setImagePreview(weapon.picture?.imageUrl);
    }
  }, [weapon]);

  const weaponForm = useForm({
    defaultValues: {
      id: weapon?.id || null,
      name: weapon?.name || '',
      rarity: weapon?.rarity || '',
      grade: weapon?.grade || 1,
      picture: weapon?.picture || '',
      description: weapon?.description || '',
      price: weapon?.price || '',
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
        power: weapon?.stats.power || '',
      } as WeaponStats,
      weapons:
        weapon?.itemLinkReference?.items.filter(
          (item: Item) => item.itemType === 'weapon',
        ) || ([] as Item[]),
      armor:
        weapon?.itemLinkReference?.items.filter(
          (item: Item) => item.itemType === 'armor',
        ) || ([] as Item[]),
      actions: weapon?.itemLinkReference?.actions || ([] as Action[]),
      keywords:
        weapon?.keywords || ([] as { keyword: Keyword; value?: number }[]),
    },
    onSubmit: async ({ value }) => {
      value.stats.currentAmmoCount = value.stats.magCapacity;
      value.stats.currentMagCount = value.stats.magCount
        ? value.stats.magCount - 1
        : 0;

      value.stats.currentPower = value.stats.power
        ? value.stats.power
        : undefined;

      const filteredStats = Object.fromEntries(
        Object.entries(value.stats).filter(([_, val]) => val),
      );

      value.stats = { ...filteredStats };

      const { weapons, armor, actions, keywords, ...rest } = value;

      const data = {
        ...rest,
        itemIds: extractItemListIds([...value.weapons, ...value.armor]),
        actionIds: extractItemListIds(value.actions),
        keywordIds: extractKeywordListIds(value.keywords),
      };

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'picture' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });

      if (mode === 'create' || mode === 'update') {
        await createWeapon.mutate(formData);
      } else if (mode === 'modify') {
        await modifyWeapon.mutate(formData);
      }
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      weaponForm.setFieldValue('picture', selectedFile);

      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

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
          <h1>{mode.charAt(0).toUpperCase() + mode.slice(1) + ' Weapon'}</h1>
        </div>
        <Divider />
        <ArrowHeader2 title="Weapon Information" />
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
        <div className="flex flex-col gap-8 sm:flex-row">
          <ThemeContainer
            className="mx-auto w-full max-w-sm"
            chamfer="medium"
            borderColor={accentPrimary}
            overflowHidden={true}
          >
            {!imagePreview ? (
              <label className="bg-secondary flex aspect-square size-full w-full cursor-pointer flex-col items-center justify-center">
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
              <TextAreaField label="Weapon description" field={field} />
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
            <weaponForm.Field name="stats.power">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Power"
                  field={field}
                />
              )}
            </weaponForm.Field>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <KeywordLinkField form={weaponForm} keywordType="weapon" />
          <Divider />
          <WeaponLinkField form={weaponForm} weaponList={weapons} />
          <Divider />
          <ArmorLinkField form={weaponForm} armorList={armors} />
          <Divider />
          <ActionLinkField form={weaponForm} />
          <Divider />
        </div>
        <BtnRect
          ariaLabel={mode.charAt(0).toUpperCase() + mode.slice(1)}
          type="submit"
          className="group w-full"
        >
          {createWeapon.isPending || modifyWeapon.isPending ? (
            <Loading
              className="group-hover:text-yellow-300 dark:text-gray-900"
              size={1.15}
            />
          ) : (
            mode.charAt(0).toUpperCase() + mode.slice(1)
          )}
        </BtnRect>
      </form>
    </FormLayout>
  );
};

export default WeaponForm;
