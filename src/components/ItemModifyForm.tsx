import { useForm, useStore } from '@tanstack/react-form';
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from 'src/contexts/AuthContext';
import useItemQuery from 'src/hooks/useItemQuery/useItemQuery';
import FormLayout from 'src/layouts/FormLayout';
import { Stats } from 'src/types/item';
import { Keyword } from 'src/types/keyword';
import TextAreaField from './TextAreaField';
import PictureField from './form_fields/PictureField';
import Loading from './Loading';
import InputField from './InputField';
import ArrowHeader2 from './ArrowHeader2';
import Divider from './Divider';
import Icon from '@mdi/react';
import { mdiMinus, mdiPlus, mdiStar } from '@mdi/js';
import ArrowHeader3 from './ArrowHeader3';
import BtnRect from './buttons/BtnRect';
import useModifyItemMutation from 'src/hooks/useModifyItemMutation/useModifyItemMutation';
import useDeleteItemMutation from 'src/hooks/useDeleteItemMutation/useDeleteItemMutation';
import { extractKeywordListIds } from 'src/utils/extractIds';

const ItemModifyForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const mode = parts[parts.length - 1];
  const itemId = parts[parts.length - 2];
  const category = parts[parts.length - 3].slice(0, -1);

  const { data: item, isLoading } = useItemQuery(
    apiUrl,
    Number(itemId),
    category,
  );

  const deleteItem = useDeleteItemMutation(
    apiUrl,
    setFormMessage,
    Number(itemId),
  );

  const modifyItem = useModifyItemMutation(
    apiUrl,
    Number(itemId),
    category,
    setFormMessage,
  );

  const handleDelete = () => {
    if (deleteMode) {
      deleteItem.mutate();
    } else {
      setDeleteMode(true);
    }
  };

  const handleReset = async () => {
    itemModifyForm.reset();
  };

  const itemModifyForm = useForm({
    defaultValues: {
      id: item?.id ?? null,
      name: item?.name ?? '',
      grade: item?.grade ?? '',
      description: item?.description ?? '',
      picture: item?.picture ?? '',
      position: item?.picture?.position ?? { x: 50, y: 50 },
      modifiedStats: {
        damage: item?.modifiedStats?.damage || 0,
        salvo: item?.modifiedStats?.salvo || 0,
        flurry: item?.modifiedStats?.flurry || 0,
        range: item?.modifiedStats?.range || 0,
        magCapacity: item?.modifiedStats?.magCapacity || 0,
        magCount: item?.modifiedStats?.magCount || 0,
        power: item?.modifiedStats?.power || 0,
      } as Stats,
      keywords:
        item?.keywords ?? ([] as { keyword: Keyword; value: number | null }[]),
    },
    onSubmit: async ({ value }) => {
      console.log(value);

      const filteredStats = Object.fromEntries(
        Object.entries(value.modifiedStats).filter(([_, val]) => val),
      );

      const { keywords, ...rest } = value;

      const data = {
        ...rest,
        modifiedStats: filteredStats,
        keywordIds: extractKeywordListIds(value.keywords),
      };

      const formData = new FormData();
      Object.entries(data).forEach(([key, val]) => {
        if (key === 'picture') {
          if (val instanceof File) {
            formData.append(key, val);
          } else {
            formData.append(key, JSON.stringify(val));
          }
        } else {
          formData.append(key, JSON.stringify(val));
        }
      });
      modifyItem.mutate(formData);
    },
  });

  const gradePointMap = {
    damage: 10,
    salvo: 5,
    flurry: 5,
    range: 1,
    magCapacity: 2,
    magCount: 10,
    power: 5,
  };

  const grade = useStore(itemModifyForm.store, (state) => state.values.grade);
  const stats = useStore(
    itemModifyForm.store,
    (state) => state.values.modifiedStats,
  );

  const usedGp = Object.entries(stats).reduce(
    (sum, [stat, value]) => sum + gradePointMap[stat] * value,
    0,
  );
  const availableGp = (grade - 1) * 5 - usedGp;

  if (isLoading) return <Loading />;

  return (
    <FormLayout
      itemId={itemId}
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
          itemModifyForm.handleSubmit();
        }}
      >
        <h1 className="text-center">Modify {item?.name}</h1>
        <Divider />
        <ArrowHeader2
          title={
            category.charAt(0).toUpperCase() +
            category.slice(1) +
            ' Information'
          }
        />
        <div className="grid w-full gap-8 max-sm:col-span-2 max-sm:grid-flow-row sm:grid-cols-2">
          <PictureField
            form={itemModifyForm}
            sizeInfo={{ aspectRatio: '1/1', maxHeight: '', minHeight: '' }}
          />
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <ArrowHeader3 title="Grade" />
              <itemModifyForm.Field name="grade">
                {(field) => (
                  <div className="flex items-center gap-4">
                    <button
                      className={`${field.state.value > item?.grade ? 'hover:text-accent' : 'opacity-50'} bg-tertiary text-secondary timing size-8 rounded-md text-center font-semibold shadow-md shadow-black`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (field.state.value > item?.grade) {
                          field.handleChange(field.state.value - 1);
                        }
                      }}
                    >
                      <Icon path={mdiMinus} className="text-inherit" />
                    </button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: field.state.value }).map(
                        (_, index) => (
                          <Icon
                            key={index}
                            path={mdiStar}
                            className="size-7 text-yellow-300"
                          />
                        ),
                      )}
                    </div>

                    <button
                      className={`bg-tertiary text-secondary timing hover:text-accent size-8 rounded-md text-center font-semibold shadow-md shadow-black`}
                      onClick={(e) => {
                        e.preventDefault();
                        field.handleChange(field.state.value + 1);
                      }}
                    >
                      <Icon path={mdiPlus} className="text-inherit" />
                    </button>
                  </div>
                )}
              </itemModifyForm.Field>
            </div>
            <itemModifyForm.Field
              name="name"
              validators={{
                onChange: ({ value }) =>
                  value.length < 2
                    ? 'Weapon name must be at least 2 characters long'
                    : undefined,
              }}
            >
              {(field) => (
                <InputField
                  className="grow"
                  label="Weapon Name"
                  field={field}
                />
              )}
            </itemModifyForm.Field>
            <itemModifyForm.Field
              name="description"
              validators={{
                onChange: ({ value }) =>
                  value.length < 2
                    ? 'Weapon description must be at least 2 characters long'
                    : undefined,
              }}
            >
              {(field) => (
                <TextAreaField label="Weapon Description" field={field} />
              )}
            </itemModifyForm.Field>
          </div>
        </div>
        <Divider />
        <div className="flex items-center justify-between gap-8">
          <ArrowHeader2 title="Grade Point Distribution" />
          <p>Available GP - {availableGp}</p>
        </div>
        <div className="grid w-full grid-cols-[1fr_auto_auto_auto] flex-col gap-x-2 gap-y-6 border-x-2 border-gray-400 border-opacity-50 px-6">
          {Object.entries(item?.stats).map(([stat, value]) => {
            const exists =
              itemModifyForm.getFieldValue(`modifiedStats[${stat}]`) !==
              undefined;
            return (
              exists && (
                <itemModifyForm.Field
                  name={`modifiedStats[${stat}]`}
                  key={stat}
                >
                  {(field) => {
                    return (
                      <>
                        <h4>
                          {stat.charAt(0).toUpperCase() + stat.slice(1)}{' '}
                          <span className="text-tertiary ml-2 text-base font-normal">
                            ({gradePointMap[stat]} GP)
                          </span>
                        </h4>
                        <button
                          className={`${field.state.value > 0 ? 'hover:text-accent' : 'opacity-30'} bg-tertiary text-secondary timing size-8 rounded-md text-center font-semibold shadow-md shadow-black`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (field.state.value > 0) {
                              field.handleChange(field.state.value - 1);
                            }
                          }}
                        >
                          <Icon path={mdiMinus} className="text-inherit" />
                        </button>
                        <p className="min-w-16 text-center">
                          {value + field.state.value}
                          {field.state.value > 0 && (
                            <span className="ml-3 text-base text-green-400 max-sm:text-sm">
                              +{field.state.value}
                            </span>
                          )}
                        </p>
                        <button
                          className={`${availableGp >= gradePointMap[stat] ? 'hover:text-accent' : 'opacity-30'} bg-tertiary text-secondary timing size-8 rounded-md text-center font-semibold shadow-md shadow-black`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (availableGp >= gradePointMap[stat]) {
                              field.handleChange(field.state.value + 1);
                            }
                          }}
                        >
                          <Icon path={mdiPlus} className="text-inherit" />
                        </button>
                      </>
                    );
                  }}
                </itemModifyForm.Field>
              )
            );
          })}
        </div>
        <BtnRect
          ariaLabel={mode.charAt(0).toUpperCase() + mode.slice(1)}
          type="submit"
          className="group w-full"
        >
          {/* {createWeapon.isPending || modifyWeapon.isPending ? (
            <Loading
              className="group-hover:text-yellow-300 dark:text-gray-900"
              size={1.15}
            />
          ) : ( */}
          {mode.charAt(0).toUpperCase() + mode.slice(1)}
          {/* )} */}
        </BtnRect>
      </form>
    </FormLayout>
  );
};

export default ItemModifyForm;
