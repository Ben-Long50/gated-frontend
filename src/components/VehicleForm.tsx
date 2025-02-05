import { useForm } from '@tanstack/react-form';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import BtnRect from './buttons/BtnRect';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import Icon from '@mdi/react';
import { mdiChevronDown, mdiCloseBox, mdiImagePlus } from '@mdi/js';
import Loading from './Loading';
import FormLayout from '../layouts/FormLayout';
import { useParams } from 'react-router-dom';
import { Modification, VehicleStats } from '../types/vehicle';
import { WeaponWithKeywords } from '../types/weapon';
import useCreateVehicleMutation from '../hooks/useCreateVehicleMutation/useCreateVehicleMutation';
import useDeleteVehicleMutation from '../hooks/useDeleteVehicleMutation/useDeleteVehicleMutation';
import useModifications from '../hooks/useModifications';
import ModCard from './ModCard';
import SubweaponCard from './SubweaponCard';
import useWeapons from '../hooks/useWeapons';
import SelectField from './SelectField';
import useVehicleQuery from '../hooks/useVehicleQuery/useVehicleQuery';
import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';

const VehicleForm = ({ title, mode }: { title: string; mode: string }) => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const [weaponDetailsOpen, setWeaponDetailsOpen] = useState(false);
  const [modDetailsOpen, setModDetailsOpen] = useState(false);
  const [toolTip, setToolTip] = useState('');
  const { vehicleId } = useParams();

  const { data: character } = useActiveCharacterQuery(apiUrl);

  const { data: vehicle } = useVehicleQuery(apiUrl, vehicleId);

  const vehicleWeapons = useWeapons({
    itemList: title === 'Modify' && character?.characterInventory?.weapons,
    includedKeywords: ['Vehicle'],
  });

  const equippedWeapons = useWeapons({ itemList: vehicle?.weapons });

  const weaponList =
    title === 'Modify'
      ? vehicleWeapons.filteredWeapons
      : [...vehicleWeapons.filteredWeapons, ...equippedWeapons.filteredWeapons];

  const modifications = useModifications({
    itemList: title === 'Modify' && character?.characterInventory.modifications,
  });

  const equippedMods = useModifications({ itemList: vehicle?.modifications });

  const modList =
    title === 'Modify'
      ? modifications.filteredMods
      : [...modifications.filteredMods, ...equippedMods.filteredMods];

  const [imagePreview, setImagePreview] = useState(
    vehicle?.picture?.imageUrl || '',
  );

  const createVehicle = useCreateVehicleMutation(apiUrl, setFormMessage);

  const deleteVehicle = useDeleteVehicleMutation(
    apiUrl,
    vehicleId,
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

  const vehicleWeaponDetails = vehicle?.weapons?.map(
    (weapon: WeaponWithKeywords) => weapon.id,
  );

  const modIds = vehicle?.modifications?.map(
    (modification: Modification) => modification.id,
  );

  useEffect(() => {
    if (vehicle) {
      setImagePreview(vehicle.picture?.imageUrl);
    }
  }, [vehicle]);

  const vehicleForm = useForm({
    defaultValues: {
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
        armor: vehicle?.stats?.armor || '',
        cargo: vehicle?.stats?.cargo || '',
        hangar: vehicle?.stats?.hangar || '',
        pass: vehicle?.stats?.pass || '',
        weapon: vehicle?.stats?.weapon || '',
      },
      price: vehicle?.price || null,
      weapons: vehicleWeaponDetails || [],
      modifications: modIds || [],
    },
    onSubmit: async ({ value }) => {
      const filteredStats = Object.fromEntries(
        Object.entries(value.stats as VehicleStats).filter(([_, val]) => val),
      );

      value.stats = { ...vehicle?.stats, ...filteredStats };

      const formData = new FormData();

      Object.entries(value).forEach(([key, value]) => {
        if (key === 'picture' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });
      formData.append('vehicleId', JSON.stringify(vehicleId || 0));
      await createVehicle.mutate(formData);
    },
    validators: {
      onSubmit: ({ value }) => {
        if (value.stats.weapon) {
          const count = value.weapons.reduce(
            (sum: number, weapon: { weaponId: number; quantity: number }) =>
              sum + weapon.quantity,
            0,
          );
          if (value.stats.weapon < count) {
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
    const selectedFile = e.target.files[0]; // Get the selected file

    if (selectedFile) {
      vehicleForm.setFieldValue('picture', selectedFile);

      // Create a URL for the selected file to preview
      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

  if (
    vehicleWeapons.isLoading ||
    vehicleWeapons.isPending ||
    equippedWeapons.isLoading ||
    equippedWeapons.isPending
  ) {
    return <Loading />;
  }

  return (
    <FormLayout
      itemId={vehicleId}
      createMutation={createVehicle}
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
              <TextAreaField
                className="h-40 w-full sm:h-full"
                label="Vehicle description"
                field={field}
              />
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
        <hr className="border-yellow-300 border-opacity-50" />
        <div className="relative flex flex-col" onClick={() => setToolTip('')}>
          <div
            className={`${weaponDetailsOpen && 'pb-8'} timing flex cursor-pointer items-center justify-between`}
            onClick={() => setWeaponDetailsOpen(!weaponDetailsOpen)}
          >
            <h3>Mount weapons</h3>
            <div className="flex items-center gap-8">
              <vehicleForm.Subscribe selector={(state) => state.values.weapons}>
                {(weapons) => <h3 className="text-accent">{weapons.length}</h3>}
              </vehicleForm.Subscribe>
              <span
                className={`timing shrink-0 ${weaponDetailsOpen && '-rotate-180'}`}
              >
                <Icon
                  path={mdiChevronDown}
                  size={1.1}
                  className="text-secondary"
                ></Icon>
              </span>
            </div>
          </div>
          <div
            className={`${weaponDetailsOpen ? 'max-h-[500px] py-1' : 'max-h-0'} timing scrollbar-primary flex flex-col gap-8 overflow-y-auto pl-1 pr-4`}
          >
            <vehicleForm.Field name="weapons">
              {(field) =>
                weaponList.map((weapon: WeaponWithKeywords) => {
                  const activeWeapon = field.state.value.includes(weapon.id);

                  return (
                    <div className="flex items-center gap-8" key={weapon.id}>
                      <SubweaponCard
                        vehicleId={vehicle?.id}
                        weapon={weapon}
                        toolTip={toolTip}
                        setToolTip={setToolTip}
                      />

                      <input
                        type="checkbox"
                        className="size-6"
                        checked={!!activeWeapon}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.handleChange([
                              ...field.state.value,
                              weapon.id,
                            ]);
                          } else {
                            field.handleChange(
                              field.state.value.filter(
                                (item: number) => item !== weapon.id,
                              ),
                            );
                          }
                        }}
                      />
                    </div>
                  );
                })
              }
            </vehicleForm.Field>
          </div>
        </div>
        <hr className="border-yellow-300 border-opacity-50" />
        <div className="flex flex-col">
          <div
            className={`${modDetailsOpen && 'pb-8'} timing flex cursor-pointer items-center justify-between`}
            onClick={() => setModDetailsOpen(!modDetailsOpen)}
          >
            <h3>Fit modifications</h3>
            <div className="flex items-center gap-8">
              <vehicleForm.Subscribe
                selector={(state) => state.values.modifications}
              >
                {(modifications) => (
                  <h3 className="text-accent">{modifications.length}</h3>
                )}
              </vehicleForm.Subscribe>
              <span
                className={`timing shrink-0 ${modDetailsOpen && '-rotate-180'}`}
              >
                <Icon
                  path={mdiChevronDown}
                  size={1.1}
                  className="text-secondary"
                ></Icon>
              </span>
            </div>
          </div>
          <div
            className={`${modDetailsOpen ? 'max-h-[500px] py-1' : 'max-h-0'} timing scrollbar-primary grid grid-cols-1 gap-x-6 gap-y-4 overflow-y-auto pl-1 pr-4 sm:grid-cols-2`}
          >
            <vehicleForm.Field name="modifications">
              {(field) =>
                modList.map((modification: Modification) => {
                  const activeModification = field.state.value.includes(
                    modification.id,
                  );
                  return (
                    <div
                      className="flex items-center gap-4"
                      key={modification.id}
                    >
                      <ModCard
                        vehicleId={vehicle?.id}
                        modification={modification}
                      />
                      <input
                        type="checkbox"
                        className="size-6"
                        checked={!!activeModification}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.handleChange([
                              ...field.state.value,
                              modification.id,
                            ]);
                          } else {
                            field.handleChange(
                              field.state.value.filter(
                                (item: number) => item !== modification.id,
                              ),
                            );
                          }
                        }}
                      />
                    </div>
                  );
                })
              }
            </vehicleForm.Field>
          </div>
        </div>
        <vehicleForm.Subscribe selector={(state) => state.errorMap}>
          {(errorMap) =>
            errorMap.onSubmit ? (
              <em className="text-error text-lg">{errorMap.onSubmit}</em>
            ) : null
          }
        </vehicleForm.Subscribe>
        <BtnRect type="submit" className="group w-full">
          {createVehicle.isPending ? (
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
