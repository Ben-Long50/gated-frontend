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

const CharacterLinks = ({
  sidebarVisibility,
  setSidebarVisibility,
}: {
  sidebarVisibility: boolean;
  setSidebarVisibility: (mode: boolean) => void;
}) => {
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
        sidebarVisibility={sidebarVisibility}
        icon={<CharacterIcon className="size-8 shrink-0" />}
        title="Characters"
      >
        <LinkSidebar
          title="All characters"
          path="characters"
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="Player characters"
          path="characters/playerCharacters"
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="Non-player characters"
          path="characters/nonPlayerCharacters"
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="Create new character"
          path="characters/create"
          setSidebarVisibility={setSidebarVisibility}
        />
      </LinkListSidebar>
      <LinkListSidebar
        sidebarVisibility={sidebarVisibility}
        icon={<EquipmentIcon className="size-8 shrink-0" />}
        title="Equipment"
      >
        <LinkSidebar
          title="Equipment"
          path={`characters/${character?.id}/equipment`}
          setSidebarVisibility={setSidebarVisibility}
        />
      </LinkListSidebar>
      <LinkListSidebar
        sidebarVisibility={sidebarVisibility}
        icon={<InventoryIcon className="size-8 shrink-0" />}
        title="Inventory"
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
        sidebarVisibility={sidebarVisibility}
        icon={<VehicleIcon className="size-8 shrink-0" />}
        title="Vehicles"
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
