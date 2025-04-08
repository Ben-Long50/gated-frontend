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
import Loading from '../../components/Loading';
import useBookSectionsQuery from '../../hooks/useBookSectionsQuery/useBookSectionsQuery';
import LinkSublistSidebar from './LinkSublistSidebar';
import VehicleIcon from '../../components/icons/VehicleIcon';
import ConditionIcon from '../../components/icons/ConditionIcon';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import { LayoutContext } from '../../contexts/LayoutContext';
import SackIcon from '../../components/icons/SackIcon';
import LinkSidebar from './LinkSidebar';

const CodexLinks = ({
  sidebarVisibility,
  setSidebarVisibility,
}: {
  sidebarVisibility: boolean;
  setSidebarVisibility: (mode: boolean) => void;
}) => {
  const { apiUrl, user } = useContext(AuthContext);
  const { layoutSize } = useContext(LayoutContext);

  const {
    data: bookSections,
    isLoading,
    isPending,
  } = useBookSectionsQuery(apiUrl);

  if (isLoading || isPending) {
    return <Loading />;
  }

  return (
    <>
      <LinkSidebar
        title="Search codex"
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
            title="Manage book"
            path="codex/book/manage"
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Create entry"
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
          title="All weapons"
          path="codex/weapons"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Pistols"
          path="codex/weapons/pistols"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Shotguns"
          path="codex/weapons/shotguns"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="SMGs"
          path="codex/weapons/smgs"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Rifles"
          path="codex/weapons/rifles"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Heavy weapons"
          path="codex/weapons/heavyWeapons"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Melee weapons"
          path="codex/weapons/melee"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Launchers & explosives"
          path="codex/weapons/explosives"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Create a new weapon"
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
          title="All armor"
          path="codex/armor"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Basic armor"
          path="codex/armor/basic"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Power armor"
          path="codex/armor/power"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Create new armor"
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
          title="All cybernetics"
          path="codex/cybernetics"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Create a new cybernetic"
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
          title="All vehicles"
          path="codex/vehicles"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Vehicle weapons"
          path="codex/vehicles/weapons"
          setSidebarVisibility={setSidebarVisibility}
        />
        <SubLinkSidebar
          title="Vehicle mods"
          path="codex/vehicles/modifications"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <>
            <SubLinkSidebar
              title="Create a new vehicle"
              path="codex/vehicles/create"
              setSidebarVisibility={setSidebarVisibility}
            />
            <SubLinkSidebar
              title="Create a new mod"
              path="codex/vehicles/modifications/create"
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
        <LinkSublistSidebar title="Reusables">
          <SubLinkSidebar
            title="Gadgets"
            path="codex/items/reusables/gadgets"
            setSidebarVisibility={setSidebarVisibility}
          />
          <SubLinkSidebar
            title="Anomalies"
            path="codex/items/reusables/anomalies"
            setSidebarVisibility={setSidebarVisibility}
          />
        </LinkSublistSidebar>
        <LinkSublistSidebar title="Consumables">
          <SubLinkSidebar
            title="Chemical therapy"
            path="codex/items/consumables/chemicalTherapy"
            setSidebarVisibility={setSidebarVisibility}
          />
          <SubLinkSidebar
            title="Chemical assistance"
            path="codex/items/consumables/chemicalAssistance"
            setSidebarVisibility={setSidebarVisibility}
          />
          <SubLinkSidebar
            title="Misc. consumables"
            path="codex/items/consumables/misc"
            setSidebarVisibility={setSidebarVisibility}
          />
        </LinkSublistSidebar>
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <>
            <SubLinkSidebar
              title="Create a new item"
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
          title="All perks"
          path="codex/perks"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Create a new perk"
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
        title="Keywords"
      >
        <SubLinkSidebar
          title="All keywords"
          path="codex/keywords"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Create a new keyword"
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
          title="All actions"
          path="codex/actions"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <SubLinkSidebar
            title="Create a new action"
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
            title="Create a new condition"
            path="codex/conditions/create"
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
      </LinkListSidebar>
    </>
  );
};

export default CodexLinks;
