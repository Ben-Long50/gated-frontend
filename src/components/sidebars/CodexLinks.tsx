import BookIcon from '../icons/BookIcon';
import ArmorIcon from '../icons/ArmorIcon';
import CyberIcon from '../icons/CyberIcon';
import WeaponIcon from '../icons/WeaponIcon';
import LinkListSidebar from './LinkListSidebar';
import LinkSidebar from './LinkSidebar';
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
import { NavLink } from 'react-router-dom';
import { LayoutContext } from '../../contexts/LayoutContext';
import PotionIcon from '../../components/icons/PotionIcon';
import GadgetIcon from '../../components/icons/GadgetIcon';
import SackIcon from '../../components/icons/SackIcon';

const CodexLinks = ({
  setSidebarVisibility,
}: {
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
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'text-accent group flex gap-6 p-2 pl-4'
            : 'text-secondary group flex gap-6 p-2 pl-4'
        }
        to="/glam/codex/search"
        end
      >
        <Icon
          className="timing group-hover:text-accent size-8 shrink-0 text-inherit"
          path={mdiMagnify}
          rotate={90}
        />
        <button
          className="w-full text-left text-inherit"
          onClick={() => {
            if (layoutSize !== 'large') {
              setSidebarVisibility(false);
            }
          }}
        >
          <div className="timing group-hover:text-accent text-xl tracking-wide text-inherit">
            Search codex
          </div>
        </button>
      </NavLink>
      <LinkListSidebar
        title={
          <>
            <BookIcon className="size-8" />
            <p className="text-inherit">The Book</p>
          </>
        }
      >
        {bookSections?.map((section) => {
          return (
            <LinkSublistSidebar
              key={section.id}
              title={section.title[0].toUpperCase() + section.title.slice(1)}
            >
              {section.entries?.map((entry) => {
                return (
                  <LinkSidebar
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
          <LinkSidebar
            title="Manage book"
            path="codex/book/manage"
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <LinkSidebar
            title="Create entry"
            path="codex/book/create"
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
      </LinkListSidebar>
      <LinkListSidebar
        title={
          <>
            <WeaponIcon className="size-8" />
            <p className="text-inherit">Weapons</p>
          </>
        }
      >
        <LinkSidebar
          title="All weapons"
          path="codex/weapons"
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="Pistols"
          path="codex/weapons/pistols"
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="Shotguns"
          path="codex/weapons/shotguns"
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="SMGs"
          path="codex/weapons/smgs"
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="Rifles"
          path="codex/weapons/rifles"
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="Heavy weapons"
          path="codex/weapons/heavyWeapons"
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="Melee weapons"
          path="codex/weapons/melee"
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="Launchers & explosives"
          path="codex/weapons/explosives"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <LinkSidebar
            title="Create a new weapon"
            path="codex/weapons/create"
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
      </LinkListSidebar>
      <LinkListSidebar
        title={
          <>
            <ArmorIcon className="size-8" />
            <p className="text-inherit">Armor</p>
          </>
        }
      >
        <LinkSidebar
          title="All armor"
          path="codex/armor"
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="Basic armor"
          path="codex/armor/basic"
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="Power armor"
          path="codex/armor/power"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <LinkSidebar
            title="Create new armor"
            path="codex/armor/create"
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
      </LinkListSidebar>
      <LinkListSidebar
        title={
          <>
            <CyberIcon className="size-8" />
            <p className="text-inherit">Cybernetics</p>
          </>
        }
      >
        <LinkSidebar
          title="All cybernetics"
          path="codex/cybernetics"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <LinkSidebar
            title="Create a new cybernetic"
            path="codex/cybernetics/create"
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
      </LinkListSidebar>
      <LinkListSidebar
        title={
          <>
            <VehicleIcon className="size-8" />
            <p className="text-inherit">Vehicles</p>
          </>
        }
      >
        <LinkSidebar
          title="All vehicles"
          path="codex/vehicles"
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="Vehicle weapons"
          path="codex/vehicles/weapons"
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="Vehicle mods"
          path="codex/vehicles/modifications"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <>
            <LinkSidebar
              title="Create a new vehicle"
              path="codex/vehicles/create"
              setSidebarVisibility={setSidebarVisibility}
            />
            <LinkSidebar
              title="Create a new mod"
              path="codex/vehicles/modifications/create"
              setSidebarVisibility={setSidebarVisibility}
            />
          </>
        )}
      </LinkListSidebar>
      <LinkListSidebar
        title={
          <>
            <SackIcon className="size-8" />
            <p className="text-inherit">Items</p>
          </>
        }
      >
        <LinkSidebar
          title="All Items"
          path="codex/items"
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSublistSidebar
          title="Reusables"
          icon={<GadgetIcon className="size-8" />}
        >
          <LinkSidebar
            title="Gadgets"
            path="codex/items/reusables/gadgets"
            setSidebarVisibility={setSidebarVisibility}
          />
          <LinkSidebar
            title="Anomalies"
            path="codex/items/reusables/anomalies"
            setSidebarVisibility={setSidebarVisibility}
          />
        </LinkSublistSidebar>
        <LinkSublistSidebar
          title="Consumables"
          icon={<PotionIcon className="size-8" />}
        >
          <LinkSidebar
            title="Chemical therapy"
            path="codex/items/consumables/chemicalTherapy"
            setSidebarVisibility={setSidebarVisibility}
          />
          <LinkSidebar
            title="Chemical assistance"
            path="codex/items/consumables/chemicalAssistance"
            setSidebarVisibility={setSidebarVisibility}
          />
          <LinkSidebar
            title="Misc. consumables"
            path="codex/items/consumables/misc"
            setSidebarVisibility={setSidebarVisibility}
          />
        </LinkSublistSidebar>
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <>
            <LinkSidebar
              title="Create a new item"
              path="codex/items/create"
              setSidebarVisibility={setSidebarVisibility}
            />
          </>
        )}
      </LinkListSidebar>
      <LinkListSidebar
        title={
          <>
            <PerkIcon className="size-8" />
            <p className="text-inherit">Perks</p>
          </>
        }
      >
        <LinkSidebar
          title="All perks"
          path="codex/perks"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <LinkSidebar
            title="Create a new perk"
            path="codex/perks/create"
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
      </LinkListSidebar>
      <LinkListSidebar
        title={
          <>
            <KeywordIcon className="size-8" />
            <p className="text-inherit">Keywords</p>
          </>
        }
      >
        <LinkSidebar
          title="All keywords"
          path="codex/keywords"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <LinkSidebar
            title="Create a new keyword"
            path="codex/keywords/create"
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
      </LinkListSidebar>
      <LinkListSidebar
        title={
          <>
            <ActionIcon className="size-8" />
            <p className="text-inherit">Actions</p>
          </>
        }
      >
        <LinkSidebar
          title="All actions"
          path="codex/actions"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <LinkSidebar
            title="Create a new action"
            path="codex/actions/create"
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
      </LinkListSidebar>
      <LinkListSidebar
        title={
          <>
            <ConditionIcon className="size-8" />
            <p className="text-inherit">Conditions</p>
          </>
        }
      >
        <LinkSidebar
          title="All conditions"
          path="codex/conditions"
          setSidebarVisibility={setSidebarVisibility}
        />
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <LinkSidebar
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
