import { useQuery } from '@tanstack/react-query';
import getErrorReports from './getErrorReports';

const useErrorReportsQuery = (apiUrl: string) => {
  return useQuery({
    queryKey: ['errorReports'],
    queryFn: async () => await getErrorReports(apiUrl),
  });
};

export default useErrorReportsQuery;
