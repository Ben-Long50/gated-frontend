import { FormApi, FormState } from '@tanstack/react-form';
import BtnRect from '../buttons/BtnRect';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { Perk } from 'src/types/perk';
import PerkCard from '../PerkCard';
import { AttributeTree } from 'src/types/attributeTree';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useModalStore from 'src/stores/modalStore';

const PerkLinkField = ({
  form,
  attributeTree,
}: {
  form: FormApi;
  attributeTree: AttributeTree;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const parts = location.pathname.split('/');

  const setBackgroundPath = useModalStore((state) => state.setBackgroundPath);

  const openPerkLinkModal = () => {
    setBackgroundPath(location.pathname);
    navigate('perks');
  };

  return (
    <>
      <form.Subscribe selector={(state: FormState) => state.values.perks}>
        {(perks: Perk[]) => (
          <>
            <form.Field name="perks">
              {(field) => (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {parts[parts.length - 1] === 'perks' && (
                    <Outlet context={{ field, attributeTree }} />
                  )}
                  {perks.map((perk: Perk) => {
                    return (
                      <div className="flex items-center gap-2" key={perk.id}>
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
                </div>
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
          openPerkLinkModal();
        }}
      >
        Link Perks
      </BtnRect>
    </>
  );
};

export default PerkLinkField;
