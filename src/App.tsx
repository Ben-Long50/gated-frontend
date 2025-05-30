import { QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import queryClient from './queryClient';
import ThemeProvider from './contexts/ThemeContext';
import AuthProvider from './contexts/AuthContext';
import LayoutProvider from './contexts/LayoutContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <LayoutProvider>
            <Outlet />
          </LayoutProvider>
        </AuthProvider>
      </ThemeProvider>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export default App;
