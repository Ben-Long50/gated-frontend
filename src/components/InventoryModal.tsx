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
import { VehicleWithWeapons } from 'src/types/vehicle';
import { Drone } from 'src/types/drone';

const InventoryModal = ({
  character,
  weapons,
  armor,
  cybernetics,
  items,
  vehicles,
  drones,
  active,
  toggleActive,
  modalOpen,
}: {
  character: Character;
  weapons?: WeaponWithKeywords[];
  armor?: ArmorWithKeywords[];
  cybernetics?: CyberneticWithKeywords[];
  items?: Item[];
  vehicles?: VehicleWithWeapons[];
  drones?: Drone[];
  active: {
    id: null | number;
    category: null | string;
  };
  toggleActive: (id: null | number, category: null | string) => void;
  modalOpen: boolean;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary, rarityColorMap } = useContext(ThemeContext);
  const { characterId } = useParams();

  const toggleEquipment = useToggleEquipmentMutation(
    apiUrl,
    Number(characterId),
  );

  return (
    <Modal modalOpen={modalOpen}>
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
          vehicles={vehicles}
          drones={drones}
        >
          {(item, index, { tab }) => (
            <ThemeContainer
              key={index}
              chamfer="small"
              borderColor="transparent"
              overflowHidden={true}
            >
              <div
                className="group relative h-full cursor-pointer select-none overflow-hidden rounded-bl rounded-tr pl-1"
                style={{ backgroundColor: rarityColorMap[item.rarity] }}
                key={index}
                onDoubleClick={() => {
                  if (characterId) {
                    if (item.id === active.id) {
                      toggleActive(null, null);
                    }
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
                      className="text-tertiary group-hover:text-secondary h-full"
                      path={mdiCheckCircle}
                      size={3}
                    />
                  </div>
                )}
                {item.picture?.imageUrl ? (
                  <img
                    className="aspect-square hover:opacity-80"
                    src={item.picture?.imageUrl}
                    alt={item.name}
                  />
                ) : (
                  <div className="bg-tertiary aspect-square h-full p-1 hover:opacity-80">
                    <p className="my-auto text-center text-base">{item.name}</p>
                  </div>
                )}
              </div>
            </ThemeContainer>
          )}
        </ItemMenu>
      </div>
    </Modal>
  );
};

export default InventoryModal;
