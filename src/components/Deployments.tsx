import { useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import { ThemeContext } from '../contexts/ThemeContext';
import { LayoutContext } from '../contexts/LayoutContext';
import { Link, useParams } from 'react-router-dom';
import ArrowHeader2 from './ArrowHeader2';
import BtnRect from './buttons/BtnRect';
import InventoryModal from './InventoryModal';
import useCharacterQuery from '../hooks/useCharacterQuery/useCharacterQuery';
import DeploymentsList from './DeploymentsList';
import { Drone } from 'src/types/drone';
import { VehicleWithWeapons } from 'src/types/vehicle';
import WeaponCard from './WeaponCard';
import { WeaponWithKeywords } from 'src/types/weapon';
import useEquipment from 'src/hooks/useEquipment';
import ThemeContainer from './ThemeContainer';
import ItemPicture from './ItemPicture';
import StatBars from './StatBars';
import { VehicleControls } from './VehicleCard';
import { DroneControls } from './DroneCard';
import ArrowHeader1 from './ArrowHeader1';

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
  }>(() => {
    const store = localStorage.getItem('activeDeployment');
    if (store) {
      return JSON.parse(store);
    } else {
      return {
        id: null,
        category: null,
      };
    }
  });

  const {
    data: character,
    isLoading: characterLoading,
    isPending: characterPending,
  } = useCharacterQuery(apiUrl, Number(characterId));

  const { equippedVehicles, equippedDrones } = useEquipment(
    character?.characterInventory,
  );

  const activeItem = useMemo(() => {
    switch (active?.category) {
      case 'vehicle':
        return (
          equippedVehicles?.filter(
            (vehicle: VehicleWithWeapons) => vehicle.id === active.id,
          )[0] || null
        );
      case 'drone':
        return (
          equippedDrones?.filter((drone: Drone) => drone.id === active.id)[0] ||
          null
        );
      default:
        return null;
    }
  }, [active, equippedVehicles, equippedDrones]);

  const cardRef = useRef(null);
  const [cardHeight, setCardHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.offsetHeight);
    }
  }, [activeItem]);

  const toggleActive = (id: number | null, category: string | null) => {
    localStorage.setItem('activeDeployment', JSON.stringify({ id, category }));
    setActive({ id, category });
  };

  const isLoading = characterLoading;
  const isPending = characterPending;

  const namePrefix = character?.firstName + ' ' + character?.lastName + "'s";

  if (isLoading || isPending) return <Loading />;

  if (!character) return <h1>Character not found</h1>;

  return (
    <div className="relative flex w-full max-w-9xl flex-col items-center gap-8">
      <div className="flex items-center gap-4">
        <h1 className="text-center">Deployment</h1>
        {activeItem && <ArrowHeader1 title={activeItem.name} />}
      </div>

      <div className="flex w-full flex-col items-start gap-8">
        <div className="flex w-full flex-col gap-8">
          {activeItem !== null && (
            <div className="flex w-full flex-col justify-between gap-8 lg:flex-row">
              {activeItem.picture?.imageUrl && (
                <ThemeContainer
                  className={`mx-auto mb-auto aspect-square`}
                  style={
                    cardHeight
                      ? {
                          maxWidth: cardHeight,
                        }
                      : undefined
                  }
                  chamfer="medium"
                  borderColor={accentPrimary}
                  overflowHidden={true}
                >
                  <ItemPicture className="clip-6" item={activeItem} />
                </ThemeContainer>
              )}
              <div
                ref={cardRef}
                className={`${cardRef.current?.offsetWidth < 500 ? 'gap-2 px-2' : 'gap-4 px-4'} grid h-full w-full grow grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2`}
              >
                <StatBars
                  cardWidth={cardRef.current?.offsetWidth}
                  stats={{
                    ...activeItem.stats,
                  }}
                />
              </div>
            </div>
          )}
          {activeItem !== null && active.category === 'vehicle' && (
            <VehicleControls
              stats={activeItem.stats}
              vehicleId={activeItem.id}
            />
          )}
          {activeItem !== null && active.category === 'drone' && (
            <DroneControls stats={activeItem.stats} droneId={activeItem.id} />
          )}
          {activeItem !== null && activeItem.weapons?.length > 0 && (
            <div className="flex flex-col gap-8">
              <ArrowHeader2 title="Weapons" />
              <div className="grid grid-cols-2 gap-8">
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
          <div className="flex items-center justify-between">
            <ArrowHeader2 title="Deployed Items" />
            <Link to="inventory">
              <BtnRect ariaLabel="Open inventory" type="button">
                Open Garage
              </BtnRect>
            </Link>
            <InventoryModal
              character={character}
              vehicles={character.characterInventory?.vehicles}
              drones={character.characterInventory?.drones}
              active={active}
              toggleActive={toggleActive}
              modalOpen={modalOpen}
            />
          </div>
          <DeploymentsList
            vehicles={equippedVehicles}
            drones={equippedDrones}
            active={active}
            toggleActive={toggleActive}
          />
        </div>
      </div>
    </div>
  );
};

export default Deployments;
