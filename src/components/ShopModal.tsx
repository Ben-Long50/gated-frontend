import BtnAuth from './buttons/BtnAuth';
import { useMemo, useState } from 'react';
import Items from './Items';
import WeaponIcon from './icons/WeaponIcon';
import ArmorIcon from './icons/ArmorIcon';
import CyberIcon from './icons/CyberIcon';
import InventoryIcon from './icons/InventoryIcon';
import PotionIcon from './icons/PotionIcon';
import Modal from './Modal';
import VehicleIcon from './icons/VehicleIcon';
import DroneIcon from './icons/DroneIcon';
import { capitalCase } from 'change-case';
import Icon from '@mdi/react';
import { mdiCartOutline } from '@mdi/js';
import { Character } from 'src/types/character';
import Cart from './Cart';
import CharacterPictureRound from './CharacterPictureRound';
import ShopIcon from './icons/ShopIcon';

const ShopModal = ({
  modalOpen,
  toggleModal,
  character,
  activeCharacter,
}: {
  modalOpen: boolean;
  toggleModal: () => void;
  character?: Character;
  activeCharacter: Character;
}) => {
  const [tab, setTab] = useState('all');

  const cartLength = useMemo(() => {
    return Object.values(activeCharacter?.characterCart || {})
      .filter(Array.isArray)
      .flat()
      .reduce((sum, item) => sum + item.quantity, 0);
  }, [activeCharacter]);

  const { actions, ...inventoryItems } = character?.inventory ?? {};

  const shopItems = null;

  const allShopItems = shopItems ? Object.values(shopItems).flat() : null;

  return (
    <Modal className="h-full" modalOpen={modalOpen} toggleModal={toggleModal}>
      <button
        className="group absolute left-2 top-2 sm:left-4 sm:top-4"
        onClick={() => setTab('cart')}
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
        <h1 className="text-left">Shop {capitalCase(tab)}</h1>
      </div>
      <p className="absolute right-2 top-2 sm:right-4 sm:top-4">
        {activeCharacter.profits}p
      </p>
      <div className="grid w-full grid-cols-7 gap-2 sm:gap-4">
        {shopItems && (
          <BtnAuth
            active={tab === 'all' ? true : false}
            onClick={() => setTab('all')}
          >
            <ShopIcon className="size-8" />
          </BtnAuth>
        )}
        {(!shopItems || shopItems.weapons.length) > 0 && (
          <BtnAuth
            active={tab === 'weapons' ? true : false}
            onClick={() => setTab('weapons')}
          >
            <WeaponIcon className="size-8" />
          </BtnAuth>
        )}
        {(!shopItems || shopItems.armors.length > 0) && (
          <BtnAuth
            active={tab === 'armors' ? true : false}
            onClick={() => setTab('armors')}
          >
            <ArmorIcon className="size-8" />
          </BtnAuth>
        )}
        {(!shopItems || shopItems.augmentations.length > 0) && (
          <BtnAuth
            active={tab === 'augmentations' ? true : false}
            onClick={() => setTab('augmentations')}
          >
            <CyberIcon className="size-8" />
          </BtnAuth>
        )}
        {(!shopItems || shopItems.reusables.length > 0) && (
          <BtnAuth
            active={tab === 'reusables' ? true : false}
            onClick={() => setTab('reusables')}
          >
            <InventoryIcon className="size-8" />
          </BtnAuth>
        )}
        {(!shopItems || shopItems.consumables.length > 0) && (
          <BtnAuth
            active={tab === 'consumables' ? true : false}
            onClick={() => setTab('consumables')}
          >
            <PotionIcon className="size-8" />
          </BtnAuth>
        )}
        {(!shopItems || shopItems.vehicles.length > 0) && (
          <BtnAuth
            active={tab === 'vehicles' ? true : false}
            onClick={() => setTab('vehicles')}
          >
            <VehicleIcon className="size-8" />
          </BtnAuth>
        )}
        {(!shopItems || shopItems.drones.length > 0) && (
          <BtnAuth
            active={tab === 'drones' ? true : false}
            onClick={() => setTab('drones')}
          >
            <DroneIcon className="size-8" />
          </BtnAuth>
        )}
      </div>
      {tab === 'cart' ? (
        <Cart character={activeCharacter} />
      ) : (
        <Items
          forcedMode="shop"
          forcedCategory={tab}
          character={character}
          itemList={
            shopItems ? (tab === 'all' ? allShopItems : shopItems[tab]) : null
          }
        />
      )}
    </Modal>
  );
};

export default ShopModal;
