import BtnAuth from '../buttons/BtnAuth';
import { useMemo } from 'react';
import WeaponIcon from '../icons/WeaponIcon';
import ArmorIcon from '../icons/ArmorIcon';
import CyberIcon from '../icons/CyberIcon';
import InventoryIcon from '../icons/InventoryIcon';
import PotionIcon from '../icons/PotionIcon';
import Modal from './Modal';
import VehicleIcon from '../icons/VehicleIcon';
import DroneIcon from '../icons/DroneIcon';
import { capitalCase } from 'change-case';
import Icon from '@mdi/react';
import { mdiCartOutline } from '@mdi/js';
import CharacterPictureRound from '../CharacterPictureRound';
import ShopIcon from '../icons/ShopIcon';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import useCharacter from 'src/hooks/useCharacter';
import Divider from '../Divider';

const ShopModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const parts = location.pathname.split('/');
  const category = parts.pop();
  const { characterId, shopId } = useParams();

  const { filteredCharacter: character } = useCharacter(Number(characterId));

  const cartLength = useMemo(() => {
    return Object.values(character?.characterCart || {})
      .filter(Array.isArray)
      .flat()
      .reduce((sum, item) => sum + item.quantity, 0);
  }, [character]);

  const { filteredCharacter: shop } = useCharacter(Number(shopId));

  const { actions, ...shopItems } = shop?.inventory ?? {};

  const allShopItems = shopId ? Object.values(shopItems).flat() : null;

  return (
    <Modal className="h-full">
      <button
        className="group absolute left-2 top-2 sm:left-4 sm:top-4"
        onClick={() => navigate('cart')}
      >
        <Icon
          className="group-hover:text-accent text-secondary timing size-12 shrink-0 p-2"
          path={mdiCartOutline}
        />
        <p className="absolute right-0 top-0 flex h-6 min-w-6 items-center justify-center rounded-full bg-yellow-300 pt-0.5 text-center text-base font-semibold shadow-md shadow-black dark:text-gray-950">
          {cartLength}
        </p>
      </button>
      <div className="flex w-full items-center justify-center gap-4 px-8">
        <CharacterPictureRound character={character} />
        <h1 className="text-left">Shop {capitalCase(category)}</h1>
      </div>
      <p className="absolute right-2 top-2 sm:right-4 sm:top-4">
        {character?.profits}p
      </p>
      <div className="grid w-full grid-flow-col gap-2">
        {shopItems && (
          <BtnAuth
            className="w-full"
            active={category === 'all' ? true : false}
            onClick={() => navigate('all')}
          >
            <ShopIcon className="size-8" />
          </BtnAuth>
        )}
        {(!allShopItems || shopItems.weapons?.length) > 0 && (
          <BtnAuth
            active={category === 'weapons' ? true : false}
            onClick={() => navigate('weapons')}
          >
            <WeaponIcon className="size-8" />
          </BtnAuth>
        )}
        {(!allShopItems || shopItems.armors?.length > 0) && (
          <BtnAuth
            active={category === 'armors' ? true : false}
            onClick={() => navigate('armors')}
          >
            <ArmorIcon className="size-8" />
          </BtnAuth>
        )}
        {(!allShopItems || shopItems.augmentations?.length > 0) && (
          <BtnAuth
            active={category === 'augmentations' ? true : false}
            onClick={() => navigate('augmentations')}
          >
            <CyberIcon className="size-8" />
          </BtnAuth>
        )}
        {(!allShopItems || shopItems.reusables?.length > 0) && (
          <BtnAuth
            active={category === 'reusables' ? true : false}
            onClick={() => navigate('reusables')}
          >
            <InventoryIcon className="size-8" />
          </BtnAuth>
        )}
        {(!allShopItems || shopItems.consumables?.length > 0) && (
          <BtnAuth
            active={category === 'consumables' ? true : false}
            onClick={() => navigate('consumables')}
          >
            <PotionIcon className="size-8" />
          </BtnAuth>
        )}
        {(!allShopItems || shopItems.vehicles?.length > 0) && (
          <BtnAuth
            active={category === 'vehicles' ? true : false}
            onClick={() => navigate('vehicles')}
          >
            <VehicleIcon className="size-8" />
          </BtnAuth>
        )}
        {(!allShopItems || shopItems.drones?.length > 0) && (
          <BtnAuth
            active={category === 'drones' ? true : false}
            onClick={() => navigate('drones')}
          >
            <DroneIcon className="size-8" />
          </BtnAuth>
        )}
      </div>
      <Divider className="my-0" />
      <Outlet context={{ character, allShopItems }} />
    </Modal>
  );
};

export default ShopModal;
