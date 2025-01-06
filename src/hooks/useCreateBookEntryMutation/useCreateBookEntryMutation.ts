import { useMutation, useQueryClient } from '@tanstack/react-query';
import createBookEntry from './createBookEntry';

const useCreateBookEntryMutation = (apiUrl, authToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => {
      return createBookEntry(formData, apiUrl, authToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookEntry'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['book'],
        exact: false,
      });
    },
    throwOnError: false,
  });
};

export default useCreateBookEntryMutation;
