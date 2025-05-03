import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import Loading from './Loading';
import useConditions from '../hooks/useConditions';
import ConditionCard from './ConditionCard';
import ArrowHeader2 from './ArrowHeader2';
import InputSelectField from './InputSelectField';
import Icon from '@mdi/react';
import { mdiSync } from '@mdi/js';

const Conditions = () => {
  const { accentPrimary } = useContext(ThemeContext);

  const conditions = useConditions();

  const searchForm = useForm({
    defaultValues: {
      query: '',
      category: '',
    },
    onSubmit: () => {
      conditions.filterByQuery('');
      conditions.filterByCategory('');
    },
  });

  if (conditions.isLoading || conditions.isPending) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8">
      <h1 className="text-center">Conditions</h1>
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
                  options={['', 'character', 'item']}
                  initialValue=""
                  onChange={() => {
                    conditions.filterByCategory(field.state.value);
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
                  label="Search conditions"
                  field={field}
                  onChange={() => {
                    conditions.filterByQuery(field.state.value);
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
            <div className="flex flex-col items-start gap-4 md:grid md:grid-cols-2">
              {conditions.filteredConditions.map((condition) => {
                return (
                  <ConditionCard
                    key={condition.name}
                    condition={condition}
                    mode="codex"
                  />
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
