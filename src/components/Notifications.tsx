import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import NotificationCard from './NotificationCard';
import useNotificationQuery from '../hooks/useNotificationQuery/useNotificationQuery';
import Loading from './Loading';
import { Notification } from 'src/types/notification';

const Notifications = () => {
  const { apiUrl, user } = useContext(AuthContext);

  const {
    data: notifications,
    isLoading,
    isPending,
  } = useNotificationQuery(apiUrl);

  if (isLoading || isPending) return <Loading />;
  return (
    <div className="flex w-full max-w-5xl flex-col items-center justify-start gap-8">
      <h1>Notificatons</h1>
      {notifications.map((notification: Notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default Notifications;
