import { FormApi, FormState } from '@tanstack/react-form';
import FormLinkModal from './FormLinkModal';
import { useState } from 'react';
import BtnRect from '../buttons/BtnRect';
import { Action } from 'src/types/action';
import Actions from '../Actions';
import ActionCard from '../ActionCard';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import ArrowHeader2 from '../ArrowHeader2';

const ActionLinkField = ({ form }: { form: FormApi }) => {
  const [actionsOpen, setActionsOpen] = useState(false);

  const toggleActions = () => setActionsOpen((prev) => !prev);

  return (
    <>
      <form.Subscribe selector={(state: FormState) => state.values.actions}>
        {(actions: Action[]) => (
          <>
            {actions.length > 0 && <ArrowHeader2 title="Linked Actions" />}
            <form.Field name="actions">
              {(field) => (
                <>
                  <FormLinkModal
                    key="actions"
                    field={field}
                    modalOpen={actionsOpen}
                    toggleModal={toggleActions}
                  >
                    {({ toggleFormLink }) => (
                      <Actions
                        title="Link Actions"
                        mode="form"
                        field={field}
                        toggleFormLink={toggleFormLink}
                      />
                    )}
                  </FormLinkModal>
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
          toggleActions();
        }}
      >
        Link Actions
      </BtnRect>
    </>
  );
};

export default ActionLinkField;
