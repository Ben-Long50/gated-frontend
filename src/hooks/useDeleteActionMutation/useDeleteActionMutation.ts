import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteAction from './deleteAction';
import { useNavigate } from 'react-router-dom';

const useDeleteActionMutation = (
  apiUrl: string,
  actionId: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      return deleteAction(apiUrl, actionId);
    },
    onSuccess: () => {
      navigate('/glam/codex/actions');
      queryClient.invalidateQueries({
        queryKey: ['action'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['actions'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useDeleteActionMutation;
