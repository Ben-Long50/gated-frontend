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
import Icon from '@mdi/react';
import { mdiTriangleDown } from '@mdi/js';
import ArrowHeader2 from './ArrowHeader2';

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
    <div className="flex w-full max-w-5xl flex-col items-center gap-8">
      <h1 className="text-center">{title}</h1>
      <ThemeContainer
        className={`ml-auto w-full`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <form className="flex w-full flex-col gap-4 p-4">
          <div className="grid w-full grid-cols-2 items-center justify-between gap-4 sm:grid-cols-3 sm:gap-8">
            <h3 className="pl-4">Filter options</h3>
          </div>
          <searchForm.Field name="query">
            {(field) => (
              <InputField
                label="Search items"
                field={field}
                onChange={() => {
                  searchForm.handleSubmit();
                }}
              />
            )}
          </searchForm.Field>
        </form>
      </ThemeContainer>
      {modifications.filteredMods?.length > 0 && (
        <ThemeContainer
          chamfer="medium"
          className="w-full"
          borderColor={accentPrimary}
        >
          <div className="flex w-full flex-col gap-8 p-4 sm:p-8">
            <ArrowHeader2 title="Modifications" />
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
          </div>
        </ThemeContainer>
      )}
    </div>
  );
};

export default VehicleMods;
