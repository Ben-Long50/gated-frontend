import { useMutation, useQueryClient } from '@tanstack/react-query';
import createPatchNote from './createPatchNote';

const useCreatePatchNoteMutation = (
  apiUrl: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: object) => {
      return createPatchNote(formData, apiUrl);
    },
    onSuccess: () => {
      setFormMessage('Patch note entry successfully created');
      queryClient.invalidateQueries({
        queryKey: ['patchNote'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['patchNotes'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useCreatePatchNoteMutation;
