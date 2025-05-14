import CharacterIcon from '../icons/CharacterIcon';
import LinkListSidebar from './LinkListSidebar';
import SubLinkSidebar from './SubLinkSidebar';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import useActiveCharacterQuery from '../../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import InventoryIcon from '../../components/icons/InventoryIcon';
import EquipmentIcon from '../../components/icons/EquipmentIcon';
import LinkSublistSidebar from './LinkSublistSidebar';
import AffiliationIcon from '../icons/AffiliationIcon';
import HangarIcon from '../icons/HangarIcon';

const CharacterLinks = ({
  sidebarVisibility,
  setSidebarVisibility,
}: {
  sidebarVisibility: boolean;
  setSidebarVisibility: (mode: boolean) => void;
}) => {
  const { apiUrl } = useContext(AuthContext);

  const { data: character } = useActiveCharacterQuery(apiUrl);

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
        <SubLinkSidebar
          title="Deployments"
          path={`characters/${character?.id}/deployments`}
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
        <LinkSublistSidebar title="Weapons">
          <SubLinkSidebar
            title="All Weapons"
            path={`characters/${character?.id}/inventory/weapons`}
            setSidebarVisibility={setSidebarVisibility}
          />
          <SubLinkSidebar
            title="Ranged Weapons"
            path={`characters/${character?.id}/inventory/weapons?include=Ranged`}
            setSidebarVisibility={setSidebarVisibility}
          />
          <SubLinkSidebar
            title="Melee Weapons"
            path={`characters/${character?.id}/inventory/weapons?include=Melee`}
            setSidebarVisibility={setSidebarVisibility}
          />
        </LinkSublistSidebar>
        <LinkSublistSidebar title="Armor">
          <SubLinkSidebar
            title="All Armor"
            path={`characters/${character?.id}/inventory/armor`}
            setSidebarVisibility={setSidebarVisibility}
          />
          <SubLinkSidebar
            title="Head Armor"
            path={`characters/${character?.id}/inventory/armor?include=Head`}
            setSidebarVisibility={setSidebarVisibility}
          />
          <SubLinkSidebar
            title="Body Armor"
            path={`characters/${character?.id}/inventory/armor?include=Body`}
            setSidebarVisibility={setSidebarVisibility}
          />
          <SubLinkSidebar
            title="Cloak Armor"
            path={`characters/${character?.id}/inventory/armor?include=Cloak`}
            setSidebarVisibility={setSidebarVisibility}
          />
        </LinkSublistSidebar>
        <LinkSublistSidebar title="Augmentations">
          <SubLinkSidebar
            title="All Augmentations"
            path={`characters/${character?.id}/inventory/cybernetics`}
            setSidebarVisibility={setSidebarVisibility}
          />
          <SubLinkSidebar
            title="Cybernetics"
            path={`characters/${character?.id}/inventory/cybernetics`}
            setSidebarVisibility={setSidebarVisibility}
          />
          <SubLinkSidebar
            title="Mutations"
            path={`characters/${character?.id}/inventory/mutations`}
            setSidebarVisibility={setSidebarVisibility}
          />
        </LinkSublistSidebar>
        <LinkSublistSidebar title="Items">
          <SubLinkSidebar
            title="All Items"
            path={`characters/${character?.id}/inventory/items`}
            setSidebarVisibility={setSidebarVisibility}
          />
          <SubLinkSidebar
            title="Reusables"
            path={`characters/${character?.id}/inventory/items?include=reusable`}
            setSidebarVisibility={setSidebarVisibility}
          />
          <SubLinkSidebar
            title="Consumables"
            path={`characters/${character?.id}/inventory/items?include=consumable`}
            setSidebarVisibility={setSidebarVisibility}
          />
        </LinkSublistSidebar>
      </LinkListSidebar>
      <LinkListSidebar
        sidebarVisibility={sidebarVisibility}
        icon={<HangarIcon className="bg-secondary z-10 size-12 shrink-0 p-2" />}
        title="Garage"
      >
        <SubLinkSidebar
          title="Vehicles"
          path={`characters/${character?.id}/inventory/vehicles`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Drones"
          path={`characters/${character?.id}/inventory/drones`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Vehicle Weapons"
          path={`characters/${character?.id}/inventory/weapons?include=Vehicle Weapon`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Drone Weapons"
          path={`characters/${character?.id}/inventory/weapons?include=Drone Weapon`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Modifications"
          path={`characters/${character?.id}/inventory/modifications`}
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
