import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import useAccountQuery from '../hooks/useAccountQuery/useAccountQuery';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();
  const isMobile = window.location.href.includes('192.168.4.94');

  const apiUrl = isMobile
    ? import.meta.env.VITE_LOCAL_BACKEND_URL
    : import.meta.env.VITE_API_URL;

  const user = useAccountQuery(apiUrl, authToken);

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      setAuthToken(token);
      navigate('/home');
    } else {
      setAuthToken(null);
      navigate('/signin');
    }
  }, []);

  // if (user.isPending) {
  //   return <span></span>;
  // }

  return (
    <AuthContext.Provider
      value={{
        apiUrl,
        authToken,
        setAuthToken,
        user: user.data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
