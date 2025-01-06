import { useMutation, useQueryClient } from '@tanstack/react-query';
import createBookEntry from './createBookEntry';

const useCreateBookEntryMutation = (apiUrl: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: object) => {
      return createBookEntry(formData, apiUrl);
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
