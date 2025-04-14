import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import { LayoutContext } from '../contexts/LayoutContext';
import Loading from './Loading';
import useConditions from '../hooks/useConditions';
import ConditionCard from './ConditionCard';
import SelectField from './SelectField';
import ArrowHeader2 from './ArrowHeader2';

const Conditions = ({ mode }: { mode?: string }) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);

  const conditions = useConditions();

  const searchForm = useForm({
    defaultValues: {
      query: '',
      category: '',
    },
    onSubmit: ({ value }) => {
      conditions.filterByQuery(value.query);
    },
  });

  if (conditions.isLoading || conditions.isPending) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8">
      <h1 className="text-center">Conditions</h1>
      <ThemeContainer
        className={`ml-auto w-full rounded-br-5xl rounded-tl-5xl shadow-lg shadow-zinc-950`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <form className="bg-primary flex w-full flex-col gap-4 p-4 clip-6">
          <div className="flex w-full items-center justify-between">
            <ArrowHeader2 title="Filter Options" />
            <searchForm.Field name="category">
              {(field) => (
                <SelectField
                  field={field}
                  onChange={() => {
                    conditions.filterByCategory(field.state.value);
                  }}
                >
                  <option value="">All conditions</option>
                  <option value="character">Character conditions</option>
                  <option value="item">Item conditions</option>
                </SelectField>
              )}
            </searchForm.Field>
          </div>
          <searchForm.Field name="query">
            {(field) => (
              <InputField
                label="Search conditions"
                field={field}
                onChange={() => {
                  searchForm.handleSubmit();
                }}
              />
            )}
          </searchForm.Field>
        </form>
      </ThemeContainer>
      <ThemeContainer
        chamfer="medium"
        className="w-full rounded-br-5xl rounded-tl-5xl shadow-lg shadow-slate-950"
        borderColor={accentPrimary}
      >
        <div className="bg-primary flex w-full flex-col gap-8 p-4 clip-6 sm:p-8">
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
