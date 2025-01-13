import { useQuery } from '@tanstack/react-query';
import getPatchNote from './getPatchNote';

const usePatchNoteQuery = (apiUrl: string, patchNoteId: string) => {
  return useQuery({
    queryKey: ['patchNote', patchNoteId],
    queryFn: async () => await getPatchNote(apiUrl, patchNoteId),
  });
};

export default usePatchNoteQuery;
