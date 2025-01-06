import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import deleteBookEntry from './deleteBookEntry';

const useDeleteBookEntryMutation = (apiUrl, authToken, bookEntryId) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      return deleteBookEntry(apiUrl, authToken, bookEntryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['book'],
        exact: false,
      });
      navigate('/glam/codex/book/Introduction');
    },
    throwOnError: false,
  });
};

export default useDeleteBookEntryMutation;
