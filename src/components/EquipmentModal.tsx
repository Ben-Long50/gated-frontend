import { WeaponWithKeywords } from 'src/types/weapon';
import RootPortal from '../layouts/RootPortal';
import WeaponCard from './WeaponCard';
import { ArmorWithKeywords } from 'src/types/armor';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import clsx from 'clsx';
import ArmorCard from './ArmorCard';
import CyberneticCard from './CyberneticCard';

const EquipmentModal = ({
  index,
  item,
  category,
  modalOpen,
  toggleModal,
}: {
  index: number;
  item: WeaponWithKeywords | ArmorWithKeywords | CyberneticWithKeywords;
  category: string;
  modalOpen: number;
  toggleModal: () => void;
}) => {
  const odd = index === 1 || index % 2;

  if (modalOpen !== item.id) return;
  return (
    <>
      <div
        className={`${odd ? 'right-0' : 'left-0'} absolute top-1/2 z-30 w-full -translate-y-1/2 sm:w-[800px]`}
        onClick={(e) => e.stopPropagation()}
      >
        {category === 'weapon' ? (
          <WeaponCard mode="equipment" weapon={item} />
        ) : category === 'armor' ? (
          <ArmorCard mode="equipment" armor={item} />
        ) : (
          category === 'cybernetic' && (
            <CyberneticCard mode="equipment" cybernetic={item} />
          )
        )}
      </div>
      <RootPortal modalOpen={modalOpen} toggleModal={toggleModal} />
    </>
  );
};

export default EquipmentModal;
