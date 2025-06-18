import { useQuery } from '@tanstack/react-query';
import { Notes } from 'src/types/campaign';
import getNotes from './getNotes';

const useNotesQuery = (
  apiUrl: string,
  campaignId: number,
  characterId: number,
) => {
  return useQuery<Notes[]>({
    queryKey: ['notes', characterId],
    queryFn: async () => await getNotes(apiUrl, campaignId, characterId),
    throwOnError: false,
  });
};

export default useNotesQuery;
