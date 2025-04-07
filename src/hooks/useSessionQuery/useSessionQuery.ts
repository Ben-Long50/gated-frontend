import { useQuery } from '@tanstack/react-query';
import getSession from './getSession';

const useSessionQuery = (
  apiUrl: string,
  campaignId: string,
  sessionId: string,
) => {
  return useQuery({
    queryKey: ['session', sessionId],
    queryFn: async () => await getSession(apiUrl, campaignId, sessionId),
    throwOnError: false,
  });
};

export default useSessionQuery;
