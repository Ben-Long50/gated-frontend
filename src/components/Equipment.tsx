import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
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
import useEquipmentQuery from '../hooks/useEquipmentQuery/useEquipmentQuery';
import useToggleEquipmentMutation from '../hooks/useEquipmentToggleMutation/useEquipmentToggleMutation';
import useStats from '../hooks/useStats';
import EvasionIcon from './icons/EvasionIcon';
import ArmorIcon from './icons/ArmorIcon';
import WardIcon from './icons/WardIcon';
import SpeedIcon from './icons/SpeedIcon';
import Icon from '@mdi/react';
import { mdiCheckCircle, mdiCircle, mdiCircleOutline, mdiClose } from '@mdi/js';
import InjuryIcon from './icons/InjuryIcon';
import InsanityIcon from './icons/InsanityIcon';
import clsx from 'clsx';
import EquipmentList from './EquipmentList';
import ActionCard from './ActionCard';
import { Action } from 'src/types/action';
import DieIcon from './icons/DieIcon';
import useCurrentHealthMutation from '../hooks/useCurrentHealthMutation/useCurrentHealthMutation';
import useCurrentSanityMutation from '../hooks/useCurrentSanityMutation/useCurrentSanityMutation';

const Equipment = ({ type }: { type?: string }) => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);
  const { characterId } = useParams();

  const {
    data: character,
    isLoading: characterLoading,
    isPending: characterPending,
  } = useActiveCharacterQuery(apiUrl);

  const {
    data: equipment,
    isLoading: equipmentLoading,
    isPending: equipmentPending,
  } = useEquipmentQuery(
    apiUrl,
    character?.id,
    character?.characterInventory?.id,
  );

  const toggleEquipment = useToggleEquipmentMutation(apiUrl);

  const editCurrentHealth = useCurrentHealthMutation(apiUrl, character?.id);

  const editCurrentSanity = useCurrentSanityMutation(apiUrl, character?.id);

  const {
    stats,
    rollBonuses,
    isLoading: statsLoading,
    isPending: statsPending,
  } = useStats(equipment, character?.attributes, character?.perks);

  const handleCurrentHealth = (value) => {
    if (
      !editCurrentHealth.isPending &&
      character?.stats.currentHealth + value <= stats.maxHealth
    ) {
      editCurrentHealth.mutate(value);
    }
  };

  const handleCurrentSanity = (value) => {
    if (
      !editCurrentSanity.isPending &&
      character?.stats.currentSanity + value <= stats.maxSanity
    ) {
      editCurrentSanity.mutate(value);
    }
  };

  const isLoading = characterLoading || equipmentLoading || statsLoading;
  const isPending = characterPending || equipmentPending || statsPending;

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

  const { filteredWeapons: equippedWeapons } = useWeapons({
    itemList: equipment?.weapons,
  });
  const { filteredArmor: equippedArmor } = useArmor({
    itemList: equipment?.armor,
  });
  const { filteredCybernetics: equippedCybernetics } = useCybernetics({
    itemList: equipment?.cybernetics,
  });

  const actionList =
    equippedCybernetics
      ?.map((cybernetic: CyberneticWithKeywords) => cybernetic.actions)
      .flat() || [];

  const itemObject = {
    weapons: { list: weapons, category: 'weapon' },
    armor: { list: armor, category: 'armor' },
    cybernetics: { list: cybernetics, category: 'cybernetic' },
  };

  const namePrefix = character?.firstName + ' ' + character?.lastName + "'s";

  if (isLoading || isPending) return <Loading />;

  return (
    <div className="max-w-9xl relative flex w-full flex-col items-center gap-8">
      <h1 className="text-center">{namePrefix + ' ' + 'Equipment'}</h1>
      <div className="flex w-full flex-col justify-between gap-8 sm:flex-row">
        {character.picture.imageUrl && (
          <ThemeContainer
            className="size mx-auto aspect-square w-full max-w-60 rounded-br-4xl rounded-tl-4xl shadow-lg shadow-slate-950"
            chamfer="24"
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
          className={` ${layoutSize !== 'xsmall' && layoutSize !== 'small' ? 'stat-bar-layout' : 'stat-bar-layout-sm'} w-full gap-4`}
        >
          <StatBar
            title="Health"
            current={character.stats.currentHealth}
            total={stats.maxHealth}
            color="rgb(248 113 113)"
            mode="adjustable"
            mutation={(value) => handleCurrentHealth(value)}
          >
            <HealthIcon className="size-8" />
          </StatBar>
          <StatBar
            title="Sanity"
            current={character.stats.currentSanity}
            total={stats.maxSanity}
            color="rgb(96 165 250)"
            mode="adjustable"
            mutation={(value) => handleCurrentSanity(value)}
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
      <div className="flex w-full flex-col items-start gap-8 sm:grid sm:grid-cols-[3fr_1fr]">
        <EquipmentList
          weapons={equippedWeapons}
          armor={equippedArmor}
          cybernetics={equippedCybernetics}
        />

        <ThemeContainer
          className="mb-auto rounded-br-4xl rounded-tl-4xl shadow-lg shadow-slate-950"
          chamfer="24"
          borderColor={accentPrimary}
        >
          <div className="bg-primary flex h-full flex-col gap-4 p-4 pr-6 clip-6">
            <h3 className="pl-4">Stats</h3>
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
                <hr className="border border-yellow-300 border-opacity-50" />
                <h3 className="pl-4">Roll Bonuses</h3>
                {Object.entries(rollBonuses).map(
                  ([action, bonus]: [string, number], index: number) => (
                    <div
                      className="flex items-center justify-between gap-4"
                      key={index}
                    >
                      <div className="flex items-center gap-4">
                        <DieIcon className="text-secondary size-8" />
                        <h4>{action}</h4>
                      </div>
                      <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                        {bonus}
                      </p>
                    </div>
                  ),
                )}
              </>
            )}
            {actionList.length > 0 && (
              <>
                <hr className="border border-yellow-300 border-opacity-50" />
                <h3 className="pl-4">Unique Actions</h3>
                {actionList.map((action: Action) => (
                  <ActionCard key={action.id} action={action} />
                ))}
              </>
            )}
          </div>
        </ThemeContainer>
      </div>

      <ThemeContainer
        className="w-full rounded-br-4xl rounded-tl-4xl shadow-lg shadow-slate-950"
        chamfer="24"
        borderColor={accentPrimary}
      >
        <div className="bg-primary flex w-full flex-col gap-8 p-4 clip-6">
          <div className="flex items-center gap-4">
            <h2 className="pl-4">Inventory</h2>
            <p className="text-tertiary italic">(Double click to equip)</p>
          </div>
          {Object.entries(itemObject).map(([key, value], index) => {
            return (
              <ThemeContainer
                key={key}
                chamfer="16"
                borderColor={accentPrimary}
              >
                <p className="text-accent absolute -top-3 left-5 z-20 text-base">
                  {key[0].toUpperCase() + key.slice(1)}
                </p>
                <div className="bg-primary flex w-full flex-col gap-2 p-4 pt-6 clip-4">
                  <div className="grid w-full grid-cols-[repeat(auto-fill,120px)] gap-2">
                    {value.list.map(
                      (
                        item:
                          | WeaponWithKeywords
                          | ArmorWithKeywords
                          | CyberneticWithKeywords,
                      ) => {
                        const rarityColors = {
                          common: 'bg-gray-400',
                          uncommon: 'bg-green-500',
                          rare: 'bg-red-600',
                          blackMarket: 'bg-purple-700',
                          artifact: 'bg-amber-400',
                        };

                        return (
                          <div
                            className={clsx(
                              rarityColors[item.rarity] || 'bg-tertiary',
                              'group relative cursor-pointer select-none overflow-hidden rounded-md pl-1',
                            )}
                            key={item.id}
                            onDoubleClick={() => {
                              if (characterId) {
                                toggleEquipment.mutate({
                                  characterId: character?.id,
                                  inventoryId: character?.characterInventory.id,
                                  category: value.category,
                                  itemId: item.id,
                                });
                              }
                            }}
                          >
                            {item.equipped === true && (
                              <div className="absolute inset-0 flex items-center justify-center bg-slate-950 bg-opacity-65">
                                <Icon
                                  className="text-tertiary group-hover:text-secondary"
                                  path={mdiCheckCircle}
                                  size={3}
                                />
                              </div>
                            )}
                            {item.picture?.imageUrl ? (
                              <img
                                className="hover:opacity-80"
                                src={item.picture?.imageUrl}
                                alt={item.name}
                              />
                            ) : (
                              <div className="bg-tertiary h-full w-full p-1 hover:opacity-80">
                                <p className="my-auto break-words text-center text-base">
                                  {item.name}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              </ThemeContainer>
            );
          })}
        </div>
      </ThemeContainer>
    </div>
  );
};

export default Equipment;
