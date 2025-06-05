import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { FieldApi, useForm } from '@tanstack/react-form';
import Loading from './Loading';
import useConditions from '../hooks/useConditions';
import ConditionCard from './ConditionCard';
import ArrowHeader2 from './ArrowHeader2';
import InputSelectField from './InputSelectField';
import Icon from '@mdi/react';
import { mdiSync } from '@mdi/js';
import { Condition } from 'src/types/condition';
import InputFieldBasic from './InputFieldBasic';

const Conditions = ({
  title,
  mode,
  field,
  conditionList,
}: {
  title?: string;
  mode?: string;
  field?: FieldApi;
  conditionList?: Condition[];
}) => {
  const { accentPrimary } = useContext(ThemeContext);

  const {
    filteredConditions: conditions,
    isLoading,
    isPending,
    filterByCategory,
    filterByQuery,
  } = useConditions(conditionList);

  const searchForm = useForm({
    defaultValues: {
      query: '',
      category: '',
    },
    onSubmit: () => {
      filterByQuery('');
      filterByCategory('');
    },
  });

  if (isLoading || isPending) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8">
      <h1 className="text-center">{title || 'Conditions'}</h1>
      <ThemeContainer
        className={`ml-auto w-full`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <form className="flex w-full flex-col gap-4 p-4">
          <div className="grid w-full grid-cols-2 gap-4 sm:gap-8">
            <ArrowHeader2 title="Filter Options" />
            <searchForm.Field name="category">
              {(field) => (
                <InputSelectField
                  field={field}
                  label="Condition Type"
                  options={['character', 'item']}
                  onChange={() => {
                    filterByCategory(field.state.value);
                  }}
                />
              )}
            </searchForm.Field>
          </div>
          <div className="flex items-end gap-4">
            <searchForm.Field name="query">
              {(field) => (
                <InputField
                  className="w-full"
                  label="Search Conditions"
                  field={field}
                  onChange={() => {
                    filterByQuery(field.state.value);
                  }}
                />
              )}
            </searchForm.Field>
            <button
              className="text-accent bg-tertiary group z-10 grid size-12 shrink-0 place-items-center rounded-md p-1.5 shadow-md shadow-black hover:underline"
              onClick={(e) => {
                e.preventDefault();
                searchForm.reset();
                searchForm.handleSubmit();
              }}
            >
              <Icon
                path={mdiSync}
                className="text-secondary group-hover:text-accent timing"
              />
            </button>
          </div>
        </form>
      </ThemeContainer>
      <ThemeContainer
        chamfer="medium"
        className="w-full"
        borderColor={accentPrimary}
      >
        <div className="flex w-full flex-col gap-8 p-4 sm:p-8">
          <div className="flex flex-col gap-8">
            <searchForm.Subscribe selector={(state) => state.values.category}>
              {(category) => (
                <ArrowHeader2
                  title={
                    category.length > 0
                      ? category[0].toUpperCase() +
                        category.slice(1) +
                        ' Conditions'
                      : 'All Conditions'
                  }
                />
              )}
            </searchForm.Subscribe>
            <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
              {conditions?.map((condition) => {
                const activeCondition =
                  mode === 'form'
                    ? field.state.value.find(
                        (item: {
                          condition: Condition;
                          stacks: number | null;
                        }) => item.condition.id === condition.id,
                      )
                    : null;
                return (
                  <div key={condition.id} className="flex items-center gap-4">
                    <ConditionCard mode={mode} condition={condition}>
                      {activeCondition && (
                        <InputFieldBasic
                          className="max-w-20 shrink-0"
                          name="value"
                          type="number"
                          label="Stacks"
                          value={activeCondition.stacks}
                          onChange={(stacks: number | string) => {
                            const updatedValue = field.state.value.map(
                              (item: {
                                condition: Condition;
                                stacks: number | null;
                              }) =>
                                item.condition.id === condition.id
                                  ? {
                                      condition: item.condition,
                                      stacks,
                                    }
                                  : item,
                            );
                            field.handleChange(updatedValue);
                          }}
                        />
                      )}
                    </ConditionCard>
                    {mode === 'form' && (
                      <input
                        className="size-6 shrink-0"
                        type="checkbox"
                        checked={activeCondition}
                        onChange={() => {
                          if (!activeCondition) {
                            field.handleChange([
                              ...field.state.value,
                              { condition },
                            ]);
                          } else {
                            field.handleChange(
                              field.state.value.filter(
                                (item: {
                                  condition: Condition;
                                  stacks: number | null;
                                }) => item.condition.id !== condition.id,
                              ),
                            );
                          }
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ThemeContainer>
    </div>
  );
};

export default Conditions;
