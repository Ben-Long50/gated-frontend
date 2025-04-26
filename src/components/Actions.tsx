import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import useActions from '../hooks/useActions';
import ActionCard from './ActionCard';
import Loading from './Loading';
import ArrowHeader2 from './ArrowHeader2';
import InputSelectField from './InputSelectField';
import Icon from '@mdi/react';
import { mdiSync } from '@mdi/js';

const Actions = ({ mode }: { mode?: string }) => {
  const { accentPrimary } = useContext(ThemeContext);

  const actions = useActions();

  const searchForm = useForm({
    defaultValues: {
      query: '',
      category: '',
      subCategory: '',
    },
    onSubmit: () => {
      actions.filterByQuery('');
      actions.filterByCategory('');
      actions.filterBySubCategory('');
    },
  });

  if (actions.isLoading || actions.isPending) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8">
      <h1 className="text-center">Actions</h1>
      <ThemeContainer
        className={`ml-auto w-full`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <form className="flex w-full flex-col gap-4 p-4">
          <div className="grid w-full grid-cols-2 items-center justify-between gap-4 sm:grid-cols-3 sm:gap-8">
            <ArrowHeader2 title="Filter Options" />
            <searchForm.Field name="category">
              {(field) => (
                <InputSelectField
                  className="w-full"
                  label="Action Type"
                  options={['', 'action', 'extendedAction', 'reaction']}
                  initialValue=""
                  field={field}
                  onChange={() => {
                    actions.filterByCategory(field.state.value);
                  }}
                />
              )}
            </searchForm.Field>
            <searchForm.Field name="subCategory">
              {(field) => (
                <InputSelectField
                  className="w-full"
                  label="Action Subtype"
                  options={['', 'attack', 'movement', 'upkeep', 'unique']}
                  initialValue=""
                  field={field}
                  onChange={() => {
                    actions.filterBySubCategory(field.state.value);
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
                  label="Search actions"
                  field={field}
                  onChange={() => {
                    actions.filterByQuery(field.state.value);
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
