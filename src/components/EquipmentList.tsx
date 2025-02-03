import { Keyword } from 'src/types/keyword';
import DamageIcon from './icons/DamageIcon';
import EquipIcon from './icons/EquipIcon';
import FlurryIcon from './icons/FlurryIcon';
import MagCapacityIcon from './icons/MagCapacityIcon';
import RangeIcon from './icons/RangeIcon';
import SalvoIcon from './icons/SalvoIcon';
import StatCard from './StatCard';
import Tag from './Tag';
import { WeaponWithKeywords } from 'src/types/weapon';
import { ArmorWithKeywords } from 'src/types/armor';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import BlockIcon from './icons/BlockIcon';
import WardIcon from './icons/WardIcon';
import ArmorIcon from './icons/ArmorIcon';
import CyberIcon from './icons/CyberIcon';
import LightningIcon from './icons/LightningIcon';
import EquipmentModal from './EquipmentModal';

const EquipmentList = ({
  weapons,
  armor,
  cybernetics,
}: {
  weapons: WeaponWithKeywords[];
  armor: ArmorWithKeywords[];
  cybernetics: CyberneticWithKeywords[];
}) => {
  const [modalOpen, setModalOpen] = useState(0);
  const [toolTip, setToolTip] = useState('');

  const toggleModal = () => {
    setModalOpen(0);
  };

  useEffect(() => {
    if (toolTip) {
      document.addEventListener('click', () => setToolTip(''));
    } else {
      document.removeEventListener('click', () => setToolTip(''));
    }

    return () => {
      document.removeEventListener('click', () => setToolTip(''));
    };
  }, [toolTip]);

  const itemList = [weapons, armor, cybernetics].flatMap((group, i) =>
    group.map((item) => ({
      category: ['weapon', 'armor', 'cybernetic'][i],
      item,
    })),
  );

  return (
    <div className="flex flex-col gap-8">
      <h2>Equipped Items</h2>
      <div className="scrollbar-secondary-2 relative grid grid-cols-1 gap-4 sm:max-h-none sm:grid-cols-2 sm:overflow-y-visible">
        {itemList.map((item, index) => {
          const rarityColors = {
            common: 'bg-gray-400',
            uncommon: 'bg-green-500',
            rare: 'bg-red-600',
            blackMarket: 'bg-purple-700',
            artifact: 'bg-amber-400',
          };
          return (
            item.item.equipped === true && (
              <>
                <EquipmentModal
                  index={index}
                  item={item.item}
                  category={item.category}
                  modalOpen={modalOpen}
                  toggleModal={toggleModal}
                />
                <div
                  key={index}
                  className="bg-secondary relative flex items-start gap-4 rounded-br-md rounded-tr-md pr-4 shadow-md shadow-zinc-950 sm:gap-6"
                >
                  <button
                    className={clsx(
                      rarityColors[item.item.rarity] || 'bg-tertiary',
                      'group relative h-28 w-32 shrink-0 overflow-hidden rounded-bl-md rounded-tl-md pl-1',
                    )}
                    onClick={() => {
                      setModalOpen(item.item.id);
                    }}
                  >
                    {item.item.picture?.imageUrl ? (
                      <img
                        src={item.item.picture?.imageUrl}
                        alt={item.item.name}
                        className="group-hover:opacity-80"
                      />
                    ) : (
                      <div className="bg-tertiary h-full w-full p-1 group-hover:opacity-80">
                        <p className="my-auto break-words text-center text-base">
                          {item.item.name}
                        </p>
                      </div>
                    )}
                  </button>
                  <div className="relative flex h-full w-full flex-col justify-evenly gap-2 overflow-hidden">
                    <h3 className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.item.name}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {item.item?.keywords && item.item.keywords.length > 0 && (
                        <div className="flex w-full flex-wrap items-center gap-1 justify-self-start">
                          {item.item.keywords.map(
                            (keywordInfo: {
                              keyword: Keyword;
                              value?: number;
                            }) => {
                              return (
                                <Tag
                                  key={keywordInfo.keyword.id + item.item.id}
                                  label={
                                    keywordInfo.value
                                      ? keywordInfo.keyword.name +
                                        ' ' +
                                        keywordInfo.value
                                      : keywordInfo.keyword.name
                                  }
                                  description={keywordInfo.keyword.description}
                                  toolTip={toolTip}
                                  setToolTip={setToolTip}
                                />
                              );
                            },
                          )}
                        </div>
                      )}
                      {/* <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,max-content))] gap-2">
                    {item.category === 'weapon' && (
                      <>
                        {item.item.stats.damage && (
                          <StatCard stat={item.item.stats.damage}>
                            <DamageIcon className="size-6" />
                          </StatCard>
                        )}
                        {item.item.stats.salvo && (
                          <StatCard stat={item.item.stats.salvo}>
                            <SalvoIcon className="size-6" />
                          </StatCard>
                        )}
                        {item.item.stats.flurry && (
                          <StatCard stat={item.item.stats.flurry}>
                            <FlurryIcon className="size-6" />
                          </StatCard>
                        )}
                        {item.item.stats.range && (
                          <StatCard stat={item.item.stats.range}>
                            <RangeIcon className="size-6" />
                          </StatCard>
                        )}
                        {item.item.stats.weight && (
                          <StatCard stat={item.item.stats.weight}>
                            <EquipIcon className="size-6" />
                          </StatCard>
                        )}
                        {item.item.stats.magCapacity && (
                          <StatCard
                            stat={
                              item.item.stats.magCapacity +
                              ' / ' +
                              (item.item.stats.magCount
                                ? item.item.stats.magCapacity *
                                  (item.item.stats.magCount - 1)
                                : 'X')
                            }
                          >
                            <MagCapacityIcon className="size-6" />
                          </StatCard>
                        )}
                      </>
                    )}
                    {item.category === 'armor' && (
                      <>
                        {item.item.stats.armor && (
                          <StatCard stat={item.item.stats.armor}>
                            <ArmorIcon className="size-6" />
                          </StatCard>
                        )}
                        {item.item.stats.ward && (
                          <StatCard stat={item.item.stats.ward}>
                            <WardIcon className="size-6" />
                          </StatCard>
                        )}
                        {item.item.stats.block && (
                          <StatCard
                            stat={
                              item.item.stats.currentBlock +
                              ' / ' +
                              item.item.stats.block
                            }
                          >
                            <BlockIcon className="size-6" />
                          </StatCard>
                        )}
                        {item.item.stats.power && (
                          <StatCard
                            stat={
                              item.item.stats.currentPower +
                              ' / ' +
                              item.item.stats.power
                            }
                          >
                            <LightningIcon className="size-6" />
                          </StatCard>
                        )}
                        {item.item.stats.weight && (
                          <StatCard stat={item.item.stats.weight}>
                            <EquipIcon className="size-6" />
                          </StatCard>
                        )}
                      </>
                    )}
                    {item.category === 'cybernetic' && (
                      <>
                        {item.item.stats.cyber && (
                          <StatCard stat={item.item.stats.cyber}>
                            <CyberIcon className="size-6" />
                          </StatCard>
                        )}
                        {item.item.stats.power && (
                          <StatCard
                            stat={
                              item.item.stats.currentPower +
                              ' / ' +
                              item.item.stats.power
                            }
                          >
                            <LightningIcon className="size-6" />
                          </StatCard>
                        )}
                      </>
                    )}
                  </div> */}
                    </div>
                  </div>
                </div>
              </>
            )
          );
        })}
      </div>
    </div>
  );
};

export default EquipmentList;
