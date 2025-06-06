import { useContext, useMemo, useRef, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import { useLocation, useParams } from 'react-router-dom';
import EvasionIcon from './icons/EvasionIcon';
import ArmorIcon from './icons/ArmorIcon';
import WardIcon from './icons/WardIcon';
import SpeedIcon from './icons/SpeedIcon';
import InjuryIcon from './icons/InjuryIcon';
import InsanityIcon from './icons/InsanityIcon';
import EquipmentList from './EquipmentList';
import ActionCard from './ActionCard';
import { Action } from 'src/types/action';
import { Item } from 'src/types/item';
import ArrowHeader3 from './ArrowHeader3';
import Divider from './Divider';
import ArrowHeader2 from './ArrowHeader2';
import BtnRect from './buttons/BtnRect';
import InventoryModal from './InventoryModal';
import useCharacterQuery from '../hooks/useCharacterQuery/useCharacterQuery';
import useCharacter from 'src/hooks/useCharacter';
import ItemCard from './ItemCard';
import ItemCardMobile from './ItemCardMobile';
import EquipmentIcon from './icons/EquipmentIcon';
import CharacterIcon from './icons/CharacterIcon';
import useItemStats from 'src/hooks/useItemStats';
import CharacterStatBars from './CharacterStatBars';

const Equipment = () => {
  const { apiUrl, user } = useContext(AuthContext);
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
    const store = localStorage.getItem('activeItem');
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
    localStorage.setItem('activeItem', JSON.stringify({ id, category }));
    setActive({ id, category });
  };

  const cardRef = useRef(null);
  const activeRef = useRef(null);

  const {
    data: character,
    isLoading: characterLoading,
    isPending: characterPending,
  } = useCharacterQuery(apiUrl, Number(characterId));

  const {
    filteredCharacter,
    isLoading: inventoryLoading,
    isPending: inventoryPending,
  } = useCharacter(character);

  // const { powerLevel } = useItemStats(
  //   filteredCharacter?.equipment
  //     ? Object.values(filteredCharacter?.equipment).flatMap((value) => value)
  //     : null,
  // );

  const powerLevel = 0;

  const isLoading = characterLoading || inventoryLoading;
  const isPending = characterPending || inventoryPending;

  const activeItem = useMemo(() => {
    switch (active?.category) {
      case 'weapon':
        return (
          filteredCharacter.equipment?.weapons.filter(
            (weapon: Item) => weapon.id === active.id,
          )[0] || null
        );
      case 'armors':
        return (
          filteredCharacter.equipment?.armors.filter(
            (armor: Item) => armor.id === active.id,
          )[0] || null
        );
      case 'augmentations':
        return (
          filteredCharacter.equipment?.augmentations.filter(
            (cybernetic: Item) => cybernetic.id === active.id,
          )[0] || null
        );
      case 'item':
        return (
          filteredCharacter.equipment?.items.filter(
            (item: Item) => item.id === active.id,
          )[0] || null
        );
      default:
        return;
    }
  }, [active, filteredCharacter]);

  const namePrefix =
    filteredCharacter.firstName + ' ' + filteredCharacter.lastName + "'s";

  if (isLoading || isPending) return <Loading />;

  if (!character) return <h1>Character not found</h1>;

  return (
    <div className="relative flex w-full max-w-9xl flex-col items-center gap-8">
      <h1 className="text-center">{namePrefix + ' ' + 'Equipment'}</h1>
      <div className="flex w-full flex-col gap-8 sm:flex-row">
        {filteredCharacter.picture.imageUrl && (
          <ThemeContainer
            className="size mx-auto mb-auto aspect-square w-full max-w-60"
            chamfer="medium"
            borderColor={accentPrimary}
            overflowHidden={true}
          >
            <img
              className="clip-6"
              src={filteredCharacter.picture.imageUrl}
              alt="Preview"
            />
          </ThemeContainer>
        )}
        <div
          ref={cardRef}
          className={`${cardRef.current?.offsetWidth < 500 ? 'gap-2 px-2' : 'gap-4 px-4'} col-span-1 grid h-full w-full grow grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2`}
        >
          <CharacterStatBars
            cardWidth={cardRef.current?.offsetWidth}
            stats={{
              maxHealth: filteredCharacter.stats.maxHealth,
              maxSanity: filteredCharacter.stats.maxSanity,
              currentHealth: filteredCharacter.stats.currentHealth,
              currentSanity: filteredCharacter.stats.currentSanity,
              maxCyber: filteredCharacter.stats.maxCyber,
              cyber: filteredCharacter.stats.cyber,
              weight: filteredCharacter.stats.weight,
              maxEquip: filteredCharacter.stats.maxEquip,
            }}
            characterId={character.id}
          />
        </div>
      </div>
      <div className="flex w-full flex-col justify-start gap-8 lg:flex-row">
        <div ref={activeRef} className="col-span-2 flex w-full flex-col gap-8">
          {activeItem &&
            (activeRef.current?.offsetWidth < 500 ? (
              <ItemCardMobile
                key={active.id}
                item={activeItem}
                mode={mode}
                ownerId={character?.userId}
              />
            ) : (
              <ItemCard
                key={active.id}
                item={activeItem}
                mode={mode}
                ownerId={character?.userId}
              />
            ))}
          <div className="flex items-center justify-between">
            <ArrowHeader2 title="Equipped Items" />
            {character.userId === user?.id && (
              <>
                <BtnRect
                  ariaLabel="Open inventory"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleInventoryOpen();
                  }}
                >
                  Open Inventory
                </BtnRect>
                <InventoryModal
                  character={character}
                  inventory={filteredCharacter?.inventory}
                  active={active}
                  toggleActive={toggleActive}
                  toggleModal={toggleInventoryOpen}
                  modalOpen={inventoryOpen}
                />
              </>
            )}
          </div>
          <ThemeContainer
            chamfer="medium"
            borderColor={accentPrimary}
            overflowHidden={true}
          >
            <div className="bg-primary p-4">
              <EquipmentList
                equipment={filteredCharacter?.equipment}
                active={active}
                toggleActive={toggleActive}
              />
            </div>
          </ThemeContainer>
        </div>
        <ThemeContainer
          className="row-span-2 mb-auto min-w-[350px] max-w-[450px]"
          chamfer="medium"
          borderColor={accentPrimary}
        >
          <div className="flex h-full flex-col gap-4 p-4 pr-6">
            <ArrowHeader3 title="Stats" />
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-4">
                <EquipmentIcon className="text-secondary size-8 shrink-0" />
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Power Level
                </h3>
              </div>
              <p className="text-secondary min-w-6 text-center text-xl sm:pt-1 sm:text-2xl">
                {powerLevel}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-4">
                <CharacterIcon className="text-secondary size-8 shrink-0" />
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Character Level
                </h3>
              </div>
              <p className="text-secondary min-w-6 text-center text-xl sm:pt-1 sm:text-2xl">
                {filteredCharacter.level}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-4">
                <SpeedIcon className="text-secondary size-8 shrink-0" />
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Speed
                </h3>
              </div>
              <p className="text-secondary min-w-6 text-center text-xl sm:pt-1 sm:text-2xl">
                {filteredCharacter.stats.speed}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-4">
                <ArmorIcon className="text-secondary size-8 shrink-0" />
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Armor
                </h3>
              </div>
              <p className="text-secondary min-w-6 text-center text-xl sm:pt-1 sm:text-2xl">
                {filteredCharacter.stats.armor}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-4">
                <WardIcon className="text-secondary size-8 shrink-0" />
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Ward
                </h3>
              </div>
              <p className="text-secondary min-w-6 text-center text-xl sm:pt-1 sm:text-2xl">
                {filteredCharacter.stats.ward}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-4">
                <EvasionIcon className="text-secondary size-8 shrink-0" />
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Evasion
                </h3>
              </div>
              <p className="text-secondary min-w-6 text-center text-xl sm:pt-1 sm:text-2xl">
                {filteredCharacter.stats.evasion}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-4">
                <InjuryIcon className="text-secondary size-8 shrink-0" />
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Injuries
                </h3>
              </div>
              <p className="text-secondary min-w-6 text-center text-xl sm:pt-1 sm:text-2xl">
                {filteredCharacter.stats.injuries || 0}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-4">
                <InsanityIcon className="text-secondary size-8 shrink-0" />
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Insanities
                </h3>
              </div>
              <p className="text-secondary min-w-6 text-center text-xl sm:pt-1 sm:text-2xl">
                {filteredCharacter.stats.insanities || 0}
              </p>
            </div>
            {/* {Object.keys(rollBonuses).length > 0 && (
              <>
                <Divider />
                <ArrowHeader3 title="Roll Bonuses" />
                {Object.entries(rollBonuses).map(
                  ([action, bonus]: [string, number], index: number) => (
                    <div
                      className="flex items-center justify-between gap-4"
                      key={index}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: bonus }).map((_, index) => (
                            <DieIcon
                              key={index}
                              className="text-secondary size-8 shrink-0"
                            />
                          ))}
                        </div>
                        <h4>{action}</h4>
                      </div>
                    </div>
                  ),
                )}
              </>
            )} */}
            {filteredCharacter?.actions &&
              filteredCharacter?.actions.length > 0 && (
                <>
                  <Divider />
                  <ArrowHeader3 title="Unique Actions" />
                  {filteredCharacter?.actions.map((action: Action) => (
                    <ActionCard key={action?.id} action={action} />
                  ))}
                </>
              )}
          </div>
        </ThemeContainer>
      </div>
    </div>
  );
};

export default Equipment;
