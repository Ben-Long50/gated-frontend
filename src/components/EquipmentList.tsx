import { WeaponWithKeywords } from 'src/types/weapon';
import { ArmorWithKeywords } from 'src/types/armor';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import clsx from 'clsx';
import { ReactNode, useEffect, useState } from 'react';
import EquipmentModal from './EquipmentModal';
import Icon from '@mdi/react';
import { mdiTriangleDown } from '@mdi/js';
import { Item } from 'src/types/item';

const EquipmentList = ({
  weapons,
  armor,
  cybernetics,
  items,
  active,
  setActive,
  children,
}: {
  weapons: WeaponWithKeywords[];
  armor: ArmorWithKeywords[];
  cybernetics: CyberneticWithKeywords[];
  items: Item[];
  active: {
    id: null | number;
    category: null | string;
  };
  setActive: (item: { id: null | number; category: null | string }) => void;
  children?: ReactNode;
}) => {
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

  const itemList = [weapons, armor, cybernetics, items].flatMap((group, i) =>
    group.map((item) => ({
      category: ['weapon', 'armor', 'cybernetic', 'item'][i],
      item,
    })),
  );

  return (
    <div className="flex w-full flex-col gap-8">
      {children}
      <div className="flex items-center gap-4">
        <Icon
          className="text-primary"
          path={mdiTriangleDown}
          size={0.5}
          rotate={-90}
        />
        <h2>Equipped Items</h2>
      </div>
      <div className="scrollbar-secondary-2 grid w-full grid-cols-1 gap-4 sm:max-h-none lg:grid-cols-2">
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
                className="flex flex-col rounded-br-4xl rounded-tl-4xl shadow-md shadow-zinc-950"
              >
                <div className="bg-secondary relative flex w-full items-start gap-3 pr-4 clip-4 sm:gap-6">
                  <button
                    className={clsx(
                      rarityColors[item.item.rarity] || 'bg-tertiary',
                      'group relative h-24 w-28 shrink-0 overflow-hidden pl-1 lg:h-28 lg:w-32',
                    )}
                    onClick={() =>
                      setActive({
                        id: item.item.id,
                        category: item.category,
                      })
                    }
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
                    <h3 className="line-clamp-2 text-ellipsis">
                      {item.item.name}
                    </h3>
                    {active?.id === item.item?.id ? (
                      <button
                        className="text-error text-lg hover:underline"
                        onClick={() => setActive({ id: null, category: null })}
                      >
                        Disarm
                      </button>
                    ) : (
                      <button
                        className="text-accent text-lg hover:underline"
                        onClick={() =>
                          setActive({
                            id: item.item.id,
                            category: item.category,
                          })
                        }
                      >
                        Activate
                      </button>
                    )}
                  </div>
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
