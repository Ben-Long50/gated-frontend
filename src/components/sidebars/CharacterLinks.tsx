import CharacterIcon from '../icons/CharacterIcon';
import LinkListSidebar from './LinkListSidebar';
import SubLinkSidebar from './SubLinkSidebar';
import InventoryIcon from '../../components/icons/InventoryIcon';
import EquipmentIcon from '../../components/icons/EquipmentIcon';
import LinkSublistSidebar from './LinkSublistSidebar';
import AffiliationIcon from '../icons/AffiliationIcon';
import HangarIcon from '../icons/HangarIcon';
import useCharacters from 'src/hooks/useCharacters';

const CharacterLinks = () => {
  const { activeCharacter } = useCharacters();

  return (
    <>
      <LinkListSidebar
        icon={
          <CharacterIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
        }
        title="Characters"
      >
        <SubLinkSidebar title="All Characters" path="characters" />
        <SubLinkSidebar title="Create New Character" path="characters/create" />
      </LinkListSidebar>
      <LinkListSidebar
        icon={
          <EquipmentIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
        }
        title="Equipment"
      >
        <SubLinkSidebar
          title="Equipment"
          path={`characters/${activeCharacter?.id}/equipment`}
        />
        <SubLinkSidebar
          title="Deployments"
          path={`characters/${activeCharacter?.id}/deployments`}
        />
      </LinkListSidebar>
      <LinkListSidebar
        icon={
          <InventoryIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
        }
        title="Inventory"
      >
        <LinkSublistSidebar title="Weapons">
          <SubLinkSidebar
            title="All Weapons"
            path={`characters/${activeCharacter?.id}/inventory/weapons`}
          />
          <SubLinkSidebar
            title="Ranged Weapons"
            path={`characters/${activeCharacter?.id}/inventory/weapons?include=Ranged`}
          />
          <SubLinkSidebar
            title="Melee Weapons"
            path={`characters/${activeCharacter?.id}/inventory/weapons?include=Melee`}
          />
        </LinkSublistSidebar>
        <LinkSublistSidebar title="Armor">
          <SubLinkSidebar
            title="All Armor"
            path={`characters/${activeCharacter?.id}/inventory/armors`}
          />
          <SubLinkSidebar
            title="Head Armor"
            path={`characters/${activeCharacter?.id}/inventory/armors?include=Head`}
          />
          <SubLinkSidebar
            title="Body Armor"
            path={`characters/${activeCharacter?.id}/inventory/armors?include=Body`}
          />
          <SubLinkSidebar
            title="Cloak Armor"
            path={`characters/${activeCharacter?.id}/inventory/armors?include=Cloak`}
          />
        </LinkSublistSidebar>
        <LinkSublistSidebar title="Augmentations">
          <SubLinkSidebar
            title="Cybernetics"
            path={`characters/${activeCharacter?.id}/inventory/augmentations?augmentType=cybernetic`}
          />
          <SubLinkSidebar
            title="Mutations"
            path={`characters/${activeCharacter?.id}/inventory/augmentations?augmentType=mutation`}
          />
        </LinkSublistSidebar>
        <LinkSublistSidebar title="Items">
          <SubLinkSidebar
            title="Reusable Items"
            path={`characters/${activeCharacter?.id}/inventory/reusables`}
          />
          <SubLinkSidebar
            title="Consumable Items"
            path={`characters/${activeCharacter?.id}/inventory/consumables`}
          />
        </LinkSublistSidebar>
      </LinkListSidebar>
      <LinkListSidebar
        icon={
          <HangarIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
        }
        title="Garage"
      >
        <SubLinkSidebar
          title="Vehicles"
          path={`characters/${activeCharacter?.id}/inventory/vehicles`}
        />
        <SubLinkSidebar
          title="Drones"
          path={`characters/${activeCharacter?.id}/inventory/drones`}
        />
        <SubLinkSidebar
          title="Vehicle Weapons"
          path={`characters/${activeCharacter?.id}/inventory/weapons?include=Vehicle Weapon`}
        />
        <SubLinkSidebar
          title="Drone Weapons"
          path={`characters/${activeCharacter?.id}/inventory/weapons?include=Drone Weapon`}
        />
        <SubLinkSidebar
          title="Modifications"
          path={`characters/${activeCharacter?.id}/inventory/modifications`}
        />
      </LinkListSidebar>
      <LinkListSidebar
        icon={
          <AffiliationIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
        }
        title="Affiliations"
      >
        <SubLinkSidebar
          title="Existing Affiliations"
          path={`characters/${activeCharacter?.id}/affiliations`}
        />
        <SubLinkSidebar
          title="Create Affiliation"
          path={`characters/${activeCharacter?.id}/affiliations/create`}
        />
      </LinkListSidebar>
    </>
  );
};

export default CharacterLinks;
