import { FormApi } from '@tanstack/react-form';
import InputField from '../InputField';
import ArrowHeader2 from '../ArrowHeader2';
import Divider from '../Divider';
import { ItemType } from 'src/types/item';

const StatFields = ({
  form,
  categories,
  categoryName,
}: {
  form: FormApi;
  categories: ItemType[];
  categoryName: string;
}) => {
  return (
    <>
      <Divider />
      <ArrowHeader2 title={categoryName + ' Stats'} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
        {categories.includes('augmentation') && (
          <>
            <form.Field name="stats.cyber">
              {(field) => (
                <InputField type="number" label="Cyber" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.power">
              {(field) => (
                <InputField type="number" label="Power" field={field} />
              )}
            </form.Field>
          </>
        )}
        {categories.includes('weapon') && (
          <>
            <form.Field name="stats.damage">
              {(field) => (
                <InputField type="number" label="Damage" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.salvo">
              {(field) => (
                <InputField type="number" label="Salvo" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.flurry">
              {(field) => (
                <InputField type="number" label="Flurry" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.range">
              {(field) => (
                <InputField type="number" label="Range" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.magCapacity">
              {(field) => (
                <InputField type="number" label="Mag. capacity" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.magCount">
              {(field) => (
                <InputField type="number" label="Mag. count" field={field} />
              )}
            </form.Field>
            {!categories.includes('augmentation') && (
              <form.Field name="stats.power">
                {(field) => (
                  <InputField type="number" label="Power" field={field} />
                )}
              </form.Field>
            )}
            {!categories.includes('augmentation') && (
              <form.Field name="stats.weight">
                {(field) => (
                  <InputField type="number" label="Weight" field={field} />
                )}
              </form.Field>
            )}
          </>
        )}
        {categories.includes('armor') && (
          <>
            <form.Field name="stats.armor">
              {(field) => (
                <InputField type="number" label="Armor value" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.ward">
              {(field) => (
                <InputField type="number" label="Ward value" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.block">
              {(field) => (
                <InputField type="number" label="Block points" field={field} />
              )}
            </form.Field>
            {!categories.includes('augmentation') && (
              <form.Field name="stats.power">
                {(field) => (
                  <InputField type="number" label="Power" field={field} />
                )}
              </form.Field>
            )}
            {!categories.includes('augmentation') && (
              <form.Field name="stats.weight">
                {(field) => (
                  <InputField type="number" label="Weight" field={field} />
                )}
              </form.Field>
            )}
          </>
        )}
        {categories.includes('drone') && (
          <>
            <form.Field name="stats.hull">
              {(field) => (
                <InputField type="number" label="Hull" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.armor">
              {(field) => (
                <InputField type="number" label="Armor" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.power">
              {(field) => (
                <InputField type="number" label="Power" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.speed">
              {(field) => (
                <InputField type="number" label="Speed" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.weight">
              {(field) => (
                <InputField type="number" label="Weight" field={field} />
              )}
            </form.Field>
          </>
        )}
        {categories.includes('vehicle') && (
          <>
            <form.Field name="stats.size">
              {(field) => (
                <InputField type="number" label="Size" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.speed">
              {(field) => (
                <InputField type="number" label="Speed" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.agility">
              {(field) => (
                <InputField type="number" label="Agility" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.hull">
              {(field) => (
                <InputField type="number" label="Hull" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.armor">
              {(field) => (
                <InputField type="number" label="Armor" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.cargo">
              {(field) => (
                <InputField type="number" label="Cargo" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.pass">
              {(field) => (
                <InputField type="number" label="Occupants" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.turret">
              {(field) => (
                <InputField type="number" label="Turrets" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.weapon">
              {(field) => (
                <InputField type="number" label="Weapons" field={field} />
              )}
            </form.Field>
          </>
        )}
        {categories.includes('modification') && (
          <>
            <form.Field name="stats.range">
              {(field) => (
                <InputField type="number" label="Range" field={field} />
              )}
            </form.Field>
          </>
        )}
        {categories.includes('reusable') && (
          <>
            <form.Field name="stats.power">
              {(field) => (
                <InputField type="number" label="Power" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.range">
              {(field) => (
                <InputField type="number" label="Range" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.speed">
              {(field) => (
                <InputField type="number" label="Speed" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.wyrmMoldSlots">
              {(field) => (
                <InputField
                  type="number"
                  label="Wyrm Mold Slots"
                  field={field}
                />
              )}
            </form.Field>
            <form.Field name="stats.wyrmMoldPoints">
              {(field) => (
                <InputField
                  type="number"
                  label="Wyrm Mold Points"
                  field={field}
                />
              )}
            </form.Field>
            <form.Field name="stats.esotericCharges">
              {(field) => (
                <InputField
                  type="number"
                  label="Esoteric Charges"
                  field={field}
                />
              )}
            </form.Field>
            <form.Field name="stats.weight">
              {(field) => (
                <InputField type="number" label="Weight" field={field} />
              )}
            </form.Field>
          </>
        )}
        {categories.includes('consumable') && (
          <>
            <form.Field name="stats.range">
              {(field) => (
                <InputField type="number" label="Range" field={field} />
              )}
            </form.Field>
            <form.Field name="stats.weight">
              {(field) => (
                <InputField type="number" label="Weight" field={field} />
              )}
            </form.Field>
          </>
        )}
      </div>
      <Divider />
    </>
  );
};

export default StatFields;
