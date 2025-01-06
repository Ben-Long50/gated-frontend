import { createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import useAccountQuery from '../hooks/useAccountQuery/useAccountQuery';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const authToken: string = Cookies.get('token') || '';
  const navigate = useNavigate();
  const isMobile = window.location.href.includes('192.168.4.94');

  const apiUrl = isMobile
    ? import.meta.env.VITE_LOCAL_BACKEND_URL
    : import.meta.env.VITE_API_URL;

  const { data: user } = useAccountQuery(apiUrl, authToken);

  useEffect(() => {
    if (authToken) {
      navigate('/glam/codex/book/create');
    } else {
      navigate('/signin');
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        apiUrl,
        authToken,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
