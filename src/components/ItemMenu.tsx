import { ReactNode, useContext, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import BtnAuth from './buttons/BtnAuth';
import { WeaponWithKeywords } from 'src/types/weapon';
import { ArmorWithKeywords } from 'src/types/armor';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import { Item } from 'src/types/item';
import Divider from './Divider';

const ItemMenu = ({
  weapons,
  armor,
  cybernetics,
  items,
  children,
}: {
  weapons: WeaponWithKeywords[];
  armor: ArmorWithKeywords[];
  cybernetics: CyberneticWithKeywords[];
  items: Item[];
  children: (
    item:
      | WeaponWithKeywords
      | ArmorWithKeywords
      | CyberneticWithKeywords
      | Item,
    index: number,
    props: { tab: string },
  ) => ReactNode;
}) => {
  const { accentPrimary } = useContext(ThemeContext);

  const [tab, setTab] = useState('weapon');

  let itemList;

  switch (tab) {
    case 'weapon':
      itemList = weapons;
      break;
    case 'armor':
      itemList = armor;
      break;
    case 'cybernetic':
      itemList = cybernetics;
      break;
    case 'item':
      itemList = items;
      break;
    default:
      itemList = [];
      break;
  }

  return (
    <ThemeContainer borderColor={accentPrimary} chamfer="medium">
      <div className="scrollbar-secondary-2 bg-primary flex max-h-75dvh w-full flex-col gap-4 p-4 clip-6">
        <div className="col-span-2 grid grid-flow-col gap-4">
          <BtnAuth
            active={tab === 'weapon' ? true : false}
            onClick={() => setTab('weapon')}
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
            active={tab === 'cybernetic' ? true : false}
            onClick={() => setTab('cybernetic')}
          >
            Cybernetics
          </BtnAuth>
          <BtnAuth
            active={tab === 'item' ? true : false}
            onClick={() => setTab('item')}
          >
            Items
          </BtnAuth>
        </div>
        <Divider className="col-span-2" />
        <div className="scrollbar-secondary-2 flex flex-wrap gap-4 overflow-y-auto">
          {itemList.map((item, index) => children(item, index, { tab }))}
        </div>
      </div>
    </ThemeContainer>
  );
};

export default ItemMenu;
