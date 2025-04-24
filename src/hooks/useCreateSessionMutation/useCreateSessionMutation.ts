import { useMutation, useQueryClient } from '@tanstack/react-query';
import createSession from './createSession';

const useCreateSessionMutation = (
  apiUrl: string,
  campaignId: number,
  setFormMessage: (message: string) => void,
  sessionId?: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return createSession(formData, campaignId, apiUrl);
    },
    onSuccess: () => {
      if (sessionId) {
        setFormMessage('Session successfully updated');
        return queryClient.invalidateQueries({
          queryKey: ['session', sessionId],
        });
      } else {
        setFormMessage('Session successfully created');
        return;
      }
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useCreateSessionMutation;
