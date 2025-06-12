import { FormApi, FormState } from '@tanstack/react-form';
import FormLinkModal from '../modals/ItemLinkModal';
import { useState } from 'react';
import BtnRect from '../buttons/BtnRect';
import ArrowHeader2 from '../ArrowHeader2';
import { Item } from 'src/types/item';
import ItemCard from '../ItemCard';
import Items from '../Items';

const CyberneticLinkField = ({ form }: { form: FormApi }) => {
  const [cyberneticsOpen, setCyberneticsOpen] = useState(false);

  const toggleCybernetics = () => setCyberneticsOpen((prev) => !prev);

  return (
    <>
      <form.Subscribe selector={(state: FormState) => state.values.cybernetics}>
        {(cybernetics: Item[]) => (
          <>
            {cybernetics.length > 0 && (
              <ArrowHeader2 title="Linked Cybernetics" />
            )}
            <form.Field name="cybernetics">
              {(field) => (
                <>
                  <FormLinkModal
                    key="cybernetics"
                    field={field}
                    modalOpen={cyberneticsOpen}
                    toggleModal={toggleCybernetics}
                  >
                    {({ toggleFormLink }) => (
                      <Items
                        title="Link Cybernetics"
                        forcedMode="form"
                        toggleFormLink={toggleFormLink}
                      />
                    )}
                  </FormLinkModal>
                  {cybernetics.map((cybernetic: Item) => {
                    return (
                      <button
                        key={cybernetic.id}
                        onClick={() => {
                          field.handleChange(
                            field.state.value.filter(
                              (item: Item) => item.id !== cybernetic.id,
                            ),
                          );
                        }}
                      >
                        <ItemCard item={cybernetic} mode="form" />
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
        ariaLabel="Open link cybernetic modal"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleCybernetics();
        }}
      >
        Link Cybernetics
      </BtnRect>
    </>
  );
};

export default CyberneticLinkField;
