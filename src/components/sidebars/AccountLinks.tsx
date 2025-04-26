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
  mdiLockOpenOutline,
  mdiLogout,
} from '@mdi/js';
import useSignoutMutation from '../../hooks/useSignoutMutation/useSignoutMutation';
import LinkListSidebar from './LinkListSidebar';
import ConditionIcon from '../icons/ConditionIcon';

const AccountLinks = ({
  sidebarVisibility,
  setSidebarVisibility,
}: {
  sidebarVisibility: boolean;
  setSidebarVisibility: (mode: boolean) => void;
}) => {
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
        sidebarVisibility={sidebarVisibility}
        setSidebarVisibility={setSidebarVisibility}
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
        sidebarVisibility={sidebarVisibility}
        setSidebarVisibility={setSidebarVisibility}
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
        sidebarVisibility={sidebarVisibility}
        setSidebarVisibility={setSidebarVisibility}
      />
      {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
        <LinkListSidebar
          sidebarVisibility={sidebarVisibility}
          icon={
            <Icon
              path={mdiAccountTieOutline}
              className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit"
            />
          }
          title="Admin Tools"
        >
          <LinkSidebar
            path={`account/${user?.id}/adminTools`}
            title="Error Reports"
            icon={
              <Icon
                path={mdiAlertCircleOutline}
                className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit"
              />
            }
            sidebarVisibility={sidebarVisibility}
            setSidebarVisibility={setSidebarVisibility}
          />
          <LinkSidebar
            path={`account/${user?.id}/adminTools`}
            title="User Account Permissions"
            icon={
              <Icon
                path={mdiLockOpenOutline}
                className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit"
              />
            }
            sidebarVisibility={sidebarVisibility}
            setSidebarVisibility={setSidebarVisibility}
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
        sidebarVisibility={sidebarVisibility}
        setSidebarVisibility={setSidebarVisibility}
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
        sidebarVisibility={sidebarVisibility}
        setSidebarVisibility={setSidebarVisibility}
        onClick={() => signout.mutate()}
      />
    </>
  );
};

export default AccountLinks;
