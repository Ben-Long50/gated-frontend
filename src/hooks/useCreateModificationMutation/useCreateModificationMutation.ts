import { useMutation, useQueryClient } from '@tanstack/react-query';
import createModification from './createModification';

const useCreateModificationMutation = (
  apiUrl: string,
  modificationId: number,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return createModification(formData, apiUrl);
    },
    onSuccess: () => {
      setFormMessage('Modification successfully created');
      queryClient.invalidateQueries({
        queryKey: ['modification', modificationId],
      });
      return queryClient.invalidateQueries({
        queryKey: ['modifications'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useCreateModificationMutation;
