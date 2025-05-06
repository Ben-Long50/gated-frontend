import { useContext, useMemo, useRef, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import { ThemeContext } from '../contexts/ThemeContext';
import { LayoutContext } from '../contexts/LayoutContext';
import { Link, useParams } from 'react-router-dom';
import ArrowHeader2 from './ArrowHeader2';
import BtnRect from './buttons/BtnRect';
import InventoryModal from './InventoryModal';
import useCharacterQuery from '../hooks/useCharacterQuery/useCharacterQuery';
import useVehicles from 'src/hooks/useVehicles';
import useDrones from 'src/hooks/useDrones';
import DeploymentsList from './DeploymentsList';
import DroneCard, { DroneCardMobile } from './DroneCard';
import VehicleCard, { VehicleCardMobile } from './VehicleCard';
import { Drone } from 'src/types/drone';
import { VehicleWithWeapons } from 'src/types/vehicle';
import WeaponCard from './WeaponCard';
import { WeaponWithKeywords } from 'src/types/weapon';

const Deployments = () => {
  const { apiUrl, user } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const { mobile } = useContext(LayoutContext);
  const { characterId } = useParams();
  const modalOpen = location.pathname.endsWith('inventory');
  const path = location.pathname.split('/');
  const mode = path[path.length - 1];

  const [active, setActive] = useState<{
    id: null | number;
    category: null | string;
  }>({ id: null, category: null });

  const cardRef = useRef(null);

  const {
    data: character,
    isLoading: characterLoading,
    isPending: characterPending,
  } = useCharacterQuery(apiUrl, Number(characterId));

  const { filteredVehicles: vehicles } = useVehicles({
    itemList: character?.characterInventory?.vehicles,
  });
  const { filteredDrones: drones } = useDrones({
    itemList: character?.characterInventory?.drones,
  });

  const equippedVehicles = vehicles.filter(
    (vehicle: VehicleWithWeapons) => vehicle.equipped === true,
  );
  const equippedDrones = drones.filter(
    (drone: Drone) => drone.equipped === true,
  );

  const isLoading = characterLoading;
  const isPending = characterPending;

  const activeItem = useMemo(() => {
    switch (active?.category) {
      case 'vehicle':
        return equippedVehicles.filter(
          (vehicle: VehicleWithWeapons) => vehicle.id === active.id,
        )[0];
      case 'drone':
        return equippedDrones.filter(
          (drone: Drone) => drone.id === active.id,
        )[0];
      default:
        break;
    }
  }, [active, equippedVehicles, equippedDrones]);

  const namePrefix = character?.firstName + ' ' + character?.lastName + "'s";

  if (isLoading || isPending) return <Loading />;

  return (
    <div className="relative flex w-full max-w-9xl flex-col items-center gap-8">
      <h1 className="text-center">{namePrefix + ' ' + 'Deployments'}</h1>
      <div className="flex w-full flex-col items-start gap-8">
        <div className="flex w-full flex-col gap-8">
          {active.id !== null &&
            (active.category === 'drone' ? (
              mobile ? (
                <DroneCardMobile
                  key={active.id}
                  drone={activeItem}
                  mode={mode}
                  ownerId={character?.userId}
                />
              ) : (
                <DroneCard
                  key={active.id}
                  drone={activeItem}
                  mode={mode}
                  ownerId={character?.userId}
                />
              )
            ) : (
              active.category === 'vehicle' &&
              (mobile ? (
                <VehicleCardMobile
                  key={active.id}
                  vehicle={activeItem}
                  mode={mode}
                  ownerId={character?.userId}
                />
              ) : (
                <VehicleCard
                  key={active.id}
                  vehicle={activeItem}
                  mode={mode}
                  ownerId={character?.userId}
                />
              ))
            ))}

          <div className="grid grid-cols-[1fr_2fr] gap-8">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <ArrowHeader2 title="Deployable Items" />
                <Link to="inventory">
                  <BtnRect ariaLabel="Open inventory" type="button">
                    Open Garage
                  </BtnRect>
                </Link>
                <InventoryModal
                  character={character}
                  vehicles={vehicles}
                  drones={drones}
                  active={active}
                  setActive={setActive}
                  modalOpen={modalOpen}
                />
              </div>
              <DeploymentsList
                vehicles={vehicles}
                drones={drones}
                active={active}
                setActive={setActive}
              />
            </div>

            {activeItem && (
              <div className="flex flex-col gap-8">
                <ArrowHeader2 title="Weapons" />
                <div className="flex flex-row gap-8">
                  {activeItem.weapons?.map((weapon: WeaponWithKeywords) => (
                    <WeaponCard
                      key={weapon.id}
                      weapon={weapon}
                      ownerId={character?.userId}
                      mode={mode}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* <ThemeContainer
          className="mb-auto w-full"
          chamfer="medium"
          borderColor={accentPrimary}
        >
          {actionList.length > 0 && (
            <>
              <Divider />
              <ArrowHeader3 title="Unique Actions" />
              {actionList.map((action: Action) => (
                <ActionCard key={action?.id} action={action} />
              ))}
            </>
          )}
        </ThemeContainer> */}
      </div>
    </div>
  );
};

export default Deployments;
