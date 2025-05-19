import { useForm } from '@tanstack/react-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import BtnRect from './buttons/BtnRect';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import useKeywords from '../hooks/useKeywords';
import Loading from './Loading';
import useCreateArmorMutation from '../hooks/useCreateArmorMutation/useCreateArmorMutation';
import FormLayout from '../layouts/FormLayout';
import { useLocation, useParams } from 'react-router-dom';
import useDeleteArmorMutation from '../hooks/useDeleteArmorMutation/useDeleteArmorMutation';
import { Keyword } from 'src/types/keyword';
import { ArmorStats } from 'src/types/armor';
import useModifyArmorMutation from '../hooks/useModifyArmorMutation/useModifyArmorMutation';
import ArrowHeader2 from './ArrowHeader2';
import Divider from './Divider';
import { Action } from 'src/types/action';

import WeaponLinkField from './form_fields/WeaponLinkField';
import ArmorLinkField from './form_fields/ArmorLinkField';
import ActionLinkField from './form_fields/ActionLinkField';
import KeywordLinkField from './form_fields/KeywordLinkField';
import { extractItemListIds, extractKeywordListIds } from '../utils/extractIds';
import { Item } from 'src/types/item';
import useItemQuery from 'src/hooks/useItemQuery/useItemQuery';
import useWeapons from 'src/hooks/useWeapons';
import useArmor from 'src/hooks/useArmor';
import PictureField from './form_fields/PictureField';
import RarityField from './form_fields/RarityField';

const ArmorForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { armorId } = useParams();
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const mode = parts[parts.length - 1];

  const { data: armor } = useItemQuery(apiUrl, Number(armorId), 'armor');

  const { filteredWeapons: weapons } = useWeapons({
    excludedKeywords: ['Cyber Weapon', 'Vehicle Weapon', 'Drone Weapon'],
  });

  const { filteredArmor: armors } = useArmor({
    excludedKeywords: ['Cyber Armor'],
  });

  const keywords = useKeywords('armor');

  const createArmor = useCreateArmorMutation(
    apiUrl,
    setFormMessage,
    Number(armorId),
  );

  const modifyArmor = useModifyArmorMutation(
    apiUrl,
    Number(armorId),
    setFormMessage,
  );
  const deleteArmor = useDeleteArmorMutation(
    apiUrl,
    Number(armorId),
    setFormMessage,
  );

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

  const armorForm = useForm({
    defaultValues: {
      id: armor?.id || null,
      name: armor?.name || '',
      rarity: armor?.rarity || '',
      grade: armor?.grade || 1,
      picture: armor?.picture || '',
      position: armor?.picture?.position || { x: 50, y: 50 },
      description: armor?.description || '',
      price: armor?.price || '',
      stats: {
        armor: armor?.stats.armor || '',
        ward: armor?.stats.ward || '',
        block: armor?.stats.block || '',
        currentBlock: armor?.stats.currentBlock || '',
        power: armor?.stats.power || '',
        currentPower: armor?.stats.currentPower || '',
        weight: armor?.stats.weight || '',
      } as ArmorStats,
      weapons:
        armor?.itemLinkReference?.items.filter(
          (item: Item) => item.itemType === 'weapon',
        ) || ([] as Item[]),
      armor:
        armor?.itemLinkReference?.items.filter(
          (item: Item) => item.itemType === 'armor',
        ) || ([] as Item[]),
      actions: armor?.itemLinkReference?.actions || ([] as Action[]),
      keywords:
        armor?.keywords || ([] as { keyword: Keyword; value?: number }[]),
    },
    onSubmit: async ({ value }) => {
      value.stats.currentBlock = value.stats.block;
      value.stats.currentPower = value.stats.power;

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
        await createArmor.mutate(formData);
      } else if (mode === 'modify') {
        await modifyArmor.mutate(formData);
      }
    },
  });

  if (keywords.isLoading || keywords.isPending) {
    return <Loading />;
  }

  return (
    <>
      <FormLayout
        itemId={armorId}
        createMutation={createArmor}
        modifyMutation={modifyArmor}
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
            <h1>{mode.charAt(0).toUpperCase() + mode.slice(1) + ' Armor'}</h1>
          </div>
          <Divider />
          <ArrowHeader2 title="Armor Information" />
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
            <RarityField form={armorForm} />
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
          <div className="grid w-full gap-8 max-sm:col-span-2 max-sm:grid-flow-row sm:grid-cols-2">
            <PictureField
              form={armorForm}
              sizeInfo={{ aspectRatio: '1/1', maxHeight: '', minHeight: '' }}
            />
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
                <TextAreaField label="Armor description" field={field} />
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
          <div className="flex flex-col gap-4">
            <KeywordLinkField form={armorForm} keywordType="armor" />
            <Divider />
            <WeaponLinkField form={armorForm} weaponList={weapons} />
            <Divider />
            <ArmorLinkField form={armorForm} armorList={armors} />
            <Divider />
            <ActionLinkField form={armorForm} />
            <Divider />
          </div>
          <BtnRect
            ariaLabel={mode.charAt(0).toUpperCase() + mode.slice(1)}
            type="submit"
            className="group w-full"
          >
            {createArmor.isPending || modifyArmor.isPending ? (
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
    </>
  );
};

export default ArmorForm;
