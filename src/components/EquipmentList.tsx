import { WeaponWithKeywords } from 'src/types/weapon';
import { ArmorWithKeywords } from 'src/types/armor';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import clsx from 'clsx';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { Item } from 'src/types/item';
import ArrowHeader2 from './ArrowHeader2';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import BtnControl from './buttons/BtnControl';
import WeaponIcon from './icons/WeaponIcon';
import BtnAuth from './buttons/BtnAuth';
import Divider from './Divider';

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
  const { accentPrimary } = useContext(ThemeContext);
  const [toolTip, setToolTip] = useState(0);
  const [tab, setTab] = useState('weapons');

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

  let itemList;

  switch (tab) {
    case 'weapons':
      itemList = weapons;
      break;
    case 'armor':
      itemList = armor;
      break;
    case 'cybernetics':
      itemList = cybernetics;
      break;
    case 'items':
      itemList = items;
      break;
    default:
      itemList = [];
      break;
  }

  return (
    <div className="flex w-full flex-col gap-8">
      {children}
      <ArrowHeader2 title="Equipped Items" />
      <ThemeContainer borderColor={accentPrimary} chamfer="medium">
        <div className="scrollbar-secondary-2 bg-primary grid w-full grid-cols-1 gap-4 p-4 clip-6 sm:max-h-none lg:grid-cols-2">
          <div className="col-span-2 grid grid-flow-col gap-4">
            <BtnAuth
              active={tab === 'weapons' ? true : false}
              onClick={() => setTab('weapons')}
            >
              Weapons
            </BtnAuth>
            <BtnAuth
              active={tab === 'armor' ? true : false}
              onClick={() => setTab('armor')}
            >
              Armor
            </BtnAuth>
            <BtnAuth
              active={tab === 'cybernetics' ? true : false}
              onClick={() => setTab('cybernetics')}
            >
              Cybernetics
            </BtnAuth>
            <BtnAuth
              active={tab === 'items' ? true : false}
              onClick={() => setTab('items')}
            >
              Items
            </BtnAuth>
          </div>
          <Divider className="col-span-2" />
          {itemList.map((item, index) => {
            const rarityColors = {
              common: 'bg-gray-400',
              uncommon: 'bg-green-500',
              rare: 'bg-red-600',
              blackMarket: 'bg-purple-700',
              artifact: 'bg-amber-400',
            };
            return (
              item.equipped === true && (
                <div
                  key={index}
                  className="flex flex-col rounded-br-4xl rounded-tl-4xl shadow-md shadow-black"
                >
                  <div className="bg-secondary relative flex w-full items-start gap-3 pr-4 clip-4 sm:gap-6">
                    <button
                      className={clsx(
                        rarityColors[item.rarity] || 'bg-tertiary',
                        'group relative h-24 w-28 shrink-0 overflow-hidden pl-1 lg:h-28 lg:w-32',
                      )}
                      onClick={() =>
                        setActive({
                          id: item.id,
                          category: tab,
                        })
                      }
                    >
                      {item.picture?.imageUrl ? (
                        <img
                          src={item.picture?.imageUrl}
                          alt={item.name}
                          className="group-hover:opacity-80"
                        />
                      ) : (
                        <div className="bg-tertiary h-full w-full p-1 group-hover:opacity-80">
                          <p className="my-auto break-words text-center text-base">
                            {item.name}
                          </p>
                        </div>
                      )}
                    </button>
                    <div className="flex h-full w-full flex-col items-start justify-evenly gap-2 overflow-hidden">
                      <h3 className="line-clamp-2 text-ellipsis">
                        {item.name}
                      </h3>
                      {active?.id === item?.id ? (
                        <button
                          className="text-error text-lg hover:underline"
                          onClick={() =>
                            setActive({ id: null, category: null })
                          }
                        >
                          Disarm
                        </button>
                      ) : (
                        <button
                          className="text-accent text-lg hover:underline"
                          onClick={() =>
                            setActive({
                              id: item.id,
                              category: tab,
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
      </ThemeContainer>
    </div>
  );
};

export default EquipmentList;
