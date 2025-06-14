import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import LinkSidebar from './LinkSidebar';
import Icon from '@mdi/react';
import {
  mdiAccountOutline,
  mdiAccountTieOutline,
  mdiAccountWrenchOutline,
  mdiAlertCircleOutline,
  mdiBellOutline,
  mdiLogout,
} from '@mdi/js';
import useSignoutMutation from '../../hooks/useSignoutMutation/useSignoutMutation';
import LinkListSidebar from './LinkListSidebar';
import SubLinkSidebar from './SubLinkSidebar';

const AccountLinks = () => {
  const { apiUrl, user } = useContext(AuthContext);

  const signout = useSignoutMutation(apiUrl);

  return (
    <>
      <LinkSidebar
        path={`account/${user?.id}`}
        icon={
          <Icon
            path={mdiAccountOutline}
            className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit"
          />
        }
        title="Account Settings"
      />
      <LinkSidebar
        path={`account/${user?.id}/preferences`}
        icon={
          <Icon
            path={mdiAccountWrenchOutline}
            className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit"
          />
        }
        title="Account Preferences"
      />
      <LinkSidebar
        path={`account/${user?.id}/notifications`}
        icon={
          <Icon
            path={mdiBellOutline}
            className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit"
          />
        }
        title="Notifications"
      />
      {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
        <LinkListSidebar
          icon={
            <Icon
              path={mdiAccountTieOutline}
              className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit"
            />
          }
          title="Admin Tools"
        >
          <SubLinkSidebar
            path={`account/${user?.id}/patchNotes/create`}
            title="Create Patch Notes"
          />
          <SubLinkSidebar
            path={`account/${user?.id}/adminTools`}
            title="Error Reports"
          />
          <SubLinkSidebar
            path={`account/${user?.id}/userPermissions`}
            title="User Account Permissions"
          />
        </LinkListSidebar>
      )}
      <LinkSidebar
        path={`account/${user?.id}/errorReport`}
        icon={
          <Icon
            path={mdiAlertCircleOutline}
            className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit"
          />
        }
        title="Create Error Report"
      />
      <LinkSidebar
        path=""
        icon={
          <Icon
            path={mdiLogout}
            className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit"
          />
        }
        title="Sign Out"
        onClick={() => signout.mutate()}
      />
    </>
  );
};

export default AccountLinks;
