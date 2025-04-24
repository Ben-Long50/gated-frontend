import { useContext, useMemo, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import StatBar from './StatBar';
import HealthIcon from './icons/HealthIcon';
import SanityIcon from './icons/SanityIcon';
import CyberIcon from './icons/CyberIcon';
import EquipIcon from './icons/EquipIcon';
import { LayoutContext } from '../contexts/LayoutContext';
import useWeapons from '../hooks/useWeapons';
import { WeaponWithKeywords } from 'src/types/weapon';
import useArmor from '../hooks/useArmor';
import useCybernetics from '../hooks/useCybernetics';
import { ArmorWithKeywords } from 'src/types/armor';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import { useParams } from 'react-router-dom';
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
import useCurrentHealthMutation from '../hooks/useCurrentHealthMutation/useCurrentHealthMutation';
import useCurrentSanityMutation from '../hooks/useCurrentSanityMutation/useCurrentSanityMutation';
import WeaponCard from './WeaponCard';
import ArmorCard from './ArmorCard';
import CyberneticCard from './CyberneticCard';
import useEquipment from '../hooks/useEquipment';
import { Item } from 'src/types/item';
import useItems from '../hooks/useItems';
import MiscItemCard from './MiscItemCard';
import ArrowHeader3 from './ArrowHeader3';
import Divider from './Divider';
import ArrowHeader2 from './ArrowHeader2';
import BtnRect from './buttons/BtnRect';
import InventoryModal from './InventoryModal';
import useCharacterQuery from '../hooks/useCharacterQuery/useCharacterQuery';

const Equipment = ({ mode }: { mode?: string }) => {
  const { apiUrl, user } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);
  const { characterId } = useParams();

  const [active, setActive] = useState<{
    id: null | number;
    category: null | string;
  }>({ id: null, category: null });
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  const {
    data: character,
    isLoading: characterLoading,
    isPending: characterPending,
  } = useCharacterQuery(apiUrl, characterId);

  const editCurrentHealth = useCurrentHealthMutation(
    apiUrl,
    Number(characterId),
  );

  const editCurrentSanity = useCurrentSanityMutation(
    apiUrl,
    Number(characterId),
  );

  const handleCurrentHealth = (value: number) => {
    if (character?.stats.currentHealth <= 0) return;
    editCurrentHealth.mutate(value);
  };

  const handleCurrentSanity = (value: number) => {
    editCurrentSanity.mutate(value);
  };

  const { filteredWeapons: weapons } = useWeapons({
    itemList: character?.characterInventory?.weapons,
    excludedKeywords: ['Vehicle', 'Cybernetic'],
  });
  const { filteredArmor: armor } = useArmor({
    itemList: character?.characterInventory?.armor,
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
        return equippedWeapons.filter(
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
          className={` ${layoutSize !== 'xsmall' && layoutSize !== 'small' ? 'stat-bar-layout' : 'stat-bar-layout-sm'} w-full items-center gap-4`}
        >
          <StatBar
            title="Health"
            current={character.stats.currentHealth}
            total={stats.maxHealth}
            color="rgb(248 113 113)"
            mode="adjustable"
            mutation={
              character?.userId === user?.id
                ? (value: number) => handleCurrentHealth(value)
                : undefined
            }
          >
            <HealthIcon className="size-8" />
          </StatBar>
          <StatBar
            title="Sanity"
            current={character.stats.currentSanity}
            total={stats.maxSanity}
            color="rgb(96 165 250)"
            mode="adjustable"
            mutation={
              character?.userId === user?.id
                ? (value: number) => handleCurrentSanity(value)
                : undefined
            }
          >
            <SanityIcon className="size-8" />
          </StatBar>
          <StatBar
            title="Cyber"
            current={stats.cyber}
            total={stats.maxCyber}
            color="rgb(52 211 153)"
          >
            <CyberIcon className="size-8" />
          </StatBar>
          <StatBar
            title="Equip"
            current={stats.weight}
            total={stats.maxWeight}
            color="rgb(251 191 36)"
          >
            <EquipIcon className="size-8" />
          </StatBar>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-[2fr_1fr] xl:grid-cols-[2.5fr_1fr]">
        <div className="flex w-full flex-col gap-8">
          {active.id !== null &&
            (active.category === 'weapon' ? (
              <WeaponCard
                key={active.id}
                weapon={activeItem}
                mode="equipment"
              />
            ) : active.category === 'armor' ? (
              <ArmorCard key={active.id} armor={activeItem} mode="equipment" />
            ) : active.category === 'cybernetic' ? (
              <CyberneticCard
                key={active.id}
                cybernetic={activeItem}
                mode="equipment"
              />
            ) : (
              active.category === 'item' && (
                <MiscItemCard
                  key={active.id}
                  item={activeItem}
                  mode="equipment"
                />
              )
            ))}
          <div className="flex items-center justify-between">
            <ArrowHeader2 title="Equipped Items" />
            <BtnRect
              onClick={toggleModal}
              ariaLabel="Open inventory"
              type="button"
            >
              Open Inventory
            </BtnRect>
            <InventoryModal
              character={character}
              weapons={weapons}
              armor={armor}
              cybernetics={cybernetics}
              items={items}
              modalOpen={modalOpen}
              toggleModal={toggleModal}
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
            toggleModal={toggleModal}
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
                <SpeedIcon className="size-8" />
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
                <EvasionIcon className="size-8" />
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
                <ArmorIcon className="size-8" />
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
                            <DieIcon key={index} className="size-8 shrink-0" />
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
