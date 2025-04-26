import CharacterIcon from '../icons/CharacterIcon';
import LinkListSidebar from './LinkListSidebar';
import SubLinkSidebar from './SubLinkSidebar';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Loading from '../Loading';
import useActiveCharacterQuery from '../../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import InventoryIcon from '../../components/icons/InventoryIcon';
import EquipmentIcon from '../../components/icons/EquipmentIcon';
import VehicleIcon from '../../components/icons/VehicleIcon';
import LinkSublistSidebar from './LinkSublistSidebar';
import LinkSidebar from './LinkSidebar';
import AffiliationIcon from '../icons/AffiliationIcon';

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

  if (isLoading || isPending) return <span></span>;

  return (
    <>
      <LinkListSidebar
        sidebarVisibility={sidebarVisibility}
        icon={
          <CharacterIcon className="bg-secondary z-10 size-12 shrink-0 p-2" />
        }
        title="Characters"
      >
        <SubLinkSidebar
          title="All characters"
          path="characters"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Player characters"
          path="characters/playerCharacters"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Non-player characters"
          path="characters/nonPlayerCharacters"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Create new character"
          path="characters/create"
          setSidebarVisibility={setSidebarVisibility}
        />
      </LinkListSidebar>
      <LinkListSidebar
        sidebarVisibility={sidebarVisibility}
        icon={
          <EquipmentIcon className="bg-secondary z-10 size-12 shrink-0 p-2" />
        }
        title="Equipment"
      >
        <SubLinkSidebar
          title="Equipment"
          path={`characters/${character?.id}/equipment`}
          setSidebarVisibility={setSidebarVisibility}
        />
      </LinkListSidebar>
      <LinkListSidebar
        sidebarVisibility={sidebarVisibility}
        icon={
          <InventoryIcon className="bg-secondary z-10 size-12 shrink-0 p-2" />
        }
        title="Inventory"
      >
        <SubLinkSidebar
          title="Weapons"
          path={`characters/${character?.id}/inventory/weapons`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Armor"
          path={`characters/${character?.id}/inventory/armor`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Cybernetics"
          path={`characters/${character?.id}/inventory/cybernetics`}
          setSidebarVisibility={setSidebarVisibility}
        />

        <LinkSublistSidebar title="Items">
          <SubLinkSidebar
            title="All Items"
            path={`characters/${character?.id}/inventory/items`}
            setSidebarVisibility={setSidebarVisibility}
          />
          <LinkSublistSidebar title="Reusables">
            <SubLinkSidebar
              title="Gadgets"
              path={`characters/${character?.id}/inventory/items/reusables/gadgets`}
              setSidebarVisibility={setSidebarVisibility}
            />
            <SubLinkSidebar
              title="Anomalies"
              path={`characters/${character?.id}/inventory/items/reusables/anomalies`}
              setSidebarVisibility={setSidebarVisibility}
            />
          </LinkSublistSidebar>
          <LinkSublistSidebar title="Consumables">
            <SubLinkSidebar
              title="Chemical therapy"
              path={`characters/${character?.id}/inventory/items/consumables/chemicalTherapy`}
              setSidebarVisibility={setSidebarVisibility}
            />
            <SubLinkSidebar
              title="Chemical assistance"
              path={`characters/${character?.id}/inventory/items/consumables/chemicalAssistance`}
              setSidebarVisibility={setSidebarVisibility}
            />
            <SubLinkSidebar
              title="Misc. consumables"
              path={`characters/${character?.id}/inventory/items/consumables/misc`}
              setSidebarVisibility={setSidebarVisibility}
            />
          </LinkSublistSidebar>
        </LinkSublistSidebar>
      </LinkListSidebar>
      <LinkListSidebar
        sidebarVisibility={sidebarVisibility}
        icon={
          <VehicleIcon className="bg-secondary z-10 size-12 shrink-0 p-2" />
        }
        title="Vehicles"
      >
        <SubLinkSidebar
          title="Vehicles"
          path={`characters/${character?.id}/inventory/vehicles`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Vehicle weapons"
          path={`characters/${character?.id}/inventory/vehicles/weapons`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Vehicle mods"
          path={`characters/${character?.id}/inventory/vehicles/modifications`}
          setSidebarVisibility={setSidebarVisibility}
        />
      </LinkListSidebar>
      <LinkListSidebar
        icon={
          <AffiliationIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
        }
        title="Affiliations"
        sidebarVisibility={sidebarVisibility}
      >
        <SubLinkSidebar
          title="Existing Affiliations"
          path={`characters/${character?.id}/affiliations`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Create Affiliation"
          path={`characters/${character?.id}/affiliations/create`}
          setSidebarVisibility={setSidebarVisibility}
        />
      </LinkListSidebar>
    </>
  );
};

export default CharacterLinks;
