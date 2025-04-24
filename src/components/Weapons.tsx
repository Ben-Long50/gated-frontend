import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import WeaponCard from './WeaponCard';
import useWeapons from '../hooks/useWeapons';
import SelectField from './SelectField';
import Loading from './Loading';
import { WeaponWithKeywords } from 'src/types/weapon';
import { FetchOptions } from 'src/types/fetchOptions';
import ArrowHeader2 from './ArrowHeader2';
import InputSelectField from './InputSelectField';

const Weapons = ({
  title,
  fetchOptions,
  mode,
}: {
  title: string;
  fetchOptions?: FetchOptions;
  mode: string;
}) => {
  const { accentPrimary } = useContext(ThemeContext);

  const weapons = useWeapons(fetchOptions);

  const searchForm = useForm({
    defaultValues: {
      category: '',
      query: '',
    },
    onSubmit: ({ value }) => {
      weapons.filterByCategory(value.category);
      weapons.filterByQuery(value.query);
    },
  });

  if (
    weapons.isLoading ||
    weapons.isPending ||
    weapons.keywordsLoading ||
    weapons.keywordsPending
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
        <form className="flex flex-col gap-4 p-4">
          <div className="grid w-full grid-cols-2 items-center justify-between">
            <ArrowHeader2 title="Filter Options" />
            <searchForm.Field name="category">
              {(field) => (
                <InputSelectField
                  field={field}
                  className=""
                  label="Keyword"
                  options={weapons.filteredKeywords}
                  onChange={() => {
                    weapons.filterByCategory(field.state.value);
                  }}
                ></InputSelectField>
              )}
            </searchForm.Field>
          </div>
          <div className="flex items-end gap-4">
            <searchForm.Field name="query">
              {(field) => (
                <InputField
                  className="w-full"
                  label="Search weapons"
                  field={field}
                  onChange={() => {
                    searchForm.handleSubmit();
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
      {weapons.filteredWeapons.map((weapon: WeaponWithKeywords) => {
        return <WeaponCard key={weapon.id} weapon={weapon} mode={mode} />;
      })}
    </div>
  );
};

export default Weapons;
