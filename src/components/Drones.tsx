import { useContext, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import Loading from './Loading';
import { FetchOptions } from 'src/types/fetchOptions';
import ArrowHeader2 from './ArrowHeader2';
import { LayoutContext } from '../contexts/LayoutContext';
import Icon from '@mdi/react';
import { mdiCropSquare, mdiGrid, mdiSync } from '@mdi/js';
import useDrones from '../hooks/useDrones';
import { Drone } from 'src/types/drone';
import DroneCard, { DroneCardMobile } from './DroneCard';

const Drones = ({
  title,
  fetchOptions,
  mode,
}: {
  title: string;
  fetchOptions?: FetchOptions;
  mode: string;
}) => {
  const { mobile } = useContext(LayoutContext);
  const { accentPrimary } = useContext(ThemeContext);

  const [cardType, setCardType] = useState<'small' | 'large'>(() =>
    mobile ? 'small' : 'large',
  );

  const drones = useDrones(fetchOptions);

  const searchForm = useForm({
    defaultValues: {
      query: '',
    },
    onSubmit: ({ value }) => {
      drones.filterByQuery(value.query);
    },
  });

  if (drones.isLoading || drones.isPending) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8">
      <h1 className="text-center">{title}</h1>
      <ThemeContainer
        className={`ml-auto w-full`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <form className="flex w-full flex-col gap-4 p-4">
          <div className="flex w-full items-center justify-between">
            <ArrowHeader2 title="Filter Options" />
          </div>
          <div className="flex w-full items-center gap-4">
            <searchForm.Field name="query">
              {(field) => (
                <InputField
                  className="w-full"
                  label="Search Drones"
                  field={field}
                  onChange={() => {
                    searchForm.handleSubmit();
                  }}
                />
              )}
            </searchForm.Field>
            {!mobile && (
              <>
                <button
                  className="text-accent bg-tertiary group z-10 grid size-12 shrink-0 place-items-center rounded-md p-0.5 shadow-md shadow-black hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setCardType('large');
                  }}
                >
                  <Icon
                    path={mdiCropSquare}
                    className={`${cardType === 'large' && 'text-accent'} text-secondary group-hover:text-accent timing`}
                  />
                </button>
                <button
                  className="text-accent bg-tertiary group z-10 grid size-12 shrink-0 place-items-center rounded-md p-2 shadow-md shadow-black hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setCardType('small');
                  }}
                >
                  <Icon
                    path={mdiGrid}
                    className={`${cardType === 'small' && 'text-accent'} text-secondary group-hover:text-accent timing`}
                  />
                </button>
              </>
            )}
            <button
              className="text-accent bg-tertiary group z-10 grid size-12 shrink-0 place-items-center rounded-md p-1.5 shadow-md shadow-black hover:underline"
              onClick={(e) => {
                e.preventDefault();
                searchForm.reset();
                searchForm.handleSubmit();
              }}
            >
              <Icon
                path={mdiSync}
                className="text-secondary group-hover:text-accent timing"
              />
            </button>
          </div>
        </form>
      </ThemeContainer>

      {cardType === 'large' ? (
        drones.filteredDrones.map((drone: Drone) => {
          return <DroneCard key={drone.id} drone={drone} mode={mode} />;
        })
      ) : (
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
          {drones.filteredDrones.map((drone: Drone) => {
            return <DroneCardMobile key={drone.id} drone={drone} mode={mode} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Drones;
