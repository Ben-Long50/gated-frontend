import BookIcon from '../icons/BookIcon';
import ArmorIcon from '../icons/ArmorIcon';
import CyberIcon from '../icons/CyberIcon';
import WeaponIcon from '../icons/WeaponIcon';
import LinkListSidebar from './LinkListSidebar';
import LinkSidebar from './LinkSidebar';
import ActionIcon from '../icons/ActionIcon';
import KeywordIcon from '../icons/KeywordIcon';
import PerkIcon from '../icons/PerkIcon';
import useBookQuery from '../../hooks/useBookQuery/useBookQuery';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import Loading from '../../components/Loading';

const CodexLinks = ({ setSidebarVisibility }) => {
  const { apiUrl, user } = useContext(AuthContext);

  const { data: bookEntries, isLoading, isPending } = useBookQuery(apiUrl);

  if (isLoading || isPending) {
    return <Loading />;
  }

  return (
    <>
      <LinkListSidebar
        title={
          <>
            <BookIcon className="size-8" />
            <p className="text-inherit">The Book</p>
          </>
        }
        numberOfEntries={bookEntries.length}
      >
        {bookEntries.map((entry) => {
          return (
            <LinkSidebar
              key={entry.id}
              title={entry.title[0].toUpperCase() + entry.title.slice(1)}
              path={`codex/book/${entry.title}`}
              setSidebarVisibility={setSidebarVisibility}
            />
          );
        })}
        {(user.role === 'ADMIN' || user.role === 'SUPERADMIN') && (
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
        {(user.role === 'ADMIN' || user.role === 'SUPERADMIN') && (
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
        {(user.role === 'ADMIN' || user.role === 'SUPERADMIN') && (
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
        {(user.role === 'ADMIN' || user.role === 'SUPERADMIN') && (
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
        {(user.role === 'ADMIN' || user.role === 'SUPERADMIN') && (
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
        {(user.role === 'ADMIN' || user.role === 'SUPERADMIN') && (
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
        {(user.role === 'ADMIN' || user.role === 'SUPERADMIN') && (
          <LinkSidebar
            title="Create a new action"
            path="codex/actions/create"
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
      </LinkListSidebar>
    </>
  );
};

export default CodexLinks;
