import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import useArmor from '../hooks/useArmor';
import ArmorCard from './ArmorCard';
import SelectField from './SelectField';
import Loading from './Loading';
import { FetchOptions } from 'src/types/fetchOptions';
import { ArmorWithKeywords } from 'src/types/armor';
import ArrowHeader2 from './ArrowHeader1';

const Armor = ({
  title,
  fetchOptions,
  mode,
}: {
  title: string;
  fetchOptions?: FetchOptions;
  mode: string;
}) => {
  const { accentPrimary } = useContext(ThemeContext);

  const armor = useArmor(fetchOptions);

  const searchForm = useForm({
    defaultValues: {
      category: '',
      query: '',
    },
    onSubmit: ({ value }) => {
      armor.filterByQuery(value.query);
    },
  });

  if (
    armor.isLoading ||
    armor.isPending ||
    armor.keywordsLoading ||
    armor.keywordsPending
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
                    armor.filterByCategory(field.state.value);
                  }}
                >
                  <option value="">All keywords</option>
                  {armor.filteredKeywords?.map((keyword) => {
                    return (
                      <option key={keyword} value={keyword}>
                        {keyword}
                      </option>
                    );
                  })}
                </SelectField>
              )}
            </searchForm.Field>
          </div>
          <searchForm.Field name="query">
            {(field) => (
              <InputField
                label="Search armor"
                field={field}
                onChange={() => {
                  searchForm.handleSubmit();
                }}
              />
            )}
          </searchForm.Field>
        </form>
      </ThemeContainer>
      {armor.filteredArmor.map((armor: ArmorWithKeywords) => {
        return <ArmorCard key={armor.id} armor={armor} mode={mode} />;
      })}
    </div>
  );
};

export default Armor;
