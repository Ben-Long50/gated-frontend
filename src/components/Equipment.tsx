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
import useAttributeTree from '../hooks/useAttributeTree';
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
import { mdiCheckCircle } from '@mdi/js';

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
  } = useEquipmentQuery(apiUrl, characterId);

  const isLoading = characterLoading || equipmentLoading;
  const isPending = characterPending || equipmentPending;

  const toggleEquipment = useToggleEquipmentMutation(apiUrl);
  const { stats } = useStats(equipment, character?.attributes);

  console.log(equipment);

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

  const itemObject = {
    weapons: { list: weapons, category: 'weapon' },
    armor: { list: armor, category: 'armor' },
    cybernetics: { list: cybernetics, category: 'cybernetic' },
  };

  const namePrefix = character?.firstName + ' ' + character?.lastName + "'s";

  if (isLoading || isPending) return <Loading />;

  return (
    <div className="flex w-full max-w-6xl flex-col items-center gap-8">
      <h1>{namePrefix + ' ' + 'Equipment'}</h1>
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
          >
            <HealthIcon className="size-8" />
          </StatBar>
          <StatBar
            title="Sanity"
            current={character.stats.currentSanity}
            total={stats.maxSanity}
            color="rgb(96 165 250)"
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
      <div className="flex w-full flex-col gap-8 sm:grid sm:grid-cols-[2fr_1fr]">
        <ThemeContainer
          className="rounded-br-4xl rounded-tl-4xl shadow-lg shadow-slate-950"
          chamfer="24"
          borderColor={accentPrimary}
        >
          <div className="bg-primary flex h-full flex-col gap-4 p-4 clip-6">
            {Object.values(equipment)
              .flat()
              .map((item) => (
                <h2>{item.name}</h2>
              ))}
          </div>
        </ThemeContainer>
        <ThemeContainer
          className="rounded-br-4xl rounded-tl-4xl shadow-lg shadow-slate-950"
          chamfer="24"
          borderColor={accentPrimary}
        >
          <div className="bg-primary flex h-full flex-col gap-4 p-4 pr-6 clip-6">
            <h2 className="pl-4">Stats</h2>
            <div
              className="flex items-center justify-between gap-2"
              key={'speed'}
            >
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
            <div
              className="flex items-center justify-between gap-2"
              key={'evasion'}
            >
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
            <div
              className="flex items-center justify-between gap-2"
              key={'armor'}
            >
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
            <div
              className="flex items-center justify-between gap-2"
              key={'ward'}
            >
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
          </div>
        </ThemeContainer>
      </div>

      <ThemeContainer
        className="w-full rounded-br-4xl rounded-tl-4xl shadow-lg shadow-slate-950"
        chamfer="24"
        borderColor={accentPrimary}
      >
        <div className="bg-primary flex w-full flex-col gap-4 p-4 clip-6">
          {Object.entries(itemObject).map(([key, value], index) => {
            return (
              <>
                <div className="flex w-full flex-col gap-2" key={key}>
                  <h3 className="pl-2">
                    {key[0].toUpperCase() + key.slice(1)}
                  </h3>
                  <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(100px,auto))] gap-2">
                    {value.list.map(
                      (
                        item:
                          | WeaponWithKeywords
                          | ArmorWithKeywords
                          | CyberneticWithKeywords,
                      ) => {
                        let color;
                        switch (item.rarity) {
                          case 'common':
                            color = 'gray-400';
                            break;
                          case 'uncommon':
                            color = 'green-500';
                            break;
                          case 'rare':
                            color = 'red-600';
                            break;
                          case 'blackMarket':
                            color = 'purple-700';
                            break;
                          case 'artifact':
                            color = 'amber-400';
                            break;
                          default:
                            color = 'tertiary';
                            break;
                        }
                        return (
                          <div
                            className={`bg-${color} group relative cursor-pointer overflow-hidden rounded-md pl-1`}
                            key={item.id}
                            onDoubleClick={() => {
                              if (characterId) {
                                toggleEquipment.mutate({
                                  characterId,
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
                {index < Object.keys(itemObject).length - 1 && (
                  <hr className="border border-yellow-300 border-opacity-50" />
                )}
              </>
            );
          })}
        </div>
      </ThemeContainer>
    </div>
  );
};

export default Equipment;
