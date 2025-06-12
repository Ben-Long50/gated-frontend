import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import Icon from '@mdi/react';
import { mdiCheckCircle } from '@mdi/js';
import Modal from './Modal';
import ItemMenu from '../ItemMenu';
import useToggleEquipmentMutation from '../../hooks/useEquipmentToggleMutation/useEquipmentToggleMutation';
import { AuthContext } from '../../contexts/AuthContext';
import { useOutletContext, useParams } from 'react-router-dom';
import useCharacter from 'src/hooks/useCharacter';

const InventoryModal = () => {
  const { apiUrl } = useContext(AuthContext);
  const { rarityColorMap } = useContext(ThemeContext);
  const { characterId } = useParams();

  const { activeItem, toggleActive } = useOutletContext() || {};

  const { filteredCharacter: character } = useCharacter(Number(characterId));

  const toggleEquipment = useToggleEquipmentMutation(apiUrl);

  return (
    <Modal>
      <div
        className="flex w-full flex-col gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-center">Inventory</h1>

        <ItemMenu forcedMode="inventory" equipment={character?.inventory}>
          {(item, index) => (
            <div
              className="group relative h-full cursor-pointer select-none overflow-hidden rounded-bl rounded-tr pl-1 clip-4"
              style={{ backgroundColor: rarityColorMap[item.rarity] }}
              key={index}
              onDoubleClick={() => {
                if (characterId) {
                  if (item.id === activeItem?.id) {
                    toggleActive(null, null);
                  }
                  toggleEquipment.mutate({
                    characterId: character?.id,
                    inventoryId: character?.characterInventory?.id,
                    category: item.itemTypes,
                    itemId: item.id,
                  });
                }
              }}
            >
              {item.equipped === true && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950 bg-opacity-65">
                  <Icon
                    className="text-tertiary group-hover:text-secondary h-full"
                    path={mdiCheckCircle}
                    size={3}
                  />
                </div>
              )}
              {item.picture?.imageUrl ? (
                <img
                  className="aspect-square"
                  src={item.picture?.imageUrl}
                  alt={item.name}
                />
              ) : (
                <div className="bg-tertiary aspect-square h-full p-1 hover:opacity-80">
                  <p className="my-auto text-center text-base">{item.name}</p>
                </div>
              )}
            </div>
          )}
        </ItemMenu>
        <p className="text-tertiary text-right">
          (Double click to equip / unequip)
        </p>
      </div>
    </Modal>
  );
};

export default InventoryModal;
