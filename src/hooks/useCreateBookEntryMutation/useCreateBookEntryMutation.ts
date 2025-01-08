import { useMutation, useQueryClient } from '@tanstack/react-query';
import createBookEntry from './createBookEntry';

const useCreateBookEntryMutation = (
  apiUrl: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: object) => {
      return createBookEntry(formData, apiUrl);
    },
    onSuccess: () => {
      setFormMessage('Book entry successfully created');
      queryClient.invalidateQueries({
        queryKey: ['book'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['bookEntry'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useCreateBookEntryMutation;
