import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import Loading from './Loading';
import useVehicles from '../hooks/useVehicles';
import VehicleCard from './VehicleCard';
import { VehicleWithWeapons } from '../types/vehicle';
import { FetchOptions } from 'src/types/fetchOptions';
import ArrowHeader2 from './ArrowHeader2';

const Vehicles = ({
  title,
  fetchOptions,
  mode,
}: {
  title: string;
  fetchOptions?: FetchOptions;
  mode: string;
}) => {
  const { accentPrimary } = useContext(ThemeContext);

  const vehicles = useVehicles(fetchOptions);

  const searchForm = useForm({
    defaultValues: {
      query: '',
    },
    onSubmit: ({ value }) => {
      vehicles.filterByQuery(value.query);
    },
  });

  if (vehicles.isLoading || vehicles.isPending) {
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
          </div>
          <searchForm.Field name="query">
            {(field) => (
              <InputField
                label="Search vehicles"
                field={field}
                onChange={() => {
                  searchForm.handleSubmit();
                }}
              />
            )}
          </searchForm.Field>
        </form>
      </ThemeContainer>
      {vehicles.filteredVehicles.map((vehicle: VehicleWithWeapons) => {
        return <VehicleCard key={vehicle.id} vehicle={vehicle} mode={mode} />;
      })}
    </div>
  );
};

export default Vehicles;
