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
import Loading from './Loading';
import FormLayout from '../layouts/FormLayout';
import { useLocation, useParams } from 'react-router-dom';
import { WeaponWithKeywords } from '../types/weapon';
import SelectField from './SelectField';
import Divider from './Divider';
import ArrowHeader2 from './ArrowHeader2';
import { Keyword } from 'src/types/keyword';
import { extractItemListIds, extractKeywordListIds } from '../utils/extractIds';
import { Action } from 'src/types/action';
import KeywordLinkField from './form_fields/KeywordLinkField';
import WeaponLinkField from './form_fields/WeaponLinkField';
import ActionLinkField from './form_fields/ActionLinkField';
import useDroneQuery from '../hooks/useDroneQuery/useDroneQuery';
import useCreateDroneMutation from '../hooks/useCreateDroneMutation/useCreateDroneMutation';
import useModifyDroneMutation from '../hooks/useModifyDroneMutation/useModifyDroneMutation';
import useDeleteDroneMutation from '../hooks/useDeleteDroneMutation/useDeleteDroneMutation';
import { DroneStats } from 'src/types/drone';
import { Modification } from 'src/types/vehicle';
import useWeapons from 'src/hooks/useWeapons';

const DroneForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { droneId } = useParams();
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const mode = parts[parts.length - 1];

  const { data: drone, isLoading } = useDroneQuery(apiUrl, Number(droneId), {
    enabled: !!droneId,
  });

  const { filteredWeapons: weapons } = useWeapons({
    includedKeywords: ['Drone Weapon'],
  });

  const [imagePreview, setImagePreview] = useState(
    drone?.picture?.imageUrl || '',
  );

  const createDrone = useCreateDroneMutation(
    apiUrl,
    setFormMessage,
    Number(droneId),
  );

  const modifyDrone = useModifyDroneMutation(
    apiUrl,
    Number(droneId),
    setFormMessage,
  );
  const deleteDrone = useDeleteDroneMutation(
    apiUrl,
    Number(droneId),
    setFormMessage,
  );

  const handleDelete = () => {
    if (deleteMode) {
      deleteDrone.mutate();
    } else {
      setDeleteMode(true);
    }
  };

  const handleReset = async () => {
    droneForm.reset();
  };

  useEffect(() => {
    if (drone) {
      setImagePreview(drone.picture?.imageUrl);
    }
  }, [drone]);

  const droneForm = useForm({
    defaultValues: {
      id: drone?.id || null,
      name: drone?.name || '',
      rarity: drone?.rarity || '',
      grade: drone?.grade || 1,
      picture: drone?.picture || '',
      description: drone?.description || '',
      stats: {
        hull: drone?.stats?.hull || '',
        armor: drone?.stats?.armor || '',
        power: drone?.stats?.power || '',
        speed: drone?.stats?.speed || '',
        weight: drone?.stats?.weight || '',
      } as DroneStats,
      price: drone?.price || null,
      weapons: drone?.weapons || ([] as WeaponWithKeywords[]),
      actions: drone?.actions || ([] as Action[]),
      modifications: drone?.modifications || ([] as Modification[]),
      keywords:
        drone?.keywords || ([] as { keyword: Keyword; value?: number }[]),
    },
    onSubmit: async ({ value }) => {
      value.stats.currentHull = value.stats.hull;
      value.stats.currentPower = value.stats.power;

      const filteredStats = Object.fromEntries(
        Object.entries(value.stats as DroneStats).filter(([_, val]) => val),
      );

      value.stats = { ...filteredStats };

      const { weapons, actions, modifications, keywords, ...rest } = value;

      const data = {
        ...rest,
        itemIds: extractItemListIds([...value.weapons, ...value.modifications]),
        actionIds: extractItemListIds(value.actions),
        keywordIds: extractKeywordListIds(value.keywords),
      };
      console.log(data);

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'picture' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });

      if (mode === 'create' || mode === 'update') {
        await createDrone.mutate(formData);
      } else if (mode === 'modify') {
        await modifyDrone.mutate(formData);
      }
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      droneForm.setFieldValue('picture', selectedFile);

      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <FormLayout
      itemId={droneId}
      createMutation={createDrone}
      modifyMutation={modifyDrone}
      deleteMutation={deleteDrone}
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
          droneForm.handleSubmit();
        }}
      >
        <div className="flex items-center justify-center gap-4">
          <h1>{mode.charAt(0).toUpperCase() + mode.slice(1) + ' Drone'}</h1>
        </div>
        <Divider />
        <ArrowHeader2 title="Drone Information" />
        <div className="flex w-full gap-4 lg:gap-8">
          <droneForm.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Drone name must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <InputField className="grow" label="Drone name" field={field} />
            )}
          </droneForm.Field>
          <droneForm.Field
            name="price"
            validators={{
              onChange: ({ value }) =>
                value && value < 0 ? 'Price cannot be negative' : undefined,
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
          </droneForm.Field>
        </div>
        <div className="flex w-full items-center gap-4 lg:gap-8">
          <droneForm.Field
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
          </droneForm.Field>
          <droneForm.Field
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
          </droneForm.Field>
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
                    Upload drone picture
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
                    droneForm.setFieldValue('picture', '');
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
          <droneForm.Field
            name="description"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Drone description must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <TextAreaField label="Drone description" field={field} />
            )}
          </droneForm.Field>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
            <droneForm.Field name="stats.hull">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Hull"
                  field={field}
                />
              )}
            </droneForm.Field>
            <droneForm.Field name="stats.armor">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Armor"
                  field={field}
                />
              )}
            </droneForm.Field>
            <droneForm.Field name="stats.power">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Power"
                  field={field}
                />
              )}
            </droneForm.Field>
            <droneForm.Field name="stats.speed">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Speed"
                  field={field}
                />
              )}
            </droneForm.Field>
            <droneForm.Field name="stats.weight">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Weight"
                  field={field}
                />
              )}
            </droneForm.Field>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <KeywordLinkField form={droneForm} keywordType="hardwired" />
          <Divider />
          <WeaponLinkField form={droneForm} weaponList={weapons} />
          <Divider />
          <ActionLinkField form={droneForm} />
          <Divider />
        </div>
        <droneForm.Subscribe selector={(state) => state.errorMap}>
          {(errorMap) =>
            errorMap.onSubmit ? (
              <em className="text-error text-lg">{errorMap.onSubmit}</em>
            ) : null
          }
        </droneForm.Subscribe>
        <BtnRect
          ariaLabel={mode.charAt(0).toUpperCase() + mode.slice(1)}
          type="submit"
          className="group w-full"
        >
          {createDrone.isPending || modifyDrone.isPending ? (
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

export default DroneForm;
