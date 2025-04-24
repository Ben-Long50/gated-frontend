import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import WeaponCard from './WeaponCard';
import Loading from './Loading';
import { WeaponWithKeywords } from 'src/types/weapon';
import useWeapons from '../hooks/useWeapons';

const VehicleWeapons = () => {
  const { accentPrimary } = useContext(ThemeContext);

  const weapons = useWeapons({ includedKeywords: ['Vehicle'] });

  const searchForm = useForm({
    defaultValues: {
      query: '',
    },
    onSubmit: ({ value }) => {
      weapons.filterByQuery(value.query);
    },
  });

  if (weapons.isLoading || weapons.isPending) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8">
      <h1 className="text-center">Vehicle Weapons</h1>
      <ThemeContainer
        className={`ml-auto w-full`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <form className="flex w-full flex-col gap-4 p-4">
          <div className="flex w-full items-center justify-between pl-4">
            <h3 className="">Filter options</h3>
          </div>
          <searchForm.Field name="query">
            {(field) => (
              <InputField
                label="Search vehicle weapons"
                field={field}
                onChange={() => {
                  searchForm.handleSubmit();
                }}
              />
            )}
          </searchForm.Field>
        </form>
      </ThemeContainer>
      {weapons.filteredWeapons?.map((weapon: WeaponWithKeywords) => {
        return <WeaponCard key={weapon.name} weapon={weapon} />;
      })}
    </div>
  );
};

export default VehicleWeapons;
