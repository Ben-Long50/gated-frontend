import { FieldState, FormApi } from '@tanstack/react-form';
import FormLinkModal from '../modals/ItemLinkModal';
import { useState } from 'react';
import BtnRect from '../buttons/BtnRect';
import ArrowHeader2 from '../ArrowHeader2';
import { Item } from 'src/types/item';
import ItemCard from '../ItemCard';
import Items from '../Items';

const ArmorLinkField = ({
  form,
  armorList,
}: {
  form: FormApi;
  armorList?: Item[];
}) => {
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
                      <Items
                        title="Link Armor"
                        itemList={armorList}
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
