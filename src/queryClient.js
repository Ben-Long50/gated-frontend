import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: 1000 * 60 * 10,
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      throwOnError: true,
    },
    mutations: {
      throwOnError: true,
    },
  },
});

export default queryClient;
