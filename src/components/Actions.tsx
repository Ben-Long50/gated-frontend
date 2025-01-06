import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import { LayoutContext } from '../contexts/LayoutContext';
import useActions from '../hooks/useActions';
import ActionCard from './ActionCard';

const Actions = () => {
  const { accentPrimary } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);

  const actions = useActions();

  const searchForm = useForm({
    defaultValues: {
      query: '',
    },
    onSubmit: ({ value }) => {
      actions.filterByQuery(value.query);
    },
  });

  if (actions.isLoading || actions.isPending) {
    return <span></span>;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-3">
      <h1 className="text-center lg:mb-5">Actions</h1>
      <ThemeContainer
        chamfer={`${layoutSize === 'small' || layoutSize === 'xsmall' ? '24' : '32'}`}
        className="w-full"
        borderColor={accentPrimary}
      >
        <div
          className={`bg-primary flex w-full flex-col gap-4 px-3 py-4 ${layoutSize === 'small' || layoutSize === 'xsmall' ? 'clip-6' : 'clip-8'} sm:gap-6 sm:p-6 lg:gap-8 lg:p-8`}
        >
          <form>
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
          {Object.entries(actions.filteredActions).map(([type, actionList]) => {
            return (
              actionList.length > 0 && (
                <div
                  className="flex flex-col gap-4 md:grid md:grid-cols-2"
                  key={type}
                >
                  <h1 className="col-span-2 pl-6 sm:mb-4">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </h1>
                  {actionList.map((action) => {
                    return <ActionCard key={action.name} action={action} />;
                  })}
                </div>
              )
            );
          })}
        </div>
      </ThemeContainer>
    </div>
  );
};

export default Actions;
