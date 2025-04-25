import { ReactNode, useContext, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import BtnAuth from './buttons/BtnAuth';
import { WeaponWithKeywords } from 'src/types/weapon';
import { ArmorWithKeywords } from 'src/types/armor';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import { Item } from 'src/types/item';
import Divider from './Divider';
import { LayoutContext } from '../contexts/LayoutContext';
import WeaponIcon from './icons/WeaponIcon';
import ArmorIcon from './icons/ArmorIcon';
import CyberIcon from './icons/CyberIcon';
import InventoryIcon from './icons/InventoryIcon';

const ItemMenu = ({
  weapons,
  armor,
  cybernetics,
  items,
  mode,
  children,
}: {
  weapons: WeaponWithKeywords[];
  armor: ArmorWithKeywords[];
  cybernetics: CyberneticWithKeywords[];
  items: Item[];
  mode: 'equipment' | 'inventory';
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
  const { mobile } = useContext(LayoutContext);
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
      <div className="scrollbar-secondary-2 flex max-h-75dvh w-full flex-col gap-2 p-4">
        <div className="col-span-2 grid grid-flow-col gap-2 sm:gap-4">
          <BtnAuth
            active={tab === 'weapon' ? true : false}
            onClick={() => setTab('weapon')}
          >
            {mobile ? <WeaponIcon className="size-8" /> : 'Weapons'}
          </BtnAuth>
          <BtnAuth
            active={tab === 'armor' ? true : false}
            onClick={() => setTab('armor')}
          >
            {mobile ? <ArmorIcon className="size-8" /> : 'Armor'}
          </BtnAuth>
          <BtnAuth
            active={tab === 'cybernetic' ? true : false}
            onClick={() => setTab('cybernetic')}
          >
            {mobile ? <CyberIcon className="size-8" /> : 'Cybernetics'}
          </BtnAuth>
          <BtnAuth
            active={tab === 'item' ? true : false}
            onClick={() => setTab('item')}
          >
            {mobile ? <InventoryIcon className="size-8" /> : 'Items'}
          </BtnAuth>
        </div>
        <Divider className="col-span-2" />
        <div
          className={`${mode === 'equipment' ? 'grid grid-cols-2' : 'grid grid-cols-[repeat(auto-fill,minmax(100px,auto))]'} scrollbar-secondary-2 gap-4`}
        >
          {itemList.map((item, index) => children(item, index, { tab }))}
        </div>
      </div>
    </ThemeContainer>
  );
};

export default ItemMenu;
