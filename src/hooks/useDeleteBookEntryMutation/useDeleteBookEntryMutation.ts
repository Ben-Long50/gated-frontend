import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import deleteBookEntry from './deleteBookEntry';

const useDeleteBookEntryMutation = (
  apiUrl: string,
  bookEntryId: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      return deleteBookEntry(apiUrl, bookEntryId);
    },
    onSuccess: () => {
      navigate('/glam/codex/book/introduction');
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

export default useDeleteBookEntryMutation;
