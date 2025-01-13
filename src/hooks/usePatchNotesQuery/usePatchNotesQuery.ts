import { useQuery } from '@tanstack/react-query';
import getPatchNotes from './getPatchNotes';

const usePatchNotesQuery = (apiUrl: string) => {
  return useQuery({
    queryKey: ['patchNotes'],
    queryFn: async () => await getPatchNotes(apiUrl),
  });
};

export default usePatchNotesQuery;
