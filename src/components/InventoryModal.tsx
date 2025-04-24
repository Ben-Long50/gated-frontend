import { useContext } from 'react';
import ArrowHeader2 from './ArrowHeader2';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import { WeaponWithKeywords } from 'src/types/weapon';
import { ArmorWithKeywords } from 'src/types/armor';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import { Item } from 'src/types/item';
import Icon from '@mdi/react';
import { mdiCheckCircle } from '@mdi/js';
import Modal from './Modal';
import ItemMenu from './ItemMenu';
import useToggleEquipmentMutation from '../hooks/useEquipmentToggleMutation/useEquipmentToggleMutation';
import { AuthContext } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { Character } from 'src/types/character';

const InventoryModal = ({
  character,
  weapons,
  armor,
  cybernetics,
  items,
  modalOpen,
  toggleModal,
}: {
  character: Character;
  weapons: WeaponWithKeywords[];
  armor: ArmorWithKeywords[];
  cybernetics: CyberneticWithKeywords[];
  items: Item[];
  modalOpen: boolean;
  toggleModal: () => void;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary, rarityColorMap } = useContext(ThemeContext);
  const { characterId } = useParams();

  const toggleEquipment = useToggleEquipmentMutation(
    apiUrl,
    Number(characterId),
  );

  return (
    <Modal modalOpen={modalOpen} toggleModal={toggleModal}>
      <div
        className="flex w-full max-w-4xl flex-col gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        <ThemeContainer
          className="w-full"
          borderColor={accentPrimary}
          chamfer="medium"
        >
          <div className="flex items-center justify-between gap-8 p-4">
            <ArrowHeader2 title="Inventory" />
            <p className="text-tertiary italic">
              (Double click to equip / unequip)
            </p>
          </div>
        </ThemeContainer>
        <ItemMenu
          weapons={weapons}
          armor={armor}
          cybernetics={cybernetics}
          items={items}
          mode="inventory"
        >
          {(item, index, { tab }) => (
            <div
              className="group relative cursor-pointer select-none overflow-hidden rounded-bl rounded-tr pl-1 clip-4"
              style={{ backgroundColor: rarityColorMap[item.rarity] }}
              key={index}
              onDoubleClick={() => {
                if (characterId) {
                  toggleEquipment.mutate({
                    characterId: character?.id,
                    inventoryId: character?.characterInventory?.id,
                    category: tab,
                    itemId: item.id,
                  });
                }
              }}
            >
              {item.equipped === true && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950 bg-opacity-65">
                  <Icon
                    className="text-tertiary group-hover:text-secondary"
                    path={mdiCheckCircle}
                    size={3}
                  />
                </div>
              )}
              {item.picture?.imageUrl ? (
                <img
                  className="h-32 hover:opacity-80"
                  src={item.picture?.imageUrl}
                  alt={item.name}
                />
              ) : (
                <div className="bg-tertiary h-full w-full p-1 hover:opacity-80">
                  <p className="my-auto text-center text-base">{item.name}</p>
                </div>
              )}
            </div>
          )}
        </ItemMenu>
      </div>
    </Modal>
  );
};

export default InventoryModal;
