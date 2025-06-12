import { ReactNode, useContext, useRef, useState } from 'react';
import BtnAuth from './buttons/BtnAuth';
import Divider from './Divider';
import { LayoutContext } from '../contexts/LayoutContext';
import WeaponIcon from './icons/WeaponIcon';
import ArmorIcon from './icons/ArmorIcon';
import CyberIcon from './icons/CyberIcon';
import InventoryIcon from './icons/InventoryIcon';
import { useLocation } from 'react-router-dom';
import VehicleIcon from './icons/VehicleIcon';
import DroneIcon from './icons/DroneIcon';
import { SortedInventory } from 'src/types/character';
import { Item } from 'src/types/item';
import PotionIcon from './icons/PotionIcon';

const ItemMenu = ({
  equipment,
  forcedMode,
  children,
}: {
  equipment: SortedInventory | null;
  forcedMode?: string;
  children: (item: any, index: number, props: { tab: string }) => ReactNode;
}) => {
  const { mobile } = useContext(LayoutContext);
  const location = useLocation();
  const parts = location.pathname.split('/');
  const mode = forcedMode || parts[parts.length - 1];
  const category = forcedMode
    ? parts[parts.length - 1]
    : parts[parts.length - 2];

  const [tab, setTab] = useState(() => {
    if (parts.includes('equipment')) {
      return 'weapon';
    } else if (parts.includes('deployments')) {
      return 'vehicle';
    }
    return '';
  });

  const listRef = useRef(null);

  let itemList = [] as Item[];

  switch (tab) {
    case 'weapon':
      itemList = equipment?.weapons || [];
      break;
    case 'armors':
      itemList = equipment?.armors || [];
      break;
    case 'augmentations':
      itemList = equipment?.augmentations || [];
      break;
    case 'reusables':
      itemList = equipment?.reusables || [];
      break;
    case 'consumables':
      itemList = equipment?.consumables || [];
      break;
    case 'vehicle':
      itemList = equipment?.vehicles || [];
      break;
    case 'drone':
      itemList = equipment?.drones || [];
      break;
    default:
      itemList = [];
      break;
  }

  let listLayoutClasses;

  switch (mode) {
    case 'equipment':
      listLayoutClasses =
        listRef.current?.offsetWidth < 700
          ? 'grid grid-cols-1'
          : 'grid grid-cols-2';
      break;
    case 'deployments':
      listLayoutClasses =
        listRef.current?.offsetWidth < 700
          ? 'grid grid-cols-1'
          : 'grid grid-cols-2';
      break;
    case 'inventory':
      listLayoutClasses = 'grid grid-cols-3 sm:grid-cols-6';
      break;
    default:
      listLayoutClasses = '';
      break;
  }

  return (
    <div ref={listRef} className="w-full flex-col gap-2">
      <div className="grid grid-flow-col gap-2 sm:gap-4">
        {parts.includes('equipment') && (
          <>
            <BtnAuth
              active={tab === 'weapon' ? true : false}
              onClick={() => setTab('weapon')}
            >
              {mobile ? <WeaponIcon className="size-8" /> : 'Weapons'}
            </BtnAuth>
            <BtnAuth
              active={tab === 'armors' ? true : false}
              onClick={() => setTab('armors')}
            >
              {mobile ? <ArmorIcon className="size-8" /> : 'Armor'}
            </BtnAuth>
            <BtnAuth
              active={tab === 'augmentations' ? true : false}
              onClick={() => setTab('augmentations')}
            >
              {mobile ? <CyberIcon className="size-8" /> : 'Augmentations'}
            </BtnAuth>
            <BtnAuth
              active={tab === 'reusables' ? true : false}
              onClick={() => setTab('reusables')}
            >
              {mobile ? <InventoryIcon className="size-8" /> : 'Reusables'}
            </BtnAuth>
            <BtnAuth
              active={tab === 'consumables' ? true : false}
              onClick={() => setTab('consumables')}
            >
              {mobile ? <PotionIcon className="size-8" /> : 'Consumables'}
            </BtnAuth>
          </>
        )}
        {parts.includes('deployments') && (
          <>
            <BtnAuth
              active={tab === 'vehicle' ? true : false}
              onClick={() => setTab('vehicle')}
            >
              {mobile ? <VehicleIcon className="size-8" /> : 'Vehicles'}
            </BtnAuth>
            <BtnAuth
              active={tab === 'drone' ? true : false}
              onClick={() => setTab('drone')}
            >
              {mobile ? <DroneIcon className="size-8" /> : 'Drones'}
            </BtnAuth>
          </>
        )}
      </div>
      <Divider className="col-span-2" />
      <div
        className={`${listLayoutClasses} scrollbar-secondary-2 gap-2 sm:gap-4`}
      >
        {itemList ? (
          itemList.map((item, index) => children(item, index, { tab }))
        ) : (
          <h2 className="pl-4">???</h2>
        )}
      </div>
    </div>
  );
};

export default ItemMenu;
