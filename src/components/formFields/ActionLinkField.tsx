import { FormApi, FormState } from '@tanstack/react-form';
import BtnRect from '../buttons/BtnRect';
import { Action } from 'src/types/action';
import ActionCard from '../ActionCard';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import ArrowHeader2 from '../ArrowHeader2';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useModalStore from 'src/stores/modalStore';

const ActionLinkField = ({ form }: { form: FormApi }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const parts = location.pathname.split('/');

  const setBackgroundPath = useModalStore((state) => state.setBackgroundPath);

  const openActionModal = () => {
    setBackgroundPath(location.pathname);
    navigate('actions');
  };

  return (
    <>
      <form.Subscribe selector={(state: FormState) => state.values.actions}>
        {(actions: Action[]) => (
          <>
            {actions.length > 0 && <ArrowHeader2 title="Linked Actions" />}
            <form.Field name="actions">
              {(field) => (
                <>
                  {parts[parts.length - 1] === 'actions' && (
                    <Outlet context={{ field }} />
                  )}
                  {actions.map((action: Action) => {
                    return (
                      <div className="flex items-center gap-4" key={action.id}>
                        <ActionCard action={action} mode="form" />
                        <button
                          onClick={() => {
                            field.handleChange(
                              field.state.value.filter(
                                (item: Action) => item.id !== action.id,
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
        ariaLabel="Open link action modal"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          openActionModal();
        }}
      >
        Link Actions
      </BtnRect>
    </>
  );
};

export default ActionLinkField;
