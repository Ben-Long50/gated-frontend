import BtnAuth from '../buttons/BtnAuth';
import { useContext, useMemo } from 'react';
import WeaponIcon from '../icons/WeaponIcon';
import ArmorIcon from '../icons/ArmorIcon';
import CyberIcon from '../icons/CyberIcon';
import InventoryIcon from '../icons/InventoryIcon';
import PotionIcon from '../icons/PotionIcon';
import Modal from './Modal';
import VehicleIcon from '../icons/VehicleIcon';
import DroneIcon from '../icons/DroneIcon';
import Icon from '@mdi/react';
import { mdiCartOutline } from '@mdi/js';
import CharacterPictureRound from '../CharacterPictureRound';
import ShopIcon from '../icons/ShopIcon';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import useCharacter from 'src/hooks/useCharacter';
import Divider from '../Divider';
import { ThemeContext } from 'src/contexts/ThemeContext';

const ShopModal = () => {
  const { accentPrimary } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const parts = location.pathname.split('/');
  const category = parts.pop();
  const { characterId, shopId } = useParams();

  const { filteredCharacter: character } = useCharacter(Number(characterId));
  const { filteredCharacter: shop } = useCharacter(Number(shopId));

  const cartLength = useMemo(() => {
    return Object.values(character?.characterCart || {})
      .filter(Array.isArray)
      .flat()
      .reduce((sum, item) => sum + item.quantity, 0);
  }, [character]);

  const { actions, ...shopItems } = shop?.inventory ?? {};

  const categorizedShopItems = useMemo(
    () =>
      shopId
        ? category === 'all'
          ? Object.values(shopItems).flat()
          : shopItems[category]
        : null,
    [category, shopId],
  );

  return (
    <Modal className="h-full">
      <button
        className="group absolute left-2 top-2 sm:left-4 sm:top-4"
        onClick={() => navigate('cart', { replace: true })}
      >
        <Icon
          className="group-hover:text-accent text-secondary timing size-12 shrink-0 p-2"
          path={mdiCartOutline}
        />
        <p
          className="shadow-color absolute right-0 top-0 flex h-6 min-w-6 items-center justify-center rounded-full pt-0.5 text-center text-base font-semibold shadow-md dark:text-gray-950"
          style={{ backgroundColor: accentPrimary }}
        >
          {cartLength}
        </p>
      </button>
      <div className="flex w-full items-center justify-center gap-4 px-8">
        {shopId ? (
          <CharacterPictureRound character={shop} />
        ) : (
          <CharacterPictureRound character={character} />
        )}
        <h1 className="text-left">
          {shopId ? `${shop?.firstName}'s Shop` : 'Global Shop'}
        </h1>
      </div>
      <p className="absolute right-2 top-12 sm:right-4 sm:top-14">
        {character?.profits}p
      </p>
      <div className="grid w-full grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] gap-2">
        {shopId && (
          <BtnAuth
            active={category === 'all' ? true : false}
            onClick={() => navigate('all', { replace: true })}
          >
            <ShopIcon className="size-8" />
          </BtnAuth>
        )}
        {(!categorizedShopItems || shopItems.weapons?.length) > 0 && (
          <BtnAuth
            active={category === 'weapons' ? true : false}
            onClick={() => navigate('weapons', { replace: true })}
          >
            <WeaponIcon className="size-8" />
          </BtnAuth>
        )}
        {(!categorizedShopItems || shopItems.armors?.length > 0) && (
          <BtnAuth
            active={category === 'armors' ? true : false}
            onClick={() => navigate('armors', { replace: true })}
          >
            <ArmorIcon className="size-8" />
          </BtnAuth>
        )}
        {(!categorizedShopItems || shopItems.augmentations?.length > 0) && (
          <BtnAuth
            active={category === 'augmentations' ? true : false}
            onClick={() => navigate('augmentations', { replace: true })}
          >
            <CyberIcon className="size-8" />
          </BtnAuth>
        )}
        {(!categorizedShopItems || shopItems.reusables?.length > 0) && (
          <BtnAuth
            active={category === 'reusables' ? true : false}
            onClick={() => navigate('reusables', { replace: true })}
          >
            <InventoryIcon className="size-8" />
          </BtnAuth>
        )}
        {(!categorizedShopItems || shopItems.consumables?.length > 0) && (
          <BtnAuth
            active={category === 'consumables' ? true : false}
            onClick={() => navigate('consumables', { replace: true })}
          >
            <PotionIcon className="size-8" />
          </BtnAuth>
        )}
        {(!categorizedShopItems || shopItems.vehicles?.length > 0) && (
          <BtnAuth
            active={category === 'vehicles' ? true : false}
            onClick={() => navigate('vehicles', { replace: true })}
          >
            <VehicleIcon className="size-8" />
          </BtnAuth>
        )}
        {(!categorizedShopItems || shopItems.drones?.length > 0) && (
          <BtnAuth
            active={category === 'drones' ? true : false}
            onClick={() => navigate('drones', { replace: true })}
          >
            <DroneIcon className="size-8" />
          </BtnAuth>
        )}
      </div>
      <Divider className="my-0" />
      <Outlet context={{ character, categorizedShopItems }} />
    </Modal>
  );
};

export default ShopModal;
