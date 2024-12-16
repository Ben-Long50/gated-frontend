import { QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import queryClient from './queryClient';
import ThemeProvider from './contexts/ThemeContext';
import AuthProvider from './contexts/AuthContext';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
