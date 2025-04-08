import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Notifications = () => {
  const { apiUrl, user } = useContext(AuthContext);

  return (
    <div className="flex w-full max-w-5xl flex-col items-center justify-start gap-8">
      <h1>Notificatons</h1>
    </div>
  );
};

export default Notifications;
