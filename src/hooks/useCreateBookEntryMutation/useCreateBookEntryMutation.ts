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
      return queryClient.invalidateQueries({
        queryKey: ['bookEntry'],
        exact: false,
      });
    },
    onError: () => {
      setFormMessage('Error creating book entry');
    },
    throwOnError: false,
  });
};

export default useCreateBookEntryMutation;
