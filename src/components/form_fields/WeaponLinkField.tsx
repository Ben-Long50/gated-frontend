import { FormApi, FormState } from '@tanstack/react-form';
import FormLinkModal from './FormLinkModal';
import { WeaponWithKeywords } from 'src/types/weapon';
import { useState } from 'react';
import Weapons from '../Weapons';
import WeaponCard from '../WeaponCard';
import BtnRect from '../buttons/BtnRect';
import ArrowHeader2 from '../ArrowHeader2';

const WeaponLinkField = ({ form }: { form: FormApi }) => {
  const [weaponsOpen, setWeaponsOpen] = useState(false);

  const toggleWeapons = () => setWeaponsOpen((prev) => !prev);

  return (
    <>
      <form.Subscribe selector={(state: FormState) => state.values.weapons}>
        {(weapons: WeaponWithKeywords[]) => (
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
                        mode="form"
                        toggleFormLink={toggleFormLink}
                      />
                    )}
                  </FormLinkModal>
                  {weapons.map((weapon: WeaponWithKeywords) => {
                    return (
                      <button
                        key={weapon.id}
                        onClick={() => {
                          field.handleChange(
                            field.state.value.filter(
                              (item: WeaponWithKeywords) =>
                                item.id !== weapon.id,
                            ),
                          );
                        }}
                      >
                        <WeaponCard weapon={weapon} mode="form" />
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
