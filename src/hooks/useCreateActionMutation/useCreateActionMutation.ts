import { useMutation, useQueryClient } from '@tanstack/react-query';
import createAction from './createAction';

const useCreateActionMutation = (apiUrl, authToken, actionId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => {
      return createAction(formData, apiUrl, authToken, actionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['action'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['actions'],
        exact: false,
      });
    },
  });
};

export default useCreateActionMutation;
