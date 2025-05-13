import { FormApi, FormState } from '@tanstack/react-form';
import FormLinkModal from './FormLinkModal';
import { useState } from 'react';
import BtnRect from '../buttons/BtnRect';
import ItemCardSmall from '../ItemCardSmall';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import ArrowHeader2 from '../ArrowHeader2';
import Perks from '../Perks';
import { Perk, PerkTree } from 'src/types/perk';
import PerkCard from '../PerkCard';

const PerkLinkField = ({
  form,
  perkTree,
}: {
  form: FormApi;
  perkTree: Partial<PerkTree>;
}) => {
  const [perksOpen, setPerksOpen] = useState(false);

  const togglePerks = () => setPerksOpen((prev) => !prev);

  return (
    <>
      <form.Subscribe selector={(state: FormState) => state.values.perks}>
        {(perks: Perk[]) => (
          <>
            <form.Field name="perks">
              {(field) => (
                <>
                  <FormLinkModal
                    key="perks"
                    field={field}
                    modalOpen={perksOpen}
                    toggleModal={togglePerks}
                  >
                    {({ toggleFormLink }) => (
                      <Perks
                        title="Link Perks"
                        forcedMode="form"
                        field={field}
                        toggleFormLink={toggleFormLink}
                        perkTree={perkTree}
                      />
                    )}
                  </FormLinkModal>
                  {perks.map((perk: Perk) => {
                    return (
                      <div className="flex items-center gap-4" key={perk.id}>
                        <PerkCard perk={perk} key={perk.id} />
                        <button
                          onClick={() => {
                            field.handleChange(
                              field.state.value.filter(
                                (item: Perk) => item.id !== perk.id,
                              ),
                            );
                          }}
                        >
                          <Icon
                            path={mdiClose}
                            className="text-tertiary hover:text-accent timing size-10"
                          />
                        </button>
                      </div>
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
        ariaLabel="Open link trait modal"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          togglePerks();
        }}
      >
        Link Perks
      </BtnRect>
    </>
  );
};

export default PerkLinkField;
