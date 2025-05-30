import CharacterIcon from '../icons/CharacterIcon';
import LinkListSidebar from './LinkListSidebar';
import SubLinkSidebar from './SubLinkSidebar';
import InventoryIcon from '../../components/icons/InventoryIcon';
import EquipmentIcon from '../../components/icons/EquipmentIcon';
import LinkSublistSidebar from './LinkSublistSidebar';
import AffiliationIcon from '../icons/AffiliationIcon';
import HangarIcon from '../icons/HangarIcon';
import useCharacters from 'src/hooks/useCharacters';

const CharacterLinks = ({
  sidebarVisibility,
  setSidebarVisibility,
}: {
  sidebarVisibility: boolean;
  setSidebarVisibility: (mode: boolean) => void;
}) => {
  const { activeCharacter } = useCharacters();

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
          title="Create new activeCharacter"
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
          path={`characters/${activeCharacter?.id}/equipment`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Deployments"
          path={`characters/${activeCharacter?.id}/deployments`}
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
            path={`characters/${activeCharacter?.id}/inventory/weapons`}
            setSidebarVisibility={setSidebarVisibility}
          />
          <SubLinkSidebar
            title="Ranged Weapons"
            path={`characters/${activeCharacter?.id}/inventory/weapons?include=Ranged`}
            setSidebarVisibility={setSidebarVisibility}
          />
          <SubLinkSidebar
            title="Melee Weapons"
            path={`characters/${activeCharacter?.id}/inventory/weapons?include=Melee`}
            setSidebarVisibility={setSidebarVisibility}
          />
        </LinkSublistSidebar>
        <LinkSublistSidebar title="Armor">
          <SubLinkSidebar
            title="All Armor"
            path={`characters/${activeCharacter?.id}/inventory/armors`}
            setSidebarVisibility={setSidebarVisibility}
          />
          <SubLinkSidebar
            title="Head Armor"
            path={`characters/${activeCharacter?.id}/inventory/armors?include=Head`}
            setSidebarVisibility={setSidebarVisibility}
          />
          <SubLinkSidebar
            title="Body Armor"
            path={`characters/${activeCharacter?.id}/inventory/armors?include=Body`}
            setSidebarVisibility={setSidebarVisibility}
          />
          <SubLinkSidebar
            title="Cloak Armor"
            path={`characters/${activeCharacter?.id}/inventory/armors?include=Cloak`}
            setSidebarVisibility={setSidebarVisibility}
          />
        </LinkSublistSidebar>
        <LinkSublistSidebar title="Augmentations">
          <SubLinkSidebar
            title="Cybernetics"
            path={`characters/${activeCharacter?.id}/inventory/augmentations?augmentType=cybernetic`}
            setSidebarVisibility={setSidebarVisibility}
          />
          <SubLinkSidebar
            title="Mutations"
            path={`characters/${activeCharacter?.id}/inventory/augmentations?augmentType=mutation`}
            setSidebarVisibility={setSidebarVisibility}
          />
        </LinkSublistSidebar>
        <LinkSublistSidebar title="Items">
          <SubLinkSidebar
            title="Reusable Items"
            path={`characters/${activeCharacter?.id}/inventory/reusables`}
            setSidebarVisibility={setSidebarVisibility}
          />
          <SubLinkSidebar
            title="Consumable Items"
            path={`characters/${activeCharacter?.id}/inventory/consumables`}
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
          path={`characters/${activeCharacter?.id}/inventory/vehicles`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Drones"
          path={`characters/${activeCharacter?.id}/inventory/drones`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Vehicle Weapons"
          path={`characters/${activeCharacter?.id}/inventory/weapons?include=Vehicle Weapon`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Drone Weapons"
          path={`characters/${activeCharacter?.id}/inventory/weapons?include=Drone Weapon`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Modifications"
          path={`characters/${activeCharacter?.id}/inventory/modifications`}
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
          path={`characters/${activeCharacter?.id}/affiliations`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Create Affiliation"
          path={`characters/${activeCharacter?.id}/affiliations/create`}
          setSidebarVisibility={setSidebarVisibility}
        />
      </LinkListSidebar>
    </>
  );
};

export default CharacterLinks;
