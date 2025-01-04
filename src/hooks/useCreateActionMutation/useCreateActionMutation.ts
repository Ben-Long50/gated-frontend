import { useMutation, useQueryClient } from '@tanstack/react-query';
import createAction from './createAction';

const useCreateActionMutation = (apiUrl, authToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => {
      return createAction(formData, apiUrl, authToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['actions'],
        exact: false,
      });
    },
  });
};

export default useCreateActionMutation;
