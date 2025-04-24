import { useQuery } from '@tanstack/react-query';
import getSession from './getSession';
import { Session } from 'src/types/campaign';

const useSessionQuery = (
  apiUrl: string,
  campaignId: number,
  sessionId: number,
) => {
  return useQuery<Session>({
    queryKey: ['session', sessionId],
    queryFn: async () => await getSession(apiUrl, campaignId, sessionId),
    throwOnError: false,
  });
};

export default useSessionQuery;
