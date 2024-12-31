import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import { LayoutContext } from '../contexts/LayoutContext';
import CyberneticCard from './CyberneticCard';
import useCybernetics from '../hooks/useCybernetics';

const Cybernetics = () => {
  const { accentPrimary } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);

  const cybernetics = useCybernetics();

  const searchForm = useForm({
    defaultValues: {
      query: '',
    },
    onSubmit: ({ value }) => {
      if (value.query === '') {
        cybernetics.resetList();
      } else {
        cybernetics.filterByQuery(value.query);
      }
    },
  });

  if (cybernetics.isLoading || cybernetics.isPending) {
    return <span></span>;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-3">
      <h1 className="text-center lg:mb-5">Cybernetics</h1>
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
                  label="Search cybernetics"
                  field={field}
                  onChange={() => {
                    searchForm.handleSubmit();
                  }}
                />
              )}
            </searchForm.Field>
          </form>
          {cybernetics.filteredCybernetics.map((cybernetic) => {
            return (
              <CyberneticCard key={cybernetic.name} cybernetic={cybernetic} />
            );
          })}
        </div>
      </ThemeContainer>
    </div>
  );
};

export default Cybernetics;
