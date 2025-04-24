import { useQuery } from '@tanstack/react-query';
import { Notes } from 'src/types/campaign';
import getNotes from './getNotes';

const useNotesQuery = (
  apiUrl: string,
  campaignId: number,
  sessionId: number,
  characterId: number,
) => {
  return useQuery<Notes>({
    queryKey: ['notes', sessionId, characterId],
    queryFn: async () =>
      await getNotes(apiUrl, campaignId, sessionId, characterId),
    throwOnError: false,
  });
};

export default useNotesQuery;
