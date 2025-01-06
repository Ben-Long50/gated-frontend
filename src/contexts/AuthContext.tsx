import { createContext } from 'react';
import useAccountQuery from '../hooks/useAccountQuery/useAccountQuery';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const isMobile = window.location.href.includes('192.168.4.94');

  const apiUrl = isMobile
    ? import.meta.env.VITE_LOCAL_BACKEND_URL
    : import.meta.env.VITE_API_URL;

  const { data: user } = useAccountQuery(apiUrl);

  return (
    <AuthContext.Provider
      value={{
        apiUrl,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
