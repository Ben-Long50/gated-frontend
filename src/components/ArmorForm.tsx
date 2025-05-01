import { useForm } from '@tanstack/react-form';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import BtnRect from './buttons/BtnRect';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import useKeywords from '../hooks/useKeywords';
import Icon from '@mdi/react';
import { mdiCloseBox, mdiImagePlus } from '@mdi/js';
import Loading from './Loading';
import useCreateArmorMutation from '../hooks/useCreateArmorMutation/useCreateArmorMutation';
import FormLayout from '../layouts/FormLayout';
import { useParams } from 'react-router-dom';
import useDeleteArmorMutation from '../hooks/useDeleteArmorMutation/useDeleteArmorMutation';
import { Keyword } from 'src/types/keyword';
import SelectField from './SelectField';
import useArmorPieceQuery from '../hooks/useArmorPieceQuery/useArmorPieceQuery';
import { ArmorStats, ArmorWithKeywords } from 'src/types/armor';
import useModifyArmorMutation from '../hooks/useModifyArmorMutation/useModifyArmorMutation';
import ArrowHeader2 from './ArrowHeader2';
import Divider from './Divider';
import { Action } from 'src/types/action';
import { WeaponWithKeywords } from 'src/types/weapon';
import { CyberneticWithKeywords } from 'src/types/cybernetic';

import WeaponLinkField from './form_fields/WeaponLinkField';
import ArmorLinkField from './form_fields/ArmorLinkField';
import CyberneticLinkField from './form_fields/CyberneticLinkField';
import ActionLinkField from './form_fields/ActionLinkField';
import KeywordLinkField from './form_fields/KeywordLinkField';
import { extractItemListIds, extractKeywordListIds } from '../utils/extractIds';

const ArmorForm = ({ title, mode }: { title: string; mode?: string }) => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);

  const { armorId } = useParams();

  const { data: armor } = useArmorPieceQuery(apiUrl, Number(armorId), {
    enabled: !!armorId,
  });

  const keywords = useKeywords('armor');

  const [imagePreview, setImagePreview] = useState(
    armor?.picture?.imageUrl || '',
  );

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

  useEffect(() => {
    if (armor) {
      setImagePreview(armor.picture?.imageUrl);
    } else setImagePreview('');
  }, [armor, armorId]);

  const armorForm = useForm({
    defaultValues: {
      id: armor?.id || 0,
      name: armor?.name || '',
      rarity: armor?.rarity || '',
      grade: armor?.grade || 1,
      picture: armor?.picture || '',
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
      weapons: armor?.weapons || ([] as WeaponWithKeywords[]),
      armor: armor?.armor || ([] as ArmorWithKeywords[]),
      cybernetics: armor?.cybernetics || ([] as CyberneticWithKeywords[]),
      actions: armor?.actions || ([] as Action[]),
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

      const { weapons, armor, cybernetics, actions, keywords, ...rest } = value;

      const data = {
        ...rest,
        weaponIds: extractItemListIds(value.weapons),
        armorIds: extractItemListIds(value.armor),
        cyberneticIds: extractItemListIds(value.cybernetics),
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
        // await modifyArmor.mutate(formData);
      }
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      armorForm.setFieldValue('picture', selectedFile);

      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

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
            <h1>{title} Armor</h1>
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
            <armorForm.Field
              name="rarity"
              validators={{
                onSubmit: ({ value }) =>
                  !value ? 'Select a rarity' : undefined,
              }}
            >
              {(field) => (
                <SelectField
                  className="w-full"
                  label="Item rarity"
                  field={field}
                >
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
          <div className="flex flex-col gap-8 sm:flex-row">
            <ThemeContainer
              className="mx-auto w-full max-w-sm"
              chamfer="medium"
              borderColor={accentPrimary}
              overflowHidden={true}
            >
              {!imagePreview ? (
                <label className="bg-secondary flex aspect-square size-full w-full cursor-pointer flex-col items-center justify-center">
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 pb-6 pt-5 clip-6">
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
                <div className="relative flex aspect-square max-w-4xl items-center justify-center overflow-hidden bg-black">
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
            <KeywordLinkField form={armorForm} />
            <Divider />
            <WeaponLinkField form={armorForm} />
            <Divider />
            <ArmorLinkField form={armorForm} />
            <Divider />
            <CyberneticLinkField form={armorForm} />
            <Divider />
            <ActionLinkField form={armorForm} />
            <Divider />
          </div>
          <BtnRect ariaLabel={title} type="submit" className="group w-full">
            {createArmor.isPending || modifyArmor.isPending ? (
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
    </>
  );
};

export default ArmorForm;
