import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import { LayoutContext } from '../contexts/LayoutContext';
import useActions from '../hooks/useActions';
import ActionCard from './ActionCard';
import Loading from './Loading';
import SelectField from './SelectField';
import { mdiTriangleDown } from '@mdi/js';
import Icon from '@mdi/react';
import ArrowHeader2 from './ArrowHeader1';

const Actions = ({ mode }: { mode?: string }) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);

  const actions = useActions();

  const searchForm = useForm({
    defaultValues: {
      query: '',
      category: '',
      subCategory: '',
    },
    onSubmit: ({ value }) => {
      actions.filterByQuery(value.query);
    },
  });

  if (actions.isLoading || actions.isPending) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8">
      <h1 className="text-center">Actions</h1>
      <ThemeContainer
        className={`ml-auto w-full rounded-br-5xl rounded-tl-5xl shadow-lg shadow-zinc-950`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <form className="bg-primary flex w-full flex-col gap-4 p-4 clip-6">
          <div className="grid w-full grid-cols-2 items-center justify-between gap-4 sm:grid-cols-3 sm:gap-8">
            <ArrowHeader2 title="Filter Options" />
            <searchForm.Field name="category">
              {(field) => (
                <SelectField
                  className="w-full"
                  field={field}
                  onChange={() => {
                    actions.filterByCategory(field.state.value);
                  }}
                >
                  <option value="">All actions</option>
                  <option value="action">Actions</option>
                  <option value="extendedAction">Extended Actions</option>
                  <option value="reaction">Reactions</option>
                </SelectField>
              )}
            </searchForm.Field>
            <searchForm.Field name="subCategory">
              {(field) => (
                <SelectField
                  className="w-full"
                  field={field}
                  onChange={() => {
                    actions.filterBySubCategory(field.state.value);
                  }}
                >
                  <option value="">All action types</option>
                  <option value="attack">Attack</option>
                  <option value="movement">Movement</option>
                  <option value="upkeep">Upkeep</option>
                  <option value="unique">Unique</option>
                </SelectField>
              )}
            </searchForm.Field>
          </div>
          <searchForm.Field name="query">
            {(field) => (
              <InputField
                label="Search actions"
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
          <searchForm.Subscribe selector={(state) => state.values.category}>
            {(category) => {
              let title = 'All Actions';
              switch (category) {
                case 'action':
                  title = 'Actions';
                  break;
                case 'extendedAction':
                  title = 'Extended Actions';
                  break;
                case 'reaction':
                  title = 'Reactions';
                  break;
                default:
                  title = 'All Actions';
                  break;
              }
              return <ArrowHeader2 title={title} />;
            }}
          </searchForm.Subscribe>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
            {actions.filteredActions.map((action) => {
              return (
                <ActionCard key={action.name} action={action} mode={mode} />
              );
            })}
          </div>
        </div>
      </ThemeContainer>
    </div>
  );
};

export default Actions;
