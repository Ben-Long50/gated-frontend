import { FormApi, FormState } from '@tanstack/react-form';
import FormLinkModal from './FormLinkModal';
import { useState } from 'react';
import Weapons from '../Weapons';
import BtnRect from '../buttons/BtnRect';
import ArrowHeader2 from '../ArrowHeader2';
import { Item } from 'src/types/item';
import ItemCard from '../ItemCard';

const WeaponLinkField = ({ form }: { form: FormApi }) => {
  const [weaponsOpen, setWeaponsOpen] = useState(false);

  const toggleWeapons = () => setWeaponsOpen((prev) => !prev);

  return (
    <>
      <form.Subscribe selector={(state: FormState) => state.values.weapons}>
        {(weapons: Item[]) => (
          <>
            {weapons.length > 0 && <ArrowHeader2 title="Linked Weapons" />}
            <form.Field name="weapons">
              {(field) => (
                <>
                  <FormLinkModal
                    key="weapons"
                    field={field}
                    modalOpen={weaponsOpen}
                    toggleModal={toggleWeapons}
                  >
                    {({ toggleFormLink }) => (
                      <Weapons
                        title="Link Weapons"
                        forcedMode="form"
                        toggleFormLink={toggleFormLink}
                      />
                    )}
                  </FormLinkModal>
                  {weapons.map((weapon: Item) => {
                    return (
                      <button
                        key={weapon.id}
                        onClick={() => {
                          field.handleChange(
                            field.state.value.filter(
                              (item: Item) => item.id !== weapon.id,
                            ),
                          );
                        }}
                      >
                        <ItemCard item={weapon} mode="form" />
                      </button>
                    );
                  })}
                </>
              )}
            </form.Field>
          </>
        )}
      </form.Subscribe>
      <BtnRect
        className="w-1/3 min-w-48 self-end"
        ariaLabel="Open link weapon modal"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleWeapons();
        }}
      >
        Link Weapons
      </BtnRect>
    </>
  );
};

export default WeaponLinkField;
