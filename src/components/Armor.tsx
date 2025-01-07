import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import useArmor from '../hooks/useArmor';
import ArmorCard from './ArmorCard';
import SelectField from './SelectField';
import Loading from './Loading';

const Armor = () => {
  const { accentPrimary } = useContext(ThemeContext);

  const armor = useArmor();

  const searchForm = useForm({
    defaultValues: {
      category: '',
      query: '',
    },
    onSubmit: ({ value }) => {
      armor.filterByQuery(value.query);
    },
  });

  if (armor.isLoading || armor.isPending) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8">
      <h1 className="text-center">Armor</h1>
      <ThemeContainer
        className={`ml-auto w-full rounded-br-5xl rounded-tl-5xl shadow-lg shadow-zinc-950`}
        chamfer="24"
        borderColor={accentPrimary}
      >
        <form className="bg-primary flex w-full flex-col gap-4 p-4 clip-6">
          <div className="flex w-full items-center justify-between pl-4">
            <h3 className="">Filter options</h3>
            <searchForm.Field name="category">
              {(field) => (
                <SelectField
                  field={field}
                  onChange={() => {
                    armor.filterByCategory(field.state.value);
                  }}
                >
                  <option value="">All armor</option>
                  <option value="Armor">Basic armor</option>
                  <option value="Power">Power armor</option>
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
      {armor.filteredArmor.map((armor) => {
        return <ArmorCard key={armor.name} armor={armor} />;
      })}
    </div>
  );
};

export default Armor;
