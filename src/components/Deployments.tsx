import { useContext, useMemo, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import ArrowHeader2 from './ArrowHeader2';
import BtnRect from './buttons/BtnRect';
import DeploymentsList from './DeploymentsList';
import ArrowHeader1 from './ArrowHeader1';
import useCharacter from 'src/hooks/useCharacter';
import { Item } from 'src/types/item';
import ItemCard from './ItemCard';
import { LayoutContext } from 'src/contexts/LayoutContext';
import { DroneControls, VehicleControls } from './ItemCardControls';
import useModalStore from 'src/stores/modalStore';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from 'src/contexts/ThemeContext';

const Deployments = () => {
  const { user } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const { mobile } = useContext(LayoutContext);
  const { characterId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const parts = location.pathname.split('/');
  const mode = parts[parts.length - 1];

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

  const setBackgroundPath = useModalStore((state) => state.setBackgroundPath);

  const openInventoryModal = () => {
    setBackgroundPath(location.pathname);
    navigate('inventory');
  };

  const toggleActive = (id: number | null, category: string | null) => {
    localStorage.setItem('activeDeployment', JSON.stringify({ id, category }));
    setActive({ id, category });
  };

  const {
    filteredCharacter: character,
    isLoading,
    isPending,
  } = useCharacter(Number(characterId));

  const activeItem = useMemo(() => {
    switch (active?.category) {
      case 'vehicle':
        return (
          character?.equipment?.vehicles.filter(
            (vehicle: Item) => vehicle.id === active.id,
          )[0] || null
        );
      case 'drone':
        return (
          character?.equipment?.drones.filter(
            (drone: Item) => drone.id === active.id,
          )[0] || null
        );
      default:
        return null;
    }
  }, [active, character]);

  const weapons = useMemo(() => {
    return (
      character?.equipment?.weapons.filter((weapon: Item) =>
        activeItem?.itemLinkReference?.items.some(
          (item: Item) => item.id === weapon.id,
        ),
      ) || []
    );
  }, [activeItem, character]);

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
            <ItemCard
              cardType={mobile ? 'small' : 'large'}
              ownerId={character.userId}
              item={activeItem}
            />
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
              <div className="grid gap-8 xl:grid-cols-2">
                {weapons?.map((weapon: Item) => (
                  <ItemCard
                    key={weapon.id}
                    cardType={mobile ? 'small' : 'large'}
                    item={weapon}
                    mode={mode}
                    ownerId={character?.userId}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center justify-between">
            <ArrowHeader2 title="Deployed Items" />

            {character.userId === user?.id && (
              <>
                <BtnRect
                  ariaLabel="Open inventory"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    openInventoryModal();
                  }}
                >
                  Open Garage
                </BtnRect>
                {parts.includes('inventory') && (
                  <Outlet context={{ activeItem, toggleActive }} />
                )}
              </>
            )}
          </div>
          <ThemeContainer borderColor={accentPrimary} chamfer="medium">
            <div className="p-4">
              <DeploymentsList
                equipment={character.equipment}
                active={active}
                toggleActive={toggleActive}
              />
            </div>
          </ThemeContainer>
        </div>
      </div>
    </div>
  );
};

export default Deployments;
