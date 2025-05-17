import { FieldState, FormApi } from '@tanstack/react-form';
import FormLinkModal from './FormLinkModal';
import { useState } from 'react';
import BtnRect from '../buttons/BtnRect';
import { ArmorWithKeywords } from 'src/types/armor';
import ArmorCard from '../ArmorCard';
import Armor from '../Armor';
import ArrowHeader2 from '../ArrowHeader2';
import { Item } from 'src/types/item';
import ItemCard from '../ItemCard';

const ArmorLinkField = ({ form }: { form: FormApi }) => {
  const [armorOpen, setArmorOpen] = useState(false);

  const toggleArmor = () => setArmorOpen((prev) => !prev);

  return (
    <>
      <form.Subscribe selector={(state: FieldState) => state.values.armor}>
        {(armor: Item[]) => (
          <>
            {armor.length > 0 && <ArrowHeader2 title="Linked Armor" />}
            <form.Field name="armor">
              {(field) => (
                <>
                  <FormLinkModal
                    key="armor"
                    field={field}
                    modalOpen={armorOpen}
                    toggleModal={toggleArmor}
                  >
                    {({ toggleFormLink }) => (
                      <Armor
                        title="Link Armor"
                        forcedMode="form"
                        toggleFormLink={toggleFormLink}
                      />
                    )}
                  </FormLinkModal>
                  {armor.map((armor: Item) => {
                    return (
                      <button
                        key={armor.id}
                        onClick={() => {
                          field.handleChange(
                            field.state.value.filter(
                              (item: Item) => item.id !== armor.id,
                            ),
                          );
                        }}
                      >
                        <ItemCard item={armor} mode="form" />
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
        ariaLabel="Open link armor modal"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleArmor();
        }}
      >
        Link Armor
      </BtnRect>
    </>
  );
};

export default ArmorLinkField;
