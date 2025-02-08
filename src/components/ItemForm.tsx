import { useForm } from '@tanstack/react-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import BtnRect from './buttons/BtnRect';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import Loading from './Loading';
import FormLayout from '../layouts/FormLayout';
import { useParams } from 'react-router-dom';
import SelectField from './SelectField';
import SubactionForm from './SubactionForm';
import { Modifier } from 'src/types/modifier';
import ModifierField from './ModifierField';
import useDeleteItemMutation from '../hooks/useDeleteItemMutation/useDeleteItemMutation';
import useCreateItemMutation from '../hooks/useCreateItemMutation/useCreateItemMutation';
import useItemQuery from '../hooks/useItemQuery/useItemQuery';

const ItemForm = ({ title, mode }: { title: string; mode?: string }) => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { itemId } = useParams();

  const { data: item } = useItemQuery(apiUrl, itemId);

  const createItem = useCreateItemMutation(apiUrl, setFormMessage);
  const deleteItem = useDeleteItemMutation(apiUrl, setFormMessage, itemId);

  const handleDelete = () => {
    if (deleteMode) {
      deleteItem.mutate();
    } else {
      setDeleteMode(true);
    }
  };

  const handleReset = async () => {
    itemForm.reset();
  };

  const durationUnits = [
    'second',
    'minute',
    'hour',
    'day',
    'turn',
    'round',
    'scene',
    'session',
  ];

  const itemForm = useForm({
    defaultValues: {
      name: item?.name || '',
      rarity: item?.rarity || '',
      grade: item?.grade || 1,
      category: item?.category || '',
      itemType: item?.itemType || '',
      description: item?.description || '',
      stats: {
        stacks: item?.stats?.stacks || '',
        power: item?.stats?.power || '',
        weight: item?.stats?.weight || '',
      },
      duration: {
        unit: item?.duration?.unit || '',
        value: item?.duration?.value || '',
      },
      actions:
        item?.actions ||
        ([] as {
          name: string;
          costs: { stat: string; value: number }[];
          attribute: string;
          skill: string;
          actionType: string;
          actionSubtypes: string[];
          description: string;
        }[]),
      modifiers: item?.modifiers || ([] as Modifier[]),
      price: item?.price || null,
    },
    onSubmit: async ({ value }) => {
      const filteredStats = Object.fromEntries(
        Object.entries(value.stats).filter(([_, val]) => val),
      );

      value.stats = { ...item?.stats, ...filteredStats };

      const formData = new FormData();

      Object.entries(value).forEach(([key, value]) => {
        if (key === 'picture' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });
      formData.append('itemId', JSON.stringify(itemId || 0));
      // await createItem.mutate(formData);
    },
  });

  return (
    <FormLayout
      itemId={itemId}
      createMutation={createItem}
      deleteMutation={deleteItem}
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
          itemForm.handleSubmit();
        }}
      >
        <div className="flex items-center justify-center gap-4">
          <h1>{title} Item</h1>
        </div>
        <div className="flex w-full gap-4 lg:gap-8">
          <itemForm.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Armor name must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <InputField className="grow" label="Item name" field={field} />
            )}
          </itemForm.Field>
          <itemForm.Field name="price">
            {(field) => (
              <InputField
                className="max-w-28"
                type="number"
                label="Price"
                field={field}
              />
            )}
          </itemForm.Field>
        </div>
        <div className="flex w-full items-center gap-4 lg:gap-8">
          <itemForm.Field
            name="rarity"
            validators={{
              onSubmit: ({ value }) => (!value ? 'Select a rarity' : undefined),
            }}
          >
            {(field) => (
              <SelectField className="w-full" label="Item rarity" field={field}>
                <option value=""></option>
                <option value="common">Common</option>
                <option value="uncommon">Uncommon</option>
                <option value="rare">Rare</option>
                <option value="blackMarket">Black Market</option>
                <option value="artifact">Artifact</option>
              </SelectField>
            )}
          </itemForm.Field>
          <itemForm.Field
            name="grade"
            validators={{
              onChange: ({ value }) =>
                value <= 0 ? 'Minimum grade is 1' : undefined,
            }}
          >
            {(field) => (
              <InputField
                className="w-full max-w-28"
                type="number"
                label="Item grade"
                field={field}
              />
            )}
          </itemForm.Field>
        </div>
        <div className="flex w-full items-center gap-4 lg:gap-8">
          <itemForm.Field
            name="category"
            validators={{
              onSubmit: ({ value }) =>
                !value ? 'Select a category' : undefined,
            }}
          >
            {(field) => (
              <SelectField
                className="w-full"
                label="Item category"
                field={field}
              >
                <option value=""></option>
                <option value="reusable">Reusable</option>
                <option value="consumable">Consumable</option>
              </SelectField>
            )}
          </itemForm.Field>
          <itemForm.Field
            name="itemType"
            validators={{
              onChange: ({ value }) =>
                value <= 0 ? 'Provide an item type' : undefined,
            }}
          >
            {(field) => (
              <InputField
                className="w-full"
                type="string"
                label="Item type"
                field={field}
              />
            )}
          </itemForm.Field>
        </div>
        <itemForm.Field
          name="description"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Item description must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => (
            <TextAreaField
              className="h-48 w-full sm:h-full"
              label="Item description"
              field={field}
            />
          )}
        </itemForm.Field>
        <div>
          <itemForm.Subscribe selector={() => itemForm.state.values.category}>
            {(category) => (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
                <itemForm.Field name="stats.power">
                  {(field) => (
                    <InputField
                      className="grow"
                      type="number"
                      label="Power"
                      field={field}
                    />
                  )}
                </itemForm.Field>
                <itemForm.Field name="stats.weight">
                  {(field) => (
                    <InputField
                      className="grow"
                      type="number"
                      label="Weight"
                      field={field}
                    />
                  )}
                </itemForm.Field>
                {category === 'consumable' && (
                  <itemForm.Field name="stats.stacks">
                    {(field) => (
                      <InputField
                        className="grow"
                        type="number"
                        label="Stacks"
                        field={field}
                      />
                    )}
                  </itemForm.Field>
                )}
              </div>
            )}
          </itemForm.Subscribe>
        </div>
        <div className="flex w-full items-center gap-4 lg:gap-8">
          <itemForm.Field name="duration.unit">
            {(field) => (
              <SelectField
                className="w-full"
                label="Effect duration"
                field={field}
              >
                <option value=""></option>
                {durationUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit[0].toUpperCase() + unit.slice(1)}
                  </option>
                ))}
              </SelectField>
            )}
          </itemForm.Field>
          <itemForm.Field
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
                label="Dur. value"
                field={field}
              />
            )}
          </itemForm.Field>
        </div>
        <hr className="border-yellow-300 border-opacity-50" />
        <SubactionForm form={itemForm} />
        <hr className="border-yellow-300 border-opacity-50" />
        <ModifierField form={itemForm} />
        <hr className="border-yellow-300 border-opacity-50" />

        <BtnRect type="submit" className="group w-full">
          {createItem.isPending ? (
            <Loading
              className="group-hover:text-yellow-300 dark:text-gray-900"
              size={1.15}
            />
          ) : (
            title
          )}
        </BtnRect>
      </form>
    </FormLayout>
  );
};

export default ItemForm;
