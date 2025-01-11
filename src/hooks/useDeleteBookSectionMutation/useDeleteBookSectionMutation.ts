import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteBookSection from './deleteBookSection';

const useDeleteBookSectionMutation = (
  apiUrl: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookSectionId: string) => {
      return deleteBookSection(apiUrl, bookSectionId);
    },
    onSuccess: (response) => {
      setFormMessage(response.message);
      return queryClient.invalidateQueries({
        queryKey: ['book'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useDeleteBookSectionMutation;
