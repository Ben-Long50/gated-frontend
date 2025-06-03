import { useContext, useState } from 'react';
import InputField from './InputField';
import BtnRect from './buttons/BtnRect';
import TextAreaField from './TextAreaField';
import { AuthContext } from '../contexts/AuthContext';
import { useForm } from '@tanstack/react-form';
import useAttributeTree from '../hooks/useAttributeTree';
import SelectField from './SelectField';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import FormLayout from '../layouts/FormLayout';
import useCreateActionMutation from '../hooks/useCreateActionMutation/useCreateActionMutation';
import { useLocation, useParams } from 'react-router-dom';
import Loading from './Loading';
import useDeleteActionMutation from '../hooks/useDeleteActionMutation/useDeleteActionMutation';
import useActions from '../hooks/useActions';
import { Action, ActionCosts } from 'src/types/action';
import Divider from './Divider';
import ArrowHeader2 from './ArrowHeader2';
import ModifierField from './form_fields/ModifierField';
import InputSelectField from './InputSelectField';

const ActionForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { actionId } = useParams();
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const mode = parts[parts.length - 1];

  const actions = useActions();

  const action = actions.filteredActions.filter(
    (action: Action) => action.id === Number(actionId),
  )[0];

  const createAction = useCreateActionMutation(apiUrl, setFormMessage);
  const deleteAction = useDeleteActionMutation(apiUrl, setFormMessage);

  const handleDelete = () => {
    if (deleteMode && actionId) {
      deleteAction.mutate(actionId);
    } else {
      setDeleteMode(true);
    }
  };

  const handleReset = async () => {
    actionForm.reset();
  };

  const attributeTree = useAttributeTree();

  const actionForm = useForm({
    defaultValues: {
      id: action?.id || 0,
      name: action?.name || '',
      costs: {
        actionPoints: action?.costs?.actionPoints || '',
        reactionPoints: action?.costs?.reactionPoints || '',
        power: action?.costs?.power || '',
        health: action?.costs?.health || '',
        sanity: action?.costs?.sanity || '',
        wyrmShells: action?.costs?.wyrmShells || '',
        currentAmmoCount: action?.costs?.currentAmmoCount || '',
      },
      roll:
        action?.roll ||
        ([] as {
          attribute: string;
          skill: string;
        }[]),
      actionType: action?.actionType || '',
      actionSubtypes: action?.actionSubtypes || ([] as string[]),
      duration:
        action?.duration ||
        ({ unit: '', value: null } as { unit: string; value: number | null }),
      description: action?.description || '',
      modifiers: action?.modifiers || {},
    },
    onSubmit: async ({ value }) => {
      const filteredSubtypes = value.actionSubtypes.filter(
        (subtype) => subtype.length,
      );

      const filteredCosts = Object.fromEntries(
        Object.entries(value.costs).filter(([_, value]) => value),
      ) as ActionCosts;

      value.costs = filteredCosts;

      value.actionSubtypes = filteredSubtypes;

      await createAction.mutate(value);
    },
  });

  return (
    <FormLayout
      itemId={actionId}
      createMutation={createAction}
      deleteMutation={deleteAction}
      handleDelete={handleDelete}
      handleReset={handleReset}
      formMessage={formMessage}
      deleteMode={deleteMode}
      setDeleteMode={setDeleteMode}
    >
      <form
        className="flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          actionForm.handleSubmit();
        }}
      >
        <h1 className="text-center">
          {mode.charAt(0).toUpperCase() + mode.slice(1) + ' Action'}
        </h1>
        <Divider />
        <ArrowHeader2 title="Action Information" />
        <actionForm.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Action name must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => (
            <InputField className="grow" label="Action name" field={field} />
          )}
        </actionForm.Field>
        <actionForm.Field
          name="actionType"
          validators={{
            onSubmit: ({ value }) =>
              !value ? 'An action type must be selected' : undefined,
          }}
        >
          {(field) => (
            <InputSelectField
              options={['action', 'extendedAction', 'reaction', 'passive']}
              label="Action Type"
              field={field}
            />
          )}
        </actionForm.Field>
        <actionForm.Field name="roll" mode="array">
          {(field) => {
            return (
              <div className="flex w-full flex-col gap-4 sm:gap-6 lg:gap-8">
                {field.state.value.map((_, j: number) => (
                  <div key={j} className="flex w-full gap-4 sm:gap-6 lg:gap-8">
                    <div className="flex w-full flex-col gap-4 sm:flex-row sm:gap-6 lg:gap-8">
                      <actionForm.Field
                        name={`roll[${j}].attribute`}
                        listeners={{
                          onChange: () => {
                            actionForm.setFieldValue(`roll[${j}].skill`, '');
                          },
                        }}
                      >
                        {(field) => (
                          <InputSelectField
                            options={Object.keys(attributeTree.tree)}
                            label="Attribute"
                            field={field}
                          />
                        )}
                      </actionForm.Field>
                      <actionForm.Subscribe
                        selector={(state) => state.values.roll[j].attribute}
                      >
                        {(attribute) => (
                          <actionForm.Field name={`roll[${j}].skill`}>
                            {(field) => {
                              return (
                                <InputSelectField
                                  options={
                                    attribute
                                      ? Object.keys(
                                          attributeTree.tree[attribute].skills,
                                        )
                                      : []
                                  }
                                  label="Skill"
                                  field={field}
                                />
                              );
                            }}
                          </actionForm.Field>
                        )}
                      </actionForm.Subscribe>
                    </div>
                    <button
                      className="sm:-ml-2 lg:-ml-4"
                      onClick={() => field.removeValue(j)}
                      type="button"
                    >
                      <Icon
                        className="text-tertiary"
                        path={mdiClose}
                        size={1}
                      />
                    </button>
                  </div>
                ))}
                <div className="my-auto flex items-center justify-end gap-4 self-end sm:col-start-2 lg:gap-8">
                  <button
                    className="text-accent self-end hover:underline"
                    onClick={() =>
                      field.pushValue({
                        attribute: '',
                        skill: '',
                      })
                    }
                    type="button"
                  >
                    Add roll
                  </button>
                </div>
              </div>
            );
          }}
        </actionForm.Field>
        <actionForm.Field name="actionSubtypes" mode="array">
          {(field) => {
            return (
              <div className="flex flex-col gap-4">
                {field.state.value.map((_, i) => {
                  return (
                    <div key={i} className="flex gap-2 sm:gap-4 lg:gap-6">
                      <actionForm.Field name={`actionSubtypes[${i}]`}>
                        {(subField) => {
                          return (
                            <InputSelectField
                              options={[
                                'attack',
                                'movement',
                                'upkeep',
                                'unique',
                              ]}
                              label="Action Subtype"
                              field={subField}
                            />
                          );
                        }}
                      </actionForm.Field>
                      <button
                        className="sm:-ml-2 lg:-ml-4"
                        onClick={() => field.removeValue(i)}
                        type="button"
                      >
                        <Icon
                          className="text-tertiary"
                          path={mdiClose}
                          size={1}
                        />
                      </button>
                    </div>
                  );
                })}
                <div className="my-auto flex items-center justify-end gap-4 self-end sm:col-start-2 lg:gap-8">
                  <button
                    className="text-accent self-end hover:underline"
                    onClick={() => field.pushValue('')}
                    type="button"
                  >
                    Add Subtype
                  </button>
                </div>
              </div>
            );
          }}
        </actionForm.Field>
        <div className="flex w-full items-center gap-4 lg:gap-8">
          <actionForm.Field name="duration.unit">
            {(field) => (
              <InputSelectField
                options={[
                  'second',
                  'minute',
                  'hour',
                  'day',
                  'action',
                  'turn',
                  'round',
                  'scene',
                  'session',
                ]}
                label="Effect Duration"
                field={field}
              />
            )}
          </actionForm.Field>
          <actionForm.Field
            name="duration.value"
            validators={{
              onChange: ({ value }) =>
                value && value <= 0 ? 'Minimum value is 1' : undefined,
            }}
          >
            {(field) => (
              <InputField
                className="w-full max-w-28"
                type="number"
                label="Dur. Value"
                field={field}
              />
            )}
          </actionForm.Field>
        </div>
        <actionForm.Field
          name="description"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Action description must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => (
            <TextAreaField
              className="w-full"
              label="Action Description"
              field={field}
            />
          )}
        </actionForm.Field>
        <Divider />
        <ModifierField form={actionForm} />
        <ArrowHeader2 title="Action Costs" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
          <actionForm.Field name="costs.actionPoints">
            {(field) => (
              <InputField
                className="grow"
                type="number"
                label="Actions"
                field={field}
              />
            )}
          </actionForm.Field>
          <actionForm.Field name="costs.reactionPoints">
            {(field) => (
              <InputField
                className="grow"
                type="number"
                label="Reactions"
                field={field}
              />
            )}
          </actionForm.Field>
          <actionForm.Field name="costs.power">
            {(field) => (
              <InputField
                className="grow"
                type="number"
                label="Power"
                field={field}
              />
            )}
          </actionForm.Field>
          <actionForm.Field name="costs.health">
            {(field) => (
              <InputField
                className="grow"
                type="number"
                label="Health"
                field={field}
              />
            )}
          </actionForm.Field>
          <actionForm.Field name="costs.sanity">
            {(field) => (
              <InputField
                className="grow"
                type="number"
                label="Sanity"
                field={field}
              />
            )}
          </actionForm.Field>
          <actionForm.Field name="costs.wyrmShells">
            {(field) => (
              <InputField
                className="grow"
                type="number"
                label="Wyrm Shells"
                field={field}
              />
            )}
          </actionForm.Field>
          <actionForm.Field name="costs.currentAmmoCount">
            {(field) => (
              <InputField
                className="grow"
                type="number"
                label="Ammunition"
                field={field}
              />
            )}
          </actionForm.Field>
        </div>
        <Divider />
        <BtnRect
          ariaLabel={mode.charAt(0).toUpperCase() + mode.slice(1)}
          type="submit"
          className="group w-full"
        >
          {createAction.isPending ? (
            <Loading
              className="group-hover:text-yellow-300 dark:text-gray-900"
              size={1.15}
            />
          ) : (
            mode.charAt(0).toUpperCase() + mode.slice(1)
          )}
        </BtnRect>
      </form>
    </FormLayout>
  );
};

export default ActionForm;
