import { WeaponWithKeywords } from 'src/types/weapon';
import { ArmorWithKeywords } from 'src/types/armor';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import EquipmentModal from './EquipmentModal';
import WeaponCard from './WeaponCard';
import ArmorCard from './ArmorCard';
import CyberneticCard from './CyberneticCard';
import { LayoutContext } from '../contexts/LayoutContext';

const EquipmentList = ({
  weapons,
  armor,
  cybernetics,
  activeItem,
  setActiveItem,
}: {
  weapons: WeaponWithKeywords[];
  armor: ArmorWithKeywords[];
  cybernetics: CyberneticWithKeywords[];
  activeItem: {
    item: WeaponWithKeywords | ArmorWithKeywords | CyberneticWithKeywords;
    category: 'weapon' | 'armor' | 'cybernetic';
  };
  setActiveItem: (item: {
    item: WeaponWithKeywords | ArmorWithKeywords | CyberneticWithKeywords;
    category: 'weapon' | 'armor' | 'cybernetic';
  }) => void;
}) => {
  const { layoutSize } = useContext(LayoutContext);
  const [modalOpen, setModalOpen] = useState(0);
  const [toolTip, setToolTip] = useState(0);

  const toggleModal = () => {
    setModalOpen(0);
  };

  useEffect(() => {
    if (toolTip) {
      document.addEventListener('click', () => setToolTip(0));
    } else {
      document.removeEventListener('click', () => setToolTip(0));
    }

    return () => {
      document.removeEventListener('click', () => setToolTip(0));
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
      {layoutSize === 'large' &&
        activeItem !== null &&
        (activeItem.category === 'weapon' ? (
          <WeaponCard
            key={activeItem.item.id}
            weapon={activeItem.item}
            mode="equipment"
          />
        ) : activeItem.category === 'armor' ? (
          <ArmorCard
            key={activeItem.item.id}
            armor={activeItem.item}
            mode="equipment"
          />
        ) : (
          activeItem.category === 'cybernetic' && (
            <CyberneticCard
              key={activeItem.item.id}
              cybernetic={activeItem.item}
              mode="equipment"
            />
          )
        ))}
      <h2>Equipped Items</h2>
      <div className="scrollbar-secondary-2 grid grid-cols-1 gap-4 sm:max-h-none lg:grid-cols-2 xl:grid-cols-3">
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
              <div
                key={index}
                className="bg-secondary relative flex items-start gap-3 rounded-br-md rounded-tr-md pr-4 shadow-md shadow-zinc-950 sm:gap-6"
              >
                <EquipmentModal
                  index={index}
                  item={item.item}
                  category={item.category}
                  modalOpen={modalOpen}
                  toggleModal={toggleModal}
                />
                <button
                  className={clsx(
                    rarityColors[item.item.rarity] || 'bg-tertiary',
                    'group relative h-24 w-28 shrink-0 overflow-hidden rounded-bl-md rounded-tl-md pl-1 lg:h-28 lg:w-32',
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
                <div className="flex h-full w-full flex-col items-start justify-evenly gap-2 overflow-hidden">
                  <h3 className="text-ellipsis whitespace-nowrap">
                    {item.item.name}
                  </h3>
                  {activeItem?.item?.id === item.item?.id ? (
                    <button
                      className="text-error text-lg hover:underline"
                      onClick={() => setActiveItem(null)}
                    >
                      Disarm
                    </button>
                  ) : (
                    <button
                      className="text-accent text-lg hover:underline"
                      onClick={() => setActiveItem(item)}
                    >
                      Activate
                    </button>
                  )}
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default EquipmentList;
