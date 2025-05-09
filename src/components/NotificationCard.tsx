import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import { format } from 'date-fns';
import { Notification } from 'src/types/notification';
import BtnRect from './buttons/BtnRect';
import { Link } from 'react-router-dom';
import AccountPicture from './AccountPicture';
import ArrowHeader2 from './ArrowHeader2';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import useDeleteNotificationMutation from '../hooks/useDeleteNotificationMutation/useDeleteNotificationMutation';
import { AuthContext } from '../contexts/AuthContext';

const NotificationCard = ({ notification }: { notification: Notification }) => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);

  const deleteNotification = useDeleteNotificationMutation(apiUrl);

  let notificationMessage;

  switch (notification.type) {
    case 'campaignInvite':
      notificationMessage =
        'has invited you to join a new campaign. Head to the pending campaigns page by clicking the button to view the details of the new campaign.';
      break;
    case 'sessionInvite':
      notificationMessage =
        'has invited you to join a new session. Head to the pending sessions page by clicking the button to view the details of the new session.';
      break;
    default:
      break;
  }

  return (
    <ThemeContainer
      className="w-full"
      chamfer="medium"
      borderColor={accentPrimary}
    >
      <div className="flex w-full flex-col gap-4 p-4 sm:p-6">
        <div className="flex w-full items-start justify-between">
          <div className="flex items-center justify-start">
            <ArrowHeader2 title="" />
            <AccountPicture user={notification.sender} />
            <h2 className="ml-4">
              {notification.sender.firstName +
                ' ' +
                notification.sender.lastName}
            </h2>
            <p className="!text-tertiary ml-8 italic">(Campaign Invitation)</p>
          </div>
          <div className="flex items-start gap-4 justify-self-end">
            <p className="whitespace-nowrap">
              {format(notification.createdAt, 'PP')}
            </p>
            <button
              aria-label="Delete notification"
              className="-mr-4 -mt-4"
              onClick={() => deleteNotification.mutate(notification.id)}
            >
              <Icon
                className="text-tertiary hover:text-accent timing size-8"
                path={mdiClose}
              />
            </button>
          </div>
        </div>
        <p>
          <span>
            {notification.sender.firstName +
              ' ' +
              notification.sender.lastName +
              ' '}
          </span>
          {notificationMessage}
        </p>
        <Link className="self-end" to={`/glam/campaigns?campaignType=pending`}>
          <BtnRect type="button" ariaLabel="Navigate to pending campaigns">
            Pending Campaigns
          </BtnRect>
        </Link>
      </div>
    </ThemeContainer>
  );
};

export default NotificationCard;
