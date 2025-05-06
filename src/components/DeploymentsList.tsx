import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import ItemMenu from './ItemMenu';
import { VehicleWithWeapons } from 'src/types/vehicle';
import { Drone } from 'src/types/drone';

const DeploymentsList = ({
  vehicles,
  drones,
  active,
  setActive,
}: {
  vehicles: VehicleWithWeapons[];
  drones: Drone[];
  active: {
    id: null | number;
    category: null | string;
  };
  setActive: (item: { id: null | number; category: null | string }) => void;
}) => {
  const { rarityColorMap } = useContext(ThemeContext);

  return (
    <div className="flex w-full flex-col gap-8">
      <ItemMenu vehicles={vehicles} drones={drones}>
        {(item, index, { tab }) =>
          item.equipped === true && (
            <div
              key={index}
              className="flex flex-col rounded-br-4xl rounded-tl-4xl shadow-md shadow-black"
            >
              <div className="bg-secondary relative flex w-full items-start gap-3 pr-4 clip-4 sm:gap-6">
                <button
                  className="group relative h-24 w-28 shrink-0 overflow-hidden pl-1 lg:h-28 lg:w-32"
                  style={{ backgroundColor: rarityColorMap[item.rarity] }}
                  onClick={() =>
                    setActive({
                      id: item.id,
                      category: tab,
                    })
                  }
                >
                  {item.picture?.imageUrl ? (
                    <img
                      src={item.picture?.imageUrl}
                      alt={item.name}
                      className="group-hover:opacity-80"
                    />
                  ) : (
                    <div className="bg-tertiary h-full w-full p-1 group-hover:opacity-80">
                      <p className="my-auto break-words text-center text-base">
                        {item.name}
                      </p>
                    </div>
                  )}
                </button>
                <div className="flex h-full w-full flex-col items-start justify-evenly gap-2 overflow-hidden">
                  <h3 className="line-clamp-2 text-ellipsis">{item.name}</h3>
                  {active?.id === item?.id ? (
                    <button
                      className="text-error text-lg hover:underline"
                      onClick={() => setActive({ id: null, category: null })}
                    >
                      Disarm
                    </button>
                  ) : (
                    <button
                      className="text-accent text-lg hover:underline"
                      onClick={() =>
                        setActive({
                          id: item.id,
                          category: tab,
                        })
                      }
                    >
                      Activate
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        }
      </ItemMenu>
    </div>
  );
};

export default DeploymentsList;
