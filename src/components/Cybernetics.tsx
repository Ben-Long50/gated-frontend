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
import ArrowHeader2 from './ArrowHeader1';

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
    onSubmit: ({ value }) => {
      cybernetics.filterByQuery(value.query);
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
                    cybernetics.filterByCategory(field.state.value);
                  }}
                >
                  <option value="">All augments</option>
                  <option value="stat">Stat augments</option>
                  <option value="roll">Roll augments</option>
                  <option value="offensive">Offensive augments</option>
                  <option value="defensive">Defensive augments</option>
                  <option value="function">Function augments</option>
                </SelectField>
              )}
            </searchForm.Field>
          </div>
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
