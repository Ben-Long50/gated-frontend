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
import Icon from '@mdi/react';
import { mdiCircle, mdiCircleOutline, mdiClose } from '@mdi/js';
import InjuryIcon from './icons/InjuryIcon';
import InsanityIcon from './icons/InsanityIcon';
import EquipmentList from './EquipmentList';
import ActionCard from './ActionCard';
import { Action } from 'src/types/action';
import DieIcon from './icons/DieIcon';
import WeaponCard, { WeaponCardMobile } from './WeaponCard';
import ArmorCard, { ArmorCardMobile } from './ArmorCard';
import CyberneticCard, { CyberneticCardMobile } from './CyberneticCard';
import useEquipment from '../hooks/useEquipment';
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

const Equipment = () => {
  const { apiUrl, user } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const { mobile } = useContext(LayoutContext);
  const { characterId } = useParams();
  const location = useLocation();
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

  const { filteredWeapons: weapons } = useWeapons({
    itemList: character?.characterInventory?.weapons,
    excludedKeywords: ['Vehicle Weapon', 'CyberWeapon'],
  });
  const { filteredArmor: armor } = useArmor({
    itemList: character?.characterInventory?.armor,
    excludedKeywords: ['Cyber Armor'],
  });
  const { filteredCybernetics: cybernetics } = useCybernetics({
    itemList: character?.characterInventory?.cybernetics,
  });
  const { filteredItems: items } = useItems({
    itemList: character?.characterInventory?.items,
  });

  const { equippedWeapons, equippedArmor, equippedCybernetics, equippedItems } =
    useEquipment(character?.characterInventory);

  const {
    stats,
    rollBonuses,
    isLoading: statsLoading,
    isPending: statsPending,
  } = useStats(
    character?.characterInventory,
    character?.attributes,
    character?.perks,
  );

  const isLoading = characterLoading || statsLoading;
  const isPending = characterPending || statsPending;

  const activeItem = useMemo(() => {
    switch (active?.category) {
      case 'weapon':
        return equippedWeapons?.filter(
          (weapon: WeaponWithKeywords) => weapon.id === active.id,
        )[0];
      case 'armor':
        return equippedArmor.filter(
          (armor: ArmorWithKeywords) => armor.id === active.id,
        )[0];
      case 'cybernetic':
        return equippedCybernetics.filter(
          (cybernetic: CyberneticWithKeywords) => cybernetic.id === active.id,
        )[0];
      case 'item':
        return equippedItems.filter((item: Item) => item.id === active.id)[0];
      default:
        break;
    }
  }, [
    active,
    equippedWeapons,
    equippedArmor,
    equippedCybernetics,
    equippedItems,
  ]);

  const actionList =
    [
      ...equippedWeapons,
      ...equippedArmor,
      ...equippedCybernetics,
      ...equippedItems,
    ]
      ?.map((cybernetic: CyberneticWithKeywords) => cybernetic.actions)
      .flat() || [];

  const namePrefix = character?.firstName + ' ' + character?.lastName + "'s";

  if (isLoading || isPending) return <Loading />;

  return (
    <div className="relative flex w-full max-w-9xl flex-col items-center gap-8">
      <h1 className="text-center">{namePrefix + ' ' + 'Equipment'}</h1>
      <div className="flex w-full flex-col justify-between gap-8 lg:flex-row">
        {character.picture.imageUrl && (
          <ThemeContainer
            className="size mx-auto mb-auto aspect-square w-full max-w-60"
            chamfer="medium"
            borderColor={accentPrimary}
          >
            <img
              className="clip-6"
              src={character.picture.imageUrl}
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
              ...character.stats,
              maxCyber: stats.maxCyber,
              cyber: stats.cyber,
              weight: stats.weight,
              maxWeight: stats.maxWeight,
              maxHealth: stats.maxHealth,
              maxSanity: stats.maxSanity,
            }}
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-[2fr_1fr] xl:grid-cols-[2.5fr_1fr]">
        <div className="flex w-full flex-col gap-8">
          {active.id !== null &&
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
            <Link to="inventory">
              <BtnRect ariaLabel="Open inventory" type="button">
                Open Inventory
              </BtnRect>
            </Link>
            <InventoryModal
              character={character}
              weapons={weapons}
              armor={armor}
              cybernetics={cybernetics}
              items={items}
              active={active}
              setActive={setActive}
              modalOpen={modalOpen}
            />
          </div>
          <EquipmentList
            weapons={equippedWeapons}
            armor={equippedArmor}
            cybernetics={equippedCybernetics}
            items={equippedItems}
            active={active}
            setActive={setActive}
            modalOpen={modalOpen}
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
                {stats.speed}
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
                {stats.evasion}
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
                {stats.armor}
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
                {stats.ward}
              </p>
            </div>
            <div className="flex justify-between gap-2 sm:flex-col sm:items-start">
              <div className="flex items-center justify-center gap-4">
                <InjuryIcon className="text-secondary size-8" />
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Injuries
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-1 sm:pl-12">
                {Array.from({ length: stats.permanentInjuries }).map(
                  (_, index) => (
                    <div className="relative" key={index}>
                      <Icon
                        key={index}
                        className="text-gray-400"
                        path={
                          index < character.stats.injuries
                            ? mdiCircleOutline
                            : mdiCircle
                        }
                        size={0.75}
                      />
                      {index < character.stats.injuries && (
                        <Icon
                          path={mdiClose}
                          className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 text-red-600"
                          size={1}
                        />
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="flex justify-between gap-2 sm:flex-col sm:items-start">
              <div className="flex items-center justify-center gap-4">
                <InsanityIcon className="text-secondary size-8" />
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Insanities
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-1 sm:pl-12">
                {Array.from({ length: stats.permanentInsanities }).map(
                  (_, index) => (
                    <div className="relative" key={index}>
                      <Icon
                        key={index}
                        className="text-gray-400"
                        path={
                          index < character.stats.insanities
                            ? mdiCircleOutline
                            : mdiCircle
                        }
                        size={0.75}
                      />
                      {index < character.stats.insanities && (
                        <Icon
                          path={mdiClose}
                          className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 text-red-600"
                          size={1}
                        />
                      )}
                    </div>
                  ),
                )}
              </div>
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
            {actionList.length > 0 && (
              <>
                <Divider />
                <ArrowHeader3 title="Unique Actions" />
                {actionList.map((action: Action) => (
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
