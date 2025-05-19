import { useForm } from '@tanstack/react-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import BtnRect from './buttons/BtnRect';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import Loading from './Loading';
import FormLayout from '../layouts/FormLayout';
import { useLocation, useParams } from 'react-router-dom';
import SelectField from './SelectField';
import { Modifier } from 'src/types/modifier';
import useDeleteItemMutation from '../hooks/useDeleteItemMutation/useDeleteItemMutation';
import useCreateItemMutation from '../hooks/useCreateItemMutation/useCreateItemMutation';
import useItemQuery from '../hooks/useItemQuery/useItemQuery';
import { ThemeContext } from '../contexts/ThemeContext';
import { Stats } from 'src/types/item';
import useModifyItemMutation from '../hooks/useModifyItemMutation/useModifyItemMutation';
import Divider from './Divider';
import ArrowHeader2 from './ArrowHeader2';
import { Action } from 'src/types/action';
import { Keyword } from 'src/types/keyword';
import { extractItemListIds, extractKeywordListIds } from '../utils/extractIds';
import KeywordLinkField from './form_fields/KeywordLinkField';
import ActionLinkField from './form_fields/ActionLinkField';
import PictureField from './form_fields/PictureField';
import RarityField from './form_fields/RarityField';

const ItemForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { itemId } = useParams();
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const mode = parts[parts.length - 1];

  const { data: item } = useItemQuery(apiUrl, Number(itemId), 'item');

  const createItem = useCreateItemMutation(
    apiUrl,
    setFormMessage,
    Number(itemId),
  );

  const modifyItem = useModifyItemMutation(
    apiUrl,
    Number(itemId),
    setFormMessage,
  );
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

  const itemForm = useForm({
    defaultValues: {
      id: item?.id || null,
      name: item?.name || '',
      rarity: item?.rarity || '',
      grade: item?.grade || 1,
      picture: item?.picture || '',
      position: item?.picture?.position || { x: 50, y: 50 },
      category: item?.category || '',
      description: item?.description || '',
      price: item?.price || '',
      stats: {
        range: item?.stats.range || '',
        power: item?.stats.power || '',
        currentPower: item?.stats.currentPower || '',
        weight: item?.stats.weight || '',
      } as Stats,
      actions: item?.actions || ([] as Action[]),
      keywords:
        item?.keywords || ([] as { keyword: Keyword; value?: number }[]),
      modifiers:
        item?.modifiers?.map((modifier: Modifier) => ({
          type: modifier.type,
          actionId: modifier.action?.id || null,
          stat: modifier.stat || null,
          operator: modifier.operator,
          valueType: modifier.valueType,
          attribute: modifier.attribute,
          skill: modifier.skill,
          value: modifier.value,
          duration: modifier.duration,
        })) || ([] as Modifier[]),
    },
    onSubmit: async ({ value }) => {
      value.stats.currentPower = value.stats.power;

      const filteredStats = Object.fromEntries(
        Object.entries(value.stats).filter(([_, val]) => val),
      );

      value.stats = { ...filteredStats };

      const { actions, keywords, ...rest } = value;

      const data = {
        ...rest,
        actionIds: extractItemListIds(value.actions),
        keywordIds: extractKeywordListIds(value.keywords),
      };

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'picture' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });

      if (mode === 'create' || mode === 'update') {
        await createItem.mutate(formData);
      } else if (mode === 'modify') {
        await modifyItem.mutate(formData);
      }
    },
  });

  return (
    <FormLayout
      itemId={itemId}
      createMutation={createItem}
      modifyMutation={modifyItem}
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
          <h1>{mode.charAt(0).toUpperCase() + mode.slice(1) + ' Item'}</h1>
        </div>
        <Divider />
        <ArrowHeader2 title="Item Information" />
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
          <RarityField form={itemForm} />
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
        <itemForm.Field
          name="category"
          validators={{
            onSubmit: ({ value }) => (!value ? 'Select a category' : undefined),
          }}
        >
          {(field) => (
            <SelectField className="w-full" label="Item category" field={field}>
              <option value=""></option>
              <option value="reusable">Reusable</option>
              <option value="consumable">Consumable</option>
            </SelectField>
          )}
        </itemForm.Field>
        <div className="grid w-full gap-8 max-sm:col-span-2 max-sm:grid-flow-row sm:grid-cols-2">
          <PictureField
            form={itemForm}
            sizeInfo={{ aspectRatio: '1/1', maxHeight: '', minHeight: '' }}
          />
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
              <TextAreaField label="Item description" field={field} />
            )}
          </itemForm.Field>
        </div>
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
                <itemForm.Field name="stats.range">
                  {(field) => (
                    <InputField
                      className="grow"
                      type="number"
                      label="Range"
                      field={field}
                    />
                  )}
                </itemForm.Field>
                <itemForm.Field name="stats.weight">
                  {(field) => (
                    <InputField
                      className="grow"
                      type="number"
                      label={
                        category === 'consumable'
                          ? 'Weight per stack'
                          : 'Weight'
                      }
                      field={field}
                    />
                  )}
                </itemForm.Field>
                {category === 'consumable' && (
                  <itemForm.Field name="stats.currentStacks">
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
                {category === 'consumable' && (
                  <itemForm.Field name="stats.maxStacks">
                    {(field) => (
                      <InputField
                        className="grow"
                        type="number"
                        label="Max. stacks"
                        field={field}
                      />
                    )}
                  </itemForm.Field>
                )}
              </div>
            )}
          </itemForm.Subscribe>
        </div>
        <div className="flex flex-col gap-4">
          <KeywordLinkField form={itemForm} />
          <Divider />
          <ActionLinkField form={itemForm} />
          <Divider />
        </div>
        <BtnRect
          ariaLabel={`${mode.charAt(0).toUpperCase() + mode.slice(1)} item`}
          type="submit"
          className="group w-full"
        >
          {createItem.isPending || modifyItem.isPending ? (
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

export default ItemForm;
