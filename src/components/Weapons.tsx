import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import WeaponCard from './WeaponCard';
import useWeapons from '../hooks/useWeapons';
import SelectField from './SelectField';

const Weapons = () => {
  const { accentPrimary } = useContext(ThemeContext);

  const weapons = useWeapons();

  const searchForm = useForm({
    defaultValues: {
      category: '',
      query: '',
    },
    onSubmit: ({ value }) => {
      weapons.filterByQuery(value.query);
    },
  });

  if (weapons.isLoading || weapons.isPending) {
    return <span></span>;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8">
      <h1 className="text-center">Weapons</h1>
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
                    weapons.filterByCategory(field.state.value);
                  }}
                >
                  <option value="">All weapons</option>
                  <option value="1H">1H weapons</option>
                  <option value="2H">2H weapons</option>
                  <option value="Pistol">Pistols</option>
                  <option value="Shotgun">Shotguns</option>
                  <option value="SMG">SMGs</option>
                  <option value="Rifle">Rifles</option>
                  <option value="HW">HWs</option>
                  <option value="Launcher">Launchers</option>
                  <option value="Cybernetic">Cybernetics</option>
                </SelectField>
              )}
            </searchForm.Field>
          </div>
          <searchForm.Field name="query">
            {(field) => (
              <InputField
                label="Search weapons"
                field={field}
                onChange={() => {
                  searchForm.handleSubmit();
                }}
              />
            )}
          </searchForm.Field>
        </form>
      </ThemeContainer>
      {weapons.filteredWeapons.map((weapon) => {
        return <WeaponCard key={weapon.name} weapon={weapon} />;
      })}
    </div>
  );
};

export default Weapons;
