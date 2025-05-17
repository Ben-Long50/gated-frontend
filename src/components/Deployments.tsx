import { useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import { ThemeContext } from '../contexts/ThemeContext';
import { useLocation, useParams } from 'react-router-dom';
import ArrowHeader2 from './ArrowHeader2';
import BtnRect from './buttons/BtnRect';
import InventoryModal from './InventoryModal';
import useCharacterQuery from '../hooks/useCharacterQuery/useCharacterQuery';
import DeploymentsList from './DeploymentsList';
import ThemeContainer from './ThemeContainer';
import ItemPicture from './ItemPicture';
import StatBars from './StatBars';
import ArrowHeader1 from './ArrowHeader1';
import useCharacter from 'src/hooks/useCharacter';
import { Item } from 'src/types/item';
import ItemCard from './ItemCard';
import ItemCardMobile from './ItemCardMobile';
import { LayoutContext } from 'src/contexts/LayoutContext';
import { DroneControls, VehicleControls } from './ItemCardControls';

const Deployments = () => {
  const { apiUrl, user } = useContext(AuthContext);
  const { mobile } = useContext(LayoutContext);
  const { accentPrimary } = useContext(ThemeContext);
  const { characterId } = useParams();
  const location = useLocation();
  const [inventoryOpen, setInventoryOpen] = useState(false);
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

  const toggleInventoryOpen = () => {
    setInventoryOpen((prev) => !prev);
  };

  const toggleActive = (id: number | null, category: string | null) => {
    localStorage.setItem('activeDeployment', JSON.stringify({ id, category }));
    setActive({ id, category });
  };

  const {
    data: character,
    isLoading,
    isPending,
  } = useCharacterQuery(apiUrl, Number(characterId));

  const filteredCharacter = useCharacter(character);

  const activeItem = useMemo(() => {
    switch (active?.category) {
      case 'vehicle':
        return (
          filteredCharacter?.equipment?.vehicles.filter(
            (vehicle: Item) => vehicle.id === active.id,
          )[0] || null
        );
      case 'drone':
        return (
          filteredCharacter?.equipment?.drones.filter(
            (drone: Item) => drone.id === active.id,
          )[0] || null
        );
      default:
        return null;
    }
  }, [active, filteredCharacter]);

  const weapons = useMemo(() => {
    return (
      filteredCharacter?.equipment?.weapons.filter((weapon: Item) =>
        activeItem?.itemLinkReference?.items.some(
          (item: Item) => item.id === weapon.id,
        ),
      ) || []
    );
  }, [activeItem, filteredCharacter]);

  const cardRef = useRef(null);
  const [cardHeight, setCardHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.offsetHeight);
    }
  }, [activeItem]);

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
            <div className="grid grid-rows-[auto_auto] justify-between gap-8 lg:grid-cols-[auto_1fr]">
              {activeItem.picture?.imageUrl && (
                <ThemeContainer
                  className={`mx-auto mb-auto aspect-square min-w-[300px]`}
                  style={
                    cardHeight
                      ? {
                          width: cardHeight,
                        }
                      : undefined
                  }
                  chamfer="medium"
                  borderColor={accentPrimary}
                  overflowHidden={true}
                >
                  <ItemPicture
                    key={activeItem.id}
                    className="w-full clip-6"
                    item={activeItem}
                  />
                </ThemeContainer>
              )}
              <div
                ref={cardRef}
                className={`${cardRef.current?.offsetWidth < 500 ? 'gap-2 px-2' : 'gap-4 px-4'} col-start-2 grid h-full w-full grow grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2`}
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
              <div className="grid gap-8 xl:grid-cols-2">
                {weapons?.map((weapon: Item) =>
                  mobile ? (
                    <ItemCardMobile
                      key={weapon.id}
                      item={weapon}
                      mode={mode}
                      ownerId={character?.userId}
                    />
                  ) : (
                    <ItemCard
                      key={weapon.id}
                      item={weapon}
                      mode={mode}
                      ownerId={character?.userId}
                    />
                  ),
                )}
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
                  onClick={() => toggleInventoryOpen()}
                >
                  Open Garage
                </BtnRect>
                <InventoryModal
                  character={character}
                  inventory={filteredCharacter.inventory}
                  active={active}
                  toggleModal={toggleInventoryOpen}
                  toggleActive={toggleActive}
                  modalOpen={inventoryOpen}
                />
              </>
            )}
          </div>
          <DeploymentsList
            equipment={filteredCharacter.equipment}
            active={active}
            toggleActive={toggleActive}
          />
        </div>
      </div>
    </div>
  );
};

export default Deployments;
