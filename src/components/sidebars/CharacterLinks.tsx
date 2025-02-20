import CharacterIcon from '../icons/CharacterIcon';
import LinkListSidebar from './LinkListSidebar';
import LinkSidebar from './LinkSidebar';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Loading from '../Loading';
import useActiveCharacterQuery from '../../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import InventoryIcon from '../../components/icons/InventoryIcon';
import EquipmentIcon from '../../components/icons/EquipmentIcon';
import VehicleIcon from '../../components/icons/VehicleIcon';
import LinkSublistSidebar from './LinkSublistSidebar';

const CharacterLinks = ({ setSidebarVisibility }) => {
  const { apiUrl } = useContext(AuthContext);

  const {
    data: character,
    isPending,
    isLoading,
  } = useActiveCharacterQuery(apiUrl);

  if (isLoading || isPending) return <Loading />;

  return (
    <>
      <LinkListSidebar
        title={
          <>
            <CharacterIcon className="size-8" />
            <p className="text-inherit">Characters</p>
          </>
        }
      >
        <LinkSidebar
          title="Character list"
          path="characters"
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="Create new character"
          path="characters/create"
          setSidebarVisibility={setSidebarVisibility}
        />
      </LinkListSidebar>
      <LinkListSidebar
        title={
          <>
            <EquipmentIcon className="size-8" />
            <p className="text-inherit">Equipment</p>
          </>
        }
      >
        <LinkSidebar
          title="Equipment"
          path={`characters/${character?.id}/equipment`}
          setSidebarVisibility={setSidebarVisibility}
        />
      </LinkListSidebar>
      <LinkListSidebar
        title={
          <>
            <InventoryIcon className="size-8" />
            <p className="text-inherit">Inventory</p>
          </>
        }
      >
        <LinkSidebar
          title="Weapons"
          path={`characters/${character?.id}/inventory/weapons`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="Armor"
          path={`characters/${character?.id}/inventory/armor`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="Cybernetics"
          path={`characters/${character?.id}/inventory/cybernetics`}
          setSidebarVisibility={setSidebarVisibility}
        />

        <LinkSublistSidebar title="Items">
          <LinkSidebar
            title="All Items"
            path={`characters/${character?.id}/inventory/items`}
            setSidebarVisibility={setSidebarVisibility}
          />
          <LinkSublistSidebar title="Reusables">
            <LinkSidebar
              title="Gadgets"
              path={`characters/${character?.id}/inventory/items/reusables/gadgets`}
              setSidebarVisibility={setSidebarVisibility}
            />
            <LinkSidebar
              title="Anomalies"
              path={`characters/${character?.id}/inventory/items/reusables/anomalies`}
              setSidebarVisibility={setSidebarVisibility}
            />
          </LinkSublistSidebar>
          <LinkSublistSidebar title="Consumables">
            <LinkSidebar
              title="Chemical therapy"
              path={`characters/${character?.id}/inventory/items/consumables/chemicalTherapy`}
              setSidebarVisibility={setSidebarVisibility}
            />
            <LinkSidebar
              title="Chemical assistance"
              path={`characters/${character?.id}/inventory/items/consumables/chemicalAssistance`}
              setSidebarVisibility={setSidebarVisibility}
            />
            <LinkSidebar
              title="Misc. consumables"
              path={`characters/${character?.id}/inventory/items/consumables/misc`}
              setSidebarVisibility={setSidebarVisibility}
            />
          </LinkSublistSidebar>
        </LinkSublistSidebar>
      </LinkListSidebar>
      <LinkListSidebar
        title={
          <>
            <VehicleIcon className="size-8" />
            <p className="text-inherit">Garage</p>
          </>
        }
      >
        <LinkSidebar
          title="Vehicles"
          path={`characters/${character?.id}/inventory/vehicles`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="Vehicle weapons"
          path={`characters/${character?.id}/inventory/vehicles/weapons`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="Vehicle mods"
          path={`characters/${character?.id}/inventory/vehicles/modifications`}
          setSidebarVisibility={setSidebarVisibility}
        />
      </LinkListSidebar>
    </>
  );
};

export default CharacterLinks;
