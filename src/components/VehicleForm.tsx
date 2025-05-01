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
import { useParams } from 'react-router-dom';
import { Modification, VehicleStats } from '../types/vehicle';
import { WeaponWithKeywords } from '../types/weapon';
import useCreateVehicleMutation from '../hooks/useCreateVehicleMutation/useCreateVehicleMutation';
import useDeleteVehicleMutation from '../hooks/useDeleteVehicleMutation/useDeleteVehicleMutation';
import SelectField from './SelectField';
import useVehicleQuery from '../hooks/useVehicleQuery/useVehicleQuery';
import useModifyVehicleMutation from '../hooks/useModifyVehicleMutation/useModifyVehicleMutation';
import Divider from './Divider';
import ArrowHeader2 from './ArrowHeader2';
import { Keyword } from 'src/types/keyword';
import { extractItemListIds, extractKeywordListIds } from '../utils/extractIds';
import { ArmorWithKeywords } from 'src/types/armor';
import { Action } from 'src/types/action';
import KeywordLinkField from './form_fields/KeywordLinkField';
import WeaponLinkField from './form_fields/WeaponLinkField';
import ArmorLinkField from './form_fields/ArmorLinkField';
import ActionLinkField from './form_fields/ActionLinkField';

const VehicleForm = ({ title, mode }: { title: string; mode: string }) => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { vehicleId } = useParams();

  const { data: vehicle, isLoading } = useVehicleQuery(
    apiUrl,
    Number(vehicleId),
    {
      enabled: !!vehicleId,
    },
  );

  const [imagePreview, setImagePreview] = useState(
    vehicle?.picture?.imageUrl || '',
  );

  const createVehicle = useCreateVehicleMutation(
    apiUrl,
    setFormMessage,
    Number(vehicleId),
  );

  const modifyVehicle = useModifyVehicleMutation(
    apiUrl,
    Number(vehicleId),
    setFormMessage,
  );
  const deleteVehicle = useDeleteVehicleMutation(
    apiUrl,
    Number(vehicleId),
    setFormMessage,
  );

  const handleDelete = () => {
    if (deleteMode) {
      deleteVehicle.mutate();
    } else {
      setDeleteMode(true);
    }
  };

  const handleReset = async () => {
    vehicleForm.reset();
  };

  useEffect(() => {
    if (vehicle) {
      setImagePreview(vehicle.picture?.imageUrl);
    }
  }, [vehicle]);

  const vehicleForm = useForm({
    defaultValues: {
      id: vehicle?.id || null,
      name: vehicle?.name || '',
      rarity: vehicle?.rarity || '',
      grade: vehicle?.grade || 1,
      picture: vehicle?.picture || '',
      description: vehicle?.description || '',
      stats: {
        size: vehicle?.stats?.size || '',
        speed: vehicle?.stats?.speed || '',
        agility: vehicle?.stats?.agility || '',
        hull: vehicle?.stats?.hull || '',
        currentHull: vehicle?.stats?.currentHull || '',
        armor: vehicle?.stats?.armor || '',
        cargo: vehicle?.stats?.cargo || '',
        currentCargo: vehicle?.stats?.currentCargo || '',
        hangar: vehicle?.stats?.hangar || '',
        currentHangar: vehicle?.stats?.currentHangar || '',
        pass: vehicle?.stats?.pass || '',
        currentPass: vehicle?.stats?.currentPass || '',
        weapon: vehicle?.stats?.weapon || '',
        currentWeapon: vehicle?.stats?.currentWeapon || '',
      } as VehicleStats,
      price: vehicle?.price || null,
      weapons: vehicle?.weapons || ([] as WeaponWithKeywords[]),
      armor: vehicle?.armor || ([] as ArmorWithKeywords[]),
      actions: vehicle?.actions || ([] as Action[]),
      modifications: vehicle?.modifications || ([] as Modification[]),
      keywords:
        vehicle?.keywords || ([] as { keyword: Keyword; value?: number }[]),
    },
    onSubmit: async ({ value }) => {
      value.stats.currentHull = value.stats.hull;
      value.stats.currentWeapon = value.weapons.length;

      const filteredStats = Object.fromEntries(
        Object.entries(value.stats as VehicleStats).filter(([_, val]) => val),
      );

      value.stats = { ...filteredStats };

      if (value.stats.cargo) value.stats.currentCargo = 0;
      if (value.stats.hangar) value.stats.currentHangar = 0;
      if (value.stats.pass) value.stats.currentPass = 0;

      const { weapons, armor, actions, modifications, keywords, ...rest } =
        value;

      const data = {
        ...rest,
        weaponIds: extractItemListIds(value.weapons),
        armorIds: extractItemListIds(value.armor),
        actionIds: extractItemListIds(value.actions),
        modificationIds: extractItemListIds(value.modifications),
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
        await createVehicle.mutate(formData);
      } else if (mode === 'modify') {
        await modifyVehicle.mutate(formData);
      }
    },
    validators: {
      onSubmit: ({ value }) => {
        if (value.stats.weapon) {
          if (value.stats.weapon < value.weapons.length) {
            return "You cannot mount more weapons than this vehicle's weapons stat";
          }
        } else if (value.weapons.length > 0) {
          return "You cannot mount more weapons than this vehicle's weapons stat";
        }
        return undefined;
      },
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      vehicleForm.setFieldValue('picture', selectedFile);

      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <FormLayout
      itemId={vehicleId}
      createMutation={createVehicle}
      modifyMutation={modifyVehicle}
      deleteMutation={deleteVehicle}
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
          vehicleForm.handleSubmit();
        }}
      >
        <div className="flex items-center justify-center gap-4">
          <h1>{title} Vehicle</h1>
        </div>
        <Divider />
        <ArrowHeader2 title="Vehicle Information" />
        <div className="flex w-full gap-4 lg:gap-8">
          <vehicleForm.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Vehicle name must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <InputField className="grow" label="Vehicle name" field={field} />
            )}
          </vehicleForm.Field>
          <vehicleForm.Field
            name="price"
            validators={{
              onChange: ({ value }) =>
                value < 0 ? 'Price cannot be negative' : undefined,
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
          </vehicleForm.Field>
        </div>
        <div className="flex w-full items-center gap-4 lg:gap-8">
          <vehicleForm.Field
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
          </vehicleForm.Field>
          <vehicleForm.Field
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
          </vehicleForm.Field>
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
                    Upload vehicle picture
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
                    vehicleForm.setFieldValue('picture', '');
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
          <vehicleForm.Field
            name="description"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Vehicle description must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <TextAreaField label="Vehicle description" field={field} />
            )}
          </vehicleForm.Field>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
            <vehicleForm.Field name="stats.size">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Size"
                  field={field}
                />
              )}
            </vehicleForm.Field>
            <vehicleForm.Field name="stats.speed">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Speed"
                  field={field}
                />
              )}
            </vehicleForm.Field>
            <vehicleForm.Field name="stats.agility">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Agility"
                  field={field}
                />
              )}
            </vehicleForm.Field>
            <vehicleForm.Field name="stats.hull">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Hull"
                  field={field}
                />
              )}
            </vehicleForm.Field>
            <vehicleForm.Field name="stats.armor">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Armor"
                  field={field}
                />
              )}
            </vehicleForm.Field>
            <vehicleForm.Field name="stats.cargo">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Cargo"
                  field={field}
                />
              )}
            </vehicleForm.Field>
            <vehicleForm.Field name="stats.hangar">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Hangar"
                  field={field}
                />
              )}
            </vehicleForm.Field>
            <vehicleForm.Field name="stats.pass">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Passengers"
                  field={field}
                />
              )}
            </vehicleForm.Field>
            <vehicleForm.Field name="stats.weapon">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Weapons"
                  field={field}
                />
              )}
            </vehicleForm.Field>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <KeywordLinkField form={vehicleForm} keywordType="vehicle" />
          <Divider />
          <WeaponLinkField form={vehicleForm} />
          <Divider />
          <ArmorLinkField form={vehicleForm} />
          <Divider />
          <ActionLinkField form={vehicleForm} />
          <Divider />
        </div>
        <vehicleForm.Subscribe selector={(state) => state.errorMap}>
          {(errorMap) =>
            errorMap.onSubmit ? (
              <em className="text-error text-lg">{errorMap.onSubmit}</em>
            ) : null
          }
        </vehicleForm.Subscribe>
        <BtnRect ariaLabel={title} type="submit" className="group w-full">
          {createVehicle.isPending || modifyVehicle.isPending ? (
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

export default VehicleForm;
