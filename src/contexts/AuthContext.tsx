import { createContext, useEffect } from 'react';
import useAccountQuery from '../hooks/useAccountQuery/useAccountQuery';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isMobile = window.location.href.includes('192.168.4.94');

  const apiUrl = isMobile
    ? import.meta.env.VITE_LOCAL_BACKEND_URL
    : import.meta.env.VITE_API_URL;

  const {
    data: user,
    isError,
    isSuccess,
    isLoading,
    isPending,
  } = useAccountQuery(apiUrl);

  useEffect(() => {
    if (
      (isSuccess && pathname === '/signin') ||
      (isSuccess && pathname === '/signup')
    ) {
      navigate('/glam/codex/');
    } else if (isError) {
      navigate('/signin');
    }
  }, [isSuccess, isError]);

  if (isLoading || isPending) {
    return <Loading />;
  }

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
