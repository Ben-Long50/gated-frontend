import { useMutation, useQueryClient } from '@tanstack/react-query';
import createNotes from './createNotes';

const useCreateNotesMutation = (
  apiUrl: string,
  campaignId: number,
  sessionId: number,
  characterId: number,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: { html: string; nodes: object }) => {
      return createNotes(apiUrl, campaignId, sessionId, characterId, content);
    },
    onSuccess: (data) => {
      setFormMessage(data.message);
      return queryClient.invalidateQueries({
        queryKey: ['notes', sessionId, characterId],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useCreateNotesMutation;
