import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import CyberneticCard from './CyberneticCard';
import useCybernetics from '../hooks/useCybernetics';
import SelectField from './SelectField';
import Loading from './Loading';
import { FetchOptions } from 'src/types/fetchOptions';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import ArrowHeader2 from './ArrowHeader2';
import InputSelectField from './InputSelectField';

const Cybernetics = ({
  title,
  fetchOptions,
  mode,
}: {
  title: string;
  fetchOptions?: FetchOptions;
  mode: string;
}) => {
  const { accentPrimary } = useContext(ThemeContext);

  const cybernetics = useCybernetics(fetchOptions);

  const searchForm = useForm({
    defaultValues: {
      category: '',
      query: '',
    },
    onSubmit: () => {
      cybernetics.filterByQuery('');
      cybernetics.filterByCategory('');
    },
  });

  if (
    cybernetics.isLoading ||
    cybernetics.isPending ||
    cybernetics.keywordsLoading ||
    cybernetics.keywordsPending
  ) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8">
      <h1 className="text-center">{title}</h1>
      <ThemeContainer
        className={`ml-auto w-full`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <form className="flex w-full flex-col gap-4 p-4">
          <div className="grid w-full grid-cols-2">
            <ArrowHeader2 title="Filter Options" />
            <searchForm.Field name="category">
              {(field) => (
                <InputSelectField
                  field={field}
                  options={[
                    '',
                    'stat',
                    'roll',
                    'offensive',
                    'defensive',
                    'function',
                  ]}
                  initialValue=""
                  label="Augment Type"
                  onChange={() => {
                    cybernetics.filterByCategory(field.state.value);
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
                  label="Search cybernetics"
                  field={field}
                  onChange={() => {
                    cybernetics.filterByQuery(field.state.value);
                  }}
                />
              )}
            </searchForm.Field>
            <button
              className="text-accent z-10 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                searchForm.reset();
                searchForm.handleSubmit();
              }}
            >
              Reset Filters
            </button>
          </div>
        </form>
      </ThemeContainer>
      {cybernetics.filteredCybernetics.map(
        (cybernetic: CyberneticWithKeywords) => {
          return (
            <CyberneticCard
              key={cybernetic.id}
              cybernetic={cybernetic}
              mode={mode}
            />
          );
        },
      )}
    </div>
  );
};

export default Cybernetics;
