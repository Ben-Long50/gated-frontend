import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import { LayoutContext } from '../contexts/LayoutContext';
import Loading from './Loading';
import { Modification } from 'src/types/vehicle';
import ModCard from './ModCard';
import useModifications from '../hooks/useModifications';

const VehicleMods = () => {
  const { accentPrimary } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);

  const modifications = useModifications();
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
      <h1 className="text-center lg:mb-5">Vehicle Modifications</h1>
      <ThemeContainer
        chamfer={`${layoutSize === 'small' || layoutSize === 'xsmall' ? '24' : '32'}`}
        className="w-full rounded-br-5xl rounded-tl-5xl shadow-xl shadow-slate-950"
        borderColor={accentPrimary}
      >
        <div
          className={`bg-primary flex w-full flex-col gap-4 px-3 py-4 ${layoutSize === 'small' || layoutSize === 'xsmall' ? 'clip-6' : 'clip-8'} sm:gap-6 sm:p-6 lg:gap-8 lg:p-8`}
        >
          <form>
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
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
            {modifications.filteredMods.map((modification: Modification) => {
              return (
                <ModCard key={modification.id} modification={modification} />
              );
            })}
          </div>
        </div>
      </ThemeContainer>
    </div>
  );
};

export default VehicleMods;
