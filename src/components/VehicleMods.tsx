import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import Loading from './Loading';
import { Modification } from 'src/types/vehicle';
import ModCard from './ModCard';
import useModifications from '../hooks/useModifications';
import { FetchOptions } from 'src/types/fetchOptions';

const VehicleMods = ({
  title,
  fetchOptions,
  mode,
}: {
  title: string;
  fetchOptions?: FetchOptions;
  mode: string;
}) => {
  const { accentPrimary } = useContext(ThemeContext);

  const modifications = useModifications(fetchOptions);

  const searchForm = useForm({
    defaultValues: {
      query: '',
    },
    onSubmit: ({ value }) => {
      if (value.query === '') {
        modifications.resetList();
      } else {
        modifications.filterByQuery(value.query);
      }
    },
  });

  if (modifications.isLoading || modifications.isPending) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-3">
      <h1 className="text-center lg:mb-5">{title}</h1>
      <ThemeContainer
        chamfer="24"
        className="w-full rounded-br-5xl rounded-tl-5xl shadow-xl shadow-slate-950"
        borderColor={accentPrimary}
      >
        <div className="bg-primary flex w-full flex-col gap-4 p-4 clip-6 sm:gap-6 lg:gap-8">
          <form className="flex w-full flex-col gap-4">
            <div className="flex w-full items-center justify-between pl-4">
              <h3 className="">Filter options</h3>
            </div>
            <searchForm.Field name="query">
              {(field) => (
                <InputField
                  label="Search modifications"
                  field={field}
                  onChange={() => {
                    searchForm.handleSubmit();
                  }}
                />
              )}
            </searchForm.Field>
          </form>
          {modifications.filteredMods?.length > 0 && (
            <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
              {modifications.filteredMods.map((modification: Modification) => {
                return (
                  <ModCard
                    key={modification.id}
                    modification={modification}
                    mode={mode}
                  />
                );
              })}
            </div>
          )}
        </div>
      </ThemeContainer>
    </div>
  );
};

export default VehicleMods;
