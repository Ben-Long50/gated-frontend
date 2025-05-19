import { useForm } from '@tanstack/react-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import BtnRect from './buttons/BtnRect';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import Loading from './Loading';
import FormLayout from '../layouts/FormLayout';
import { useLocation, useParams } from 'react-router-dom';
import { VehicleStats } from '../types/vehicle';
import useCreateVehicleMutation from '../hooks/useCreateVehicleMutation/useCreateVehicleMutation';
import useDeleteVehicleMutation from '../hooks/useDeleteVehicleMutation/useDeleteVehicleMutation';
import useModifyVehicleMutation from '../hooks/useModifyVehicleMutation/useModifyVehicleMutation';
import Divider from './Divider';
import ArrowHeader2 from './ArrowHeader2';
import { Keyword } from 'src/types/keyword';
import { extractItemListIds, extractKeywordListIds } from '../utils/extractIds';
import KeywordLinkField from './form_fields/KeywordLinkField';
import WeaponLinkField from './form_fields/WeaponLinkField';
import useItemQuery from 'src/hooks/useItemQuery/useItemQuery';
import { Item } from 'src/types/item';
import useWeapons from 'src/hooks/useWeapons';
import PictureField from './form_fields/PictureField';
import RarityField from './form_fields/RarityField';

const VehicleForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { vehicleId } = useParams();
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const mode = parts[parts.length - 1];

  const { data: vehicle, isLoading } = useItemQuery(
    apiUrl,
    Number(vehicleId),
    'vehicle',
  );

  const { filteredWeapons: weapons } = useWeapons({
    includedKeywords: ['Vehicle Weapon'],
  });

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

  const vehicleForm = useForm({
    defaultValues: {
      id: vehicle?.id || null,
      name: vehicle?.name || '',
      rarity: vehicle?.rarity || '',
      grade: vehicle?.grade || 1,
      picture: vehicle?.picture || '',
      position: vehicle?.picture?.position || { x: 50, y: 50 },
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
      weapons:
        vehicle?.itemLinkReference?.items.filter(
          (item: Item) => item.itemType === 'weapon',
        ) || ([] as Item[]),
      modifications:
        vehicle?.itemLinkReference?.items.filter(
          (item: Item) => item.itemType === 'modification',
        ) || ([] as Item[]),
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

      const { weapons, modifications, keywords, ...rest } = value;

      const data = {
        ...rest,
        itemIds: extractItemListIds([...value.weapons, ...value.modifications]),
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
          <h1> {mode.charAt(0).toUpperCase() + mode.slice(1) + ' Vehicle'}</h1>
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
          <RarityField form={vehicleForm} />
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
        <div className="grid w-full gap-8 max-sm:col-span-2 max-sm:grid-flow-row sm:grid-cols-2">
          <PictureField
            form={vehicleForm}
            sizeInfo={{ aspectRatio: '1/1', maxHeight: '', minHeight: '' }}
          />
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
          <WeaponLinkField form={vehicleForm} weaponList={weapons} />
          <Divider />
        </div>
        <vehicleForm.Subscribe selector={(state) => state.errorMap}>
          {(errorMap) =>
            errorMap.onSubmit ? (
              <em className="text-error text-lg">{errorMap.onSubmit}</em>
            ) : null
          }
        </vehicleForm.Subscribe>
        <BtnRect
          ariaLabel={mode.charAt(0).toUpperCase() + mode.slice(1)}
          type="submit"
          className="group w-full"
        >
          {createVehicle.isPending || modifyVehicle.isPending ? (
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

export default VehicleForm;
