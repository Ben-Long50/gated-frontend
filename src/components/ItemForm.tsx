import { useForm } from '@tanstack/react-form';
import { useContext, useEffect, useState } from 'react';
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
import { mdiCloseBox, mdiImagePlus } from '@mdi/js';
import Icon from '@mdi/react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import { ItemStats } from 'src/types/item';
import useModifyItemMutation from '../hooks/useModifyItemMutation/useModifyItemMutation';
import Divider from './Divider';
import ArrowHeader2 from './ArrowHeader2';

const ItemForm = ({ title, mode }: { title: string; mode?: string }) => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { itemId } = useParams();

  const { data: item } = useItemQuery(apiUrl, Number(itemId), {
    enabled: !!itemId,
  });

  const [imagePreview, setImagePreview] = useState(
    item?.picture?.imageUrl || '',
  );

  const createItem = useCreateItemMutation(apiUrl, setFormMessage);
  const modifyItem = useModifyItemMutation(
    apiUrl,
    Number(itemId),
    setFormMessage,
  );
  const deleteItem = useDeleteItemMutation(apiUrl, setFormMessage, itemId);

  useEffect(() => {
    if (item) {
      setImagePreview(item.picture?.imageUrl);
    } else setImagePreview('');
  }, [item, itemId]);

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file

    if (selectedFile) {
      itemForm.setFieldValue('picture', selectedFile);

      // Create a URL for the selected file to preview
      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

  const itemForm = useForm({
    defaultValues: {
      id: Number(itemId) || 0,
      name: item?.name || '',
      rarity: item?.rarity || '',
      grade: item?.grade || 1,
      picture: item?.picture || '',
      category: item?.category || '',
      subcategory: item?.subcategory || '',
      itemType: item?.itemType || '',
      description: item?.description || '',
      stats: {
        currentStacks: item?.stats.currentStacks || '',
        maxStacks: item?.stats.maxStacks || '',
        power: item?.stats.power || '',
        currentPower: item?.stats.currentPower || '',
        weight: item?.stats.weight || '',
      } as ItemStats,
      actions:
        item?.actions ||
        ([] as {
          name: string;
          costs: { stat: string; value: number }[];
          roll: { attribute: string; skill: string }[];
          actionType: string;
          actionSubtypes: string[];
          duration: {
            unit: string;
            value: number;
          };
          description: string;
        }[]),
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
      price: item?.price || null,
    },
    onSubmit: async ({ value }) => {
      value.stats.currentPower = value.stats.power;

      const filteredStats = Object.fromEntries(
        Object.entries(value.stats).filter(([_, val]) => val),
      );

      value.stats = { ...filteredStats };

      const formData = new FormData();

      Object.entries(value).forEach(([key, value]) => {
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
          <h1>{title} Item</h1>
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
          <itemForm.Subscribe selector={() => itemForm.state.values.category}>
            {(category) => (
              <itemForm.Field
                name="subcategory"
                validators={{
                  onSubmit: ({ value }) =>
                    !value ? 'Select a subcategory' : undefined,
                }}
              >
                {(field) => (
                  <SelectField
                    className="w-full"
                    label="Item subcategory"
                    field={field}
                  >
                    <option value=""></option>
                    {category === 'reusable' ? (
                      <>
                        <option value="anomaly">Anomaly</option>
                        <option value="gadget">Gadget</option>
                      </>
                    ) : (
                      <>
                        <option value="chemicalTherapy">
                          Chemical therapy
                        </option>
                        <option value="chemicalAssistance">
                          Chemical assistance
                        </option>

                        <option value="misc">Misc.</option>
                      </>
                    )}
                  </SelectField>
                )}
              </itemForm.Field>
            )}
          </itemForm.Subscribe>
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
        <div className="flex flex-col gap-8 sm:flex-row">
          <ThemeContainer
            className="mx-auto w-full max-w-sm"
            chamfer="medium"
            borderColor={accentPrimary}
            overflowHidden={true}
          >
            {!imagePreview ? (
              <label className="bg-secondary flex aspect-square size-full w-full cursor-pointer flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-2 pb-6 pt-5">
                  <Icon
                    className="text-tertiary"
                    path={mdiImagePlus}
                    size={3}
                  />
                  <p className="text-tertiary font-semibold">
                    Upload item picture
                  </p>
                  <p className="text-tertiary">PNG, JPG, JPEG</p>
                </div>
                <input
                  id="file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="bg-secondary relative flex aspect-square max-w-4xl items-center justify-center overflow-hidden bg-black clip-6">
                <img
                  className="fade-in-bottom"
                  src={imagePreview}
                  alt="Preview"
                />
                <button
                  className="text-secondary absolute right-2 top-2"
                  onClick={() => {
                    itemForm.setFieldValue('picture', '');
                    setImagePreview('');
                  }}
                >
                  <div className="rounded bg-zinc-950">
                    <Icon path={mdiCloseBox} size={1.5} />
                  </div>
                </button>
              </div>
            )}
          </ThemeContainer>
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
        <Divider />
        <SubactionForm form={itemForm} />
        <Divider />
        <ModifierField form={itemForm} />
        <Divider />
        <BtnRect
          ariaLabel={`${title} item`}
          type="submit"
          className="group w-full"
        >
          {createItem.isPending || modifyItem.isPending ? (
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
