import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import NotificationCard from './NotificationCard';
import useNotificationQuery from '../hooks/useNotificationQuery/useNotificationQuery';
import Loading from './Loading';
import { Notification } from 'src/types/notification';
import useMarkNotificationsReadMutation from 'src/hooks/useMarkNotificationsReadMutation/useMarkNotificationsReadMutation';

const Notifications = () => {
  const { apiUrl } = useContext(AuthContext);

  const {
    data: notifications,
    isLoading,
    isPending,
  } = useNotificationQuery(apiUrl);

  const markNotificationsRead = useMarkNotificationsReadMutation(apiUrl);

  useEffect(() => {
    markNotificationsRead.mutate();
  }, []);

  if (isLoading || isPending) return <Loading />;

  if (notifications.length === 0) {
    return (
      <div className="flex w-full max-w-5xl flex-col items-center justify-start gap-8">
        <h1>Notificatons</h1>
        <h3>You're all caught up</h3>
      </div>
    );
  }

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
