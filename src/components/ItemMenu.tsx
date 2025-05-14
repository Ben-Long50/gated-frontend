import { ReactNode, useContext, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
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
import { CharacterInventory } from 'src/types/character';

const ItemMenu = ({
  equipment,
  children,
}: {
  equipment: CharacterInventory | null;
  children: (item: any, index: number, props: { tab: string }) => ReactNode;
}) => {
  const { mobile } = useContext(LayoutContext);
  const { accentPrimary } = useContext(ThemeContext);
  const location = useLocation();
  const parts = location.pathname.split('/');
  const mode = parts[parts.length - 1];
  const category = parts[parts.length - 2];

  const [tab, setTab] = useState(() => {
    if (category === 'equipment' || mode === 'equipment') {
      return 'weapon';
    } else if (category === 'deployments' || mode === 'deployments') {
      return 'vehicle';
    }
    return '';
  });

  let itemList;

  switch (tab) {
    case 'weapon':
      itemList = equipment?.weapons;
      break;
    case 'armor':
      itemList = equipment?.armor;
      break;
    case 'cybernetic':
      itemList = equipment?.cybernetics;
      break;
    case 'item':
      itemList = equipment?.items;
      break;
    case 'vehicle':
      itemList = equipment?.vehicles;
      break;
    case 'drone':
      itemList = equipment?.drones;
      break;
    default:
      itemList = [];
      break;
  }

  let listLayoutClasses;

  switch (mode) {
    case 'equipment':
      listLayoutClasses = 'grid grid-cols-1 sm:grid-cols-2';
      break;
    case 'deployments':
      listLayoutClasses = 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3';
      break;
    case 'inventory':
      listLayoutClasses = 'grid grid-cols-3 sm:grid-cols-6';
      break;
    default:
      listLayoutClasses = '';
      break;
  }

  return (
    <ThemeContainer
      borderColor={accentPrimary}
      chamfer="medium"
      overflowHidden={true}
    >
      <div className="scrollbar-secondary-2 flex max-h-75dvh w-full flex-col gap-2 overflow-y-auto p-4">
        <div className="col-span-2 grid grid-flow-col gap-2 sm:gap-4">
          {(category === 'equipment' || mode === 'equipment') && (
            <>
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
            </>
          )}
          {(category === 'deployments' || mode === 'deployments') && (
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
    </ThemeContainer>
  );
};

export default ItemMenu;
