import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import deleteCondition from './deleteCondition';

const useDeleteConditionMutation = (
  apiUrl: string,
  conditionId: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      return deleteCondition(apiUrl, conditionId);
    },
    onSuccess: () => {
      navigate('/glam/codex/conditions');
      queryClient.invalidateQueries({
        queryKey: ['condition'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['conditions'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useDeleteConditionMutation;
