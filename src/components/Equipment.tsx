import { useContext, useMemo, useRef, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import { LayoutContext } from '../contexts/LayoutContext';
import useWeapons from '../hooks/useWeapons';
import { WeaponWithKeywords } from 'src/types/weapon';
import useArmor from '../hooks/useArmor';
import useCybernetics from '../hooks/useCybernetics';
import { ArmorWithKeywords } from 'src/types/armor';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import { Link, useLocation, useParams } from 'react-router-dom';
import useStats from '../hooks/useStats';
import EvasionIcon from './icons/EvasionIcon';
import ArmorIcon from './icons/ArmorIcon';
import WardIcon from './icons/WardIcon';
import SpeedIcon from './icons/SpeedIcon';
import InjuryIcon from './icons/InjuryIcon';
import InsanityIcon from './icons/InsanityIcon';
import EquipmentList from './EquipmentList';
import ActionCard from './ActionCard';
import { Action } from 'src/types/action';
import DieIcon from './icons/DieIcon';
import WeaponCard, { WeaponCardMobile } from './WeaponCard';
import ArmorCard, { ArmorCardMobile } from './ArmorCard';
import CyberneticCard, { CyberneticCardMobile } from './CyberneticCard';
import { Item } from 'src/types/item';
import useItems from '../hooks/useItems';
import MiscItemCard, { MiscItemCardMobile } from './MiscItemCard';
import ArrowHeader3 from './ArrowHeader3';
import Divider from './Divider';
import ArrowHeader2 from './ArrowHeader2';
import BtnRect from './buttons/BtnRect';
import InventoryModal from './InventoryModal';
import useCharacterQuery from '../hooks/useCharacterQuery/useCharacterQuery';
import StatBars from './StatBars';
import useCharacter from 'src/hooks/useCharacter';

const Equipment = () => {
  const { apiUrl, user } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const { mobile } = useContext(LayoutContext);
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

  const toggleInventory = () => {
    setInventoryOpen((prev) => !prev);
  };

  const toggleActive = (id: number | null, category: string | null) => {
    localStorage.setItem('activeItem', JSON.stringify({ id, category }));
    setActive({ id, category });
  };

  const cardRef = useRef(null);

  const {
    data: character,
    isLoading: characterLoading,
    isPending: characterPending,
  } = useCharacterQuery(apiUrl, Number(characterId));

  const filteredCharacter = useCharacter(character);

  const { stats, rollBonuses } = useStats(
    character?.characterInventory,
    character?.attributes,
    character?.perks,
  );

  const isLoading = characterLoading;
  const isPending = characterPending;

  const activeItem = useMemo(() => {
    switch (active?.category) {
      case 'weapon':
        return (
          filteredCharacter.equipment?.weapons.filter(
            (weapon: WeaponWithKeywords) => weapon.id === active.id,
          )[0] || null
        );
      case 'armor':
        return (
          filteredCharacter.equipment?.armor.filter(
            (armor: ArmorWithKeywords) => armor.id === active.id,
          )[0] || null
        );
      case 'cybernetic':
        return (
          filteredCharacter.equipment?.cybernetics.filter(
            (cybernetic: CyberneticWithKeywords) => cybernetic.id === active.id,
          )[0] || null
        );
      case 'item':
        return (
          filteredCharacter.equipment?.items.filter(
            (item: Item) => item.id === active.id,
          )[0] || null
        );
      default:
        break;
    }
  }, [active, filteredCharacter]);

  const namePrefix =
    filteredCharacter.firstName + ' ' + filteredCharacter.lastName + "'s";

  if (isLoading || isPending) return <Loading />;

  if (!character) return <h1>Character not found</h1>;

  return (
    <div className="relative flex w-full max-w-9xl flex-col items-center gap-8">
      <h1 className="text-center">{namePrefix + ' ' + 'Equipment'}</h1>
      <div className="flex w-full flex-col justify-between gap-8 lg:flex-row">
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
          className={`${cardRef.current?.offsetWidth < 500 ? 'gap-2 px-2' : 'gap-4 px-4'} grid h-full w-full grow grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2`}
        >
          <StatBars
            cardWidth={cardRef.current?.offsetWidth}
            stats={{
              maxHealth: filteredCharacter.stats.maxHealth,
              maxSanity: filteredCharacter.stats.maxSanity,
              currentHealth: filteredCharacter.stats.currentHealth,
              currentSanity: filteredCharacter.stats.currentSanity,
              maxCyber: filteredCharacter.stats.maxCyber,
              cyber: filteredCharacter.stats.cyber,
              weight: filteredCharacter.stats.weight,
              maxWeight: filteredCharacter.stats.maxWeight,
            }}
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-[2fr_1fr] xl:grid-cols-[2.5fr_1fr]">
        <div className="flex w-full flex-col gap-8">
          {activeItem !== null &&
            (active.category === 'weapon' ? (
              mobile ? (
                <WeaponCardMobile
                  key={active.id}
                  weapon={activeItem}
                  mode={mode}
                  ownerId={character?.userId}
                />
              ) : (
                <WeaponCard
                  key={active.id}
                  weapon={activeItem}
                  mode={mode}
                  ownerId={character?.userId}
                />
              )
            ) : active.category === 'armor' ? (
              mobile ? (
                <ArmorCardMobile
                  key={active.id}
                  armor={activeItem}
                  mode={mode}
                  ownerId={character?.userId}
                />
              ) : (
                <ArmorCard
                  key={active.id}
                  armor={activeItem}
                  mode={mode}
                  ownerId={character?.userId}
                />
              )
            ) : active.category === 'cybernetic' ? (
              mobile ? (
                <CyberneticCardMobile
                  key={active.id}
                  cybernetic={activeItem}
                  mode={mode}
                  ownerId={character?.userId}
                />
              ) : (
                <CyberneticCard
                  key={active.id}
                  cybernetic={activeItem}
                  mode={mode}
                  ownerId={character?.userId}
                />
              )
            ) : (
              active.category === 'item' &&
              (mobile ? (
                <MiscItemCardMobile
                  key={active.id}
                  item={activeItem}
                  mode={mode}
                  ownerId={character?.userId}
                />
              ) : (
                <MiscItemCard
                  key={active.id}
                  item={activeItem}
                  mode={mode}
                  ownerId={character?.userId}
                />
              ))
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
                    toggleInventory();
                  }}
                >
                  Open Inventory
                </BtnRect>
                <InventoryModal
                  character={character}
                  equipment={filteredCharacter.equipment}
                  active={active}
                  toggleActive={toggleActive}
                  toggleModal={toggleInventory}
                  modalOpen={inventoryOpen}
                />
              </>
            )}
          </div>
          <EquipmentList
            equipment={filteredCharacter.equipment}
            active={active}
            toggleActive={toggleActive}
          />
        </div>
        <ThemeContainer
          className="mb-auto w-full"
          chamfer="medium"
          borderColor={accentPrimary}
        >
          <div className="flex h-full flex-col gap-4 p-4 pr-6">
            <ArrowHeader3 title="Stats" />
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-4">
                <SpeedIcon className="text-secondary size-8" />
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Speed
                </h3>
              </div>
              <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                {filteredCharacter.stats.speed}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-4">
                <EvasionIcon className="text-secondary size-8" />
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Evasion
                </h3>
              </div>
              <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                {filteredCharacter.stats.evasion}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-4">
                <ArmorIcon className="text-secondary size-8" />
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Armor
                </h3>
              </div>
              <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                {filteredCharacter.stats.armor}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-4">
                <WardIcon className="text-secondary size-8" />
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Ward
                </h3>
              </div>
              <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                {filteredCharacter.stats.ward}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-4">
                <InjuryIcon className="text-secondary size-8" />
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Injuries
                </h3>
              </div>
              <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                {filteredCharacter.stats.injuries}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-4">
                <InsanityIcon className="text-secondary size-8" />
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Insanities
                </h3>
              </div>
              <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                {filteredCharacter.stats.insanities}
              </p>
            </div>
            {Object.keys(rollBonuses).length > 0 && (
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
            )}
            {filteredCharacter.equipment?.actions &&
              filteredCharacter.equipment?.actions.length > 0 && (
                <>
                  <Divider />
                  <ArrowHeader3 title="Unique Actions" />
                  {filteredCharacter.equipment?.actions.map(
                    (action: Action) => (
                      <ActionCard key={action?.id} action={action} />
                    ),
                  )}
                </>
              )}
          </div>
        </ThemeContainer>
      </div>
    </div>
  );
};

export default Equipment;
