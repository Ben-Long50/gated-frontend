import BookIcon from '../icons/BookIcon';
import ArmorIcon from '../icons/ArmorIcon';
import CyberIcon from '../icons/CyberIcon';
import WeaponIcon from '../icons/WeaponIcon';
import LinkListSidebar from './LinkListSidebar';
import SubLinkSidebar from './SubLinkSidebar';
import ActionIcon from '../icons/ActionIcon';
import KeywordIcon from '../icons/KeywordIcon';
import PerkIcon from '../icons/PerkIcon';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import useBookSectionsQuery from '../../hooks/useBookSectionsQuery/useBookSectionsQuery';
import LinkSublistSidebar from './LinkSublistSidebar';
import VehicleIcon from '../../components/icons/VehicleIcon';
import ConditionIcon from '../../components/icons/ConditionIcon';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import SackIcon from '../../components/icons/SackIcon';
import LinkSidebar from './LinkSidebar';
import ModificationIcon from '../icons/ModificationIcon';
import DroneIcon from '../icons/DroneIcon';
import PotionIcon from '../icons/PotionIcon';
import { capitalCase } from 'change-case';

const CodexLinks = () => {
  const { apiUrl, user } = useContext(AuthContext);

  const { data: bookSections } = useBookSectionsQuery(apiUrl);

  return (
    <>
      <LinkSidebar
        title="Search Codex"
        icon={
          <Icon
            className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit"
            path={mdiMagnify}
            rotate={90}
          />
        }
        path="/glam/codex/search"
      />
      <LinkListSidebar
        icon={
          <BookIcon className="group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2" />
        }
        title="The Book"
      >
        {bookSections?.map((section) => {
          return (
            <LinkSublistSidebar
              key={section.id}
              title={capitalCase(section.title)}
            >
              {section.entries?.map((entry) => {
                return (
                  <SubLinkSidebar
                    key={entry.id}
                    title={capitalCase(entry.title)}
                    path={`codex/book/${entry.id}`}
                  />
                );
              })}
            </LinkSublistSidebar>
          );
        })}
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar title="Manage Book" path="codex/book/manage" />
        )}
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar title="Create Entry" path="codex/book/create" />
        )}
      </LinkListSidebar>
      <LinkListSidebar
        icon={
          <WeaponIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
        }
        title="Weapons"
      >
        <SubLinkSidebar
          title="All Weapons"
          path="codex/items/weapons?exclude=Vehicle Weapon&exclude=Drone Weapon"
        />
        <SubLinkSidebar
          title="Ranged Weapons"
          path="codex/items/weapons?include=Ranged&exclude=Vehicle Weapon&exclude=Drone Weapon"
        />
        <SubLinkSidebar
          title="Melee Weapons"
          path="codex/items/weapons/?include=Melee&exclude=Vehicle Weapon&exclude=Drone Weapon"
        />
        <SubLinkSidebar
          title="Consumable Weapons"
          path="codex/items/weapons?include=Consumable&include=Light Consumable&exclude=Vehicle Weapon&exclude=Drone Weapon"
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Create a New Weapon"
            path="codex/items/weapons/create"
          />
        )}
      </LinkListSidebar>
      <LinkListSidebar
        icon={
          <ArmorIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
        }
        title="Armor"
      >
        <SubLinkSidebar title="All Armor" path="codex/items/armors" />
        <SubLinkSidebar
          title="Head Armor"
          path="codex/items/armors/?include=Head"
        />
        <SubLinkSidebar
          title="Body Armor"
          path="codex/items/armors/?include=Body"
        />
        <SubLinkSidebar
          title="Cloak Armor"
          path="codex/items/armors/?include=Cloak"
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Create New Armor"
            path="codex/items/armors/create"
          />
        )}
      </LinkListSidebar>
      <LinkListSidebar
        icon={
          <CyberIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
        }
        title="Augmentations"
      >
        <SubLinkSidebar
          title="Cybernetics"
          path="codex/items/augmentations?augmentType=cybernetic"
        />
        <SubLinkSidebar
          title="Mutations"
          path="codex/items/augmentations?augmentType=mutation"
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Create a New Augmentation"
            path="codex/items/augmentations/create"
          />
        )}
      </LinkListSidebar>
      <LinkListSidebar
        icon={
          <VehicleIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
        }
        title="Vehicles"
      >
        <SubLinkSidebar title="All Vehicles" path="codex/items/vehicles" />
        <SubLinkSidebar
          title="Vehicle Weapons"
          path="codex/items/weapons?include=Vehicle Weapon"
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <>
            <SubLinkSidebar
              title="Create a New Vehicle"
              path="codex/items/vehicles/create"
            />
          </>
        )}
      </LinkListSidebar>
      <LinkListSidebar
        icon={
          <DroneIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
        }
        title="Drones"
      >
        <SubLinkSidebar title="All Drones" path="codex/items/drones" />
        <SubLinkSidebar
          title="Drone Weapons"
          path="codex/items/weapons?include=Drone Weapon"
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <>
            <SubLinkSidebar
              title="Create a New Drone"
              path="codex/items/drones/create"
            />
          </>
        )}
      </LinkListSidebar>
      <LinkListSidebar
        icon={
          <ModificationIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
        }
        title="Modifications"
      >
        <SubLinkSidebar
          title="All Modifications"
          path="codex/items/modifications"
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <>
            <SubLinkSidebar
              title="Create a New Modification"
              path="codex/items/modifications/create"
            />
          </>
        )}
      </LinkListSidebar>
      <LinkListSidebar
        icon={
          <SackIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
        }
        title="Reusable Items"
      >
        <SubLinkSidebar title="All Reusables" path="codex/items/reusables" />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <>
            <SubLinkSidebar
              title="Create a New Reusable"
              path="codex/items/reusables/create"
            />
          </>
        )}
      </LinkListSidebar>
      <LinkListSidebar
        icon={
          <PotionIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
        }
        title="Consumable Items"
      >
        <SubLinkSidebar
          title="All Consumables"
          path="codex/items/consumables"
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <>
            <SubLinkSidebar
              title="Create a New Consumable"
              path="codex/items/consumables/create"
            />
          </>
        )}
      </LinkListSidebar>
      <LinkListSidebar
        icon={
          <PerkIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
        }
        title="Perks"
      >
        <SubLinkSidebar title="All Perks" path="codex/perks" />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar title="Create a New Perk" path="codex/perks/create" />
        )}
      </LinkListSidebar>
      <LinkListSidebar
        icon={
          <KeywordIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
        }
        title="Traits"
      >
        <SubLinkSidebar title="All Traits" path="codex/keywords" />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Create a New Trait"
            path="codex/keywords/create"
          />
        )}
      </LinkListSidebar>
      <LinkListSidebar
        icon={
          <ActionIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
        }
        title="Actions"
      >
        <SubLinkSidebar title="All Actions" path="codex/actions" />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Create a New Action"
            path="codex/actions/create"
          />
        )}
      </LinkListSidebar>
      <LinkListSidebar
        icon={
          <ConditionIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
        }
        title="Conditions"
      >
        <SubLinkSidebar title="All conditions" path="codex/conditions" />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Create a New Condition"
            path="codex/conditions/create"
          />
        )}
      </LinkListSidebar>
    </>
  );
};

export default CodexLinks;
