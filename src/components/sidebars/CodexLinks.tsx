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

const CodexLinks = ({
  sidebarVisibility,
  setSidebarVisibility,
}: {
  sidebarVisibility: boolean;
  setSidebarVisibility: (mode: boolean) => void;
}) => {
  const { apiUrl, user } = useContext(AuthContext);

  const {
    data: bookSections,
    isLoading,
    isPending,
  } = useBookSectionsQuery(apiUrl);

  if (isLoading || isPending) {
    return <span></span>;
  }

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
        sidebarVisibility={sidebarVisibility}
        setSidebarVisibility={setSidebarVisibility}
      />
      <LinkListSidebar
        sidebarVisibility={sidebarVisibility}
        icon={
          <BookIcon className="group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2" />
        }
        title="The Book"
      >
        {bookSections?.map((section) => {
          return (
            <LinkSublistSidebar
              key={section.id}
              title={section.title[0].toUpperCase() + section.title.slice(1)}
            >
              {section.entries?.map((entry) => {
                return (
                  <SubLinkSidebar
                    key={entry.id}
                    title={entry.title[0].toUpperCase() + entry.title.slice(1)}
                    path={`codex/book/${entry.id}`}
                    setSidebarVisibility={setSidebarVisibility}
                  />
                );
              })}
            </LinkSublistSidebar>
          );
        })}
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Manage Book"
            path="codex/book/manage"
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Create Entry"
            path="codex/book/create"
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
      </LinkListSidebar>
      <LinkListSidebar
        sidebarVisibility={sidebarVisibility}
        icon={<WeaponIcon className="bg-secondary z-10 size-12 shrink-0 p-2" />}
        title="Weapons"
      >
        <SubLinkSidebar
          title="All Weapons"
          path="codex/weapons"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Ranged Weapons"
          path="codex/weapons?include=Ranged"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Melee Weapons"
          path="codex/weapons/?include=Melee"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Consumable Weapons"
          path="codex/weapons?include=Grenade&include=Mine"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Create a New Weapon"
            path="codex/weapons/create"
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
      </LinkListSidebar>
      <LinkListSidebar
        sidebarVisibility={sidebarVisibility}
        icon={<ArmorIcon className="bg-secondary z-10 size-12 shrink-0 p-2" />}
        title="Armor"
      >
        <SubLinkSidebar
          title="All Armor"
          path="codex/armor"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Basic Armor"
          path="codex/armor/?include=Armor&exclude=Power"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Power Armor"
          path="codex/armor/?include=Power"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Sanity Armor"
          path="codex/armor/?include=Sanity"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Create New Armor"
            path="codex/armor/create"
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
      </LinkListSidebar>
      <LinkListSidebar
        sidebarVisibility={sidebarVisibility}
        icon={<CyberIcon className="bg-secondary z-10 size-12 shrink-0 p-2" />}
        title="Cybernetics"
      >
        <SubLinkSidebar
          title="All Cybernetics"
          path="codex/cybernetics"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Create a New Cybernetic"
            path="codex/cybernetics/create"
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
      </LinkListSidebar>
      <LinkListSidebar
        sidebarVisibility={sidebarVisibility}
        icon={
          <VehicleIcon className="bg-secondary z-10 size-12 shrink-0 p-2" />
        }
        title="Vehicles"
      >
        <SubLinkSidebar
          title="All Vehicles"
          path="codex/vehicles"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Vehicle Weapons"
          path="codex/weapons?include=Vehicle"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <>
            <SubLinkSidebar
              title="Create a New Vehicle"
              path="codex/vehicles/create"
              setSidebarVisibility={setSidebarVisibility}
            />
          </>
        )}
      </LinkListSidebar>
      <LinkListSidebar
        sidebarVisibility={sidebarVisibility}
        icon={<DroneIcon className="bg-secondary z-10 size-12 shrink-0 p-2" />}
        title="Drones"
      >
        <SubLinkSidebar
          title="All Drones"
          path="codex/drones"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Drone Weapons"
          path="codex/weapons?include=Drone"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <>
            <SubLinkSidebar
              title="Create a New Drone"
              path="codex/drones/create"
              setSidebarVisibility={setSidebarVisibility}
            />
          </>
        )}
      </LinkListSidebar>
      <LinkListSidebar
        sidebarVisibility={sidebarVisibility}
        icon={
          <ModificationIcon className="bg-secondary z-10 size-12 shrink-0 p-2" />
        }
        title="Modifications"
      >
        <SubLinkSidebar
          title="All Modifications"
          path="codex/modifications"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <>
            <SubLinkSidebar
              title="Create a New Modification"
              path="codex/modifications/create"
              setSidebarVisibility={setSidebarVisibility}
            />
          </>
        )}
      </LinkListSidebar>
      <LinkListSidebar
        sidebarVisibility={sidebarVisibility}
        icon={<SackIcon className="bg-secondary z-10 size-12 shrink-0 p-2" />}
        title="Items"
      >
        <SubLinkSidebar
          title="All Items"
          path="codex/items"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Reusables"
          path="codex/items?include=reusable"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Consumables"
          path="codex/items?include=consumable"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <>
            <SubLinkSidebar
              title="Create a New Item"
              path="codex/items/create"
              setSidebarVisibility={setSidebarVisibility}
            />
          </>
        )}
      </LinkListSidebar>
      <LinkListSidebar
        sidebarVisibility={sidebarVisibility}
        icon={<PerkIcon className="bg-secondary z-10 size-12 shrink-0 p-2" />}
        title="Perks"
      >
        <SubLinkSidebar
          title="All Perks"
          path="codex/perks"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Create a New Perk"
            path="codex/perks/create"
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
      </LinkListSidebar>
      <LinkListSidebar
        sidebarVisibility={sidebarVisibility}
        icon={
          <KeywordIcon className="bg-secondary z-10 size-12 shrink-0 p-2" />
        }
        title="Traits"
      >
        <SubLinkSidebar
          title="All Traits"
          path="codex/keywords"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Create a New Trait"
            path="codex/keywords/create"
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
      </LinkListSidebar>
      <LinkListSidebar
        sidebarVisibility={sidebarVisibility}
        icon={<ActionIcon className="bg-secondary z-10 size-12 shrink-0 p-2" />}
        title="Actions"
      >
        <SubLinkSidebar
          title="All Actions"
          path="codex/actions"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Create a New Action"
            path="codex/actions/create"
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
      </LinkListSidebar>
      <LinkListSidebar
        sidebarVisibility={sidebarVisibility}
        icon={
          <ConditionIcon className="bg-secondary z-10 size-12 shrink-0 p-2" />
        }
        title="Conditions"
      >
        <SubLinkSidebar
          title="All conditions"
          path="codex/conditions"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Create a New Condition"
            path="codex/conditions/create"
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
      </LinkListSidebar>
    </>
  );
};

export default CodexLinks;
