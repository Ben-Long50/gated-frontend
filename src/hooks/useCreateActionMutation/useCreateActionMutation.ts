import { useMutation, useQueryClient } from '@tanstack/react-query';
import createAction from './createAction';

const useCreateActionMutation = (
  apiUrl: string,
  actionId: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: object) => {
      return createAction(formData, actionId, apiUrl);
    },
    onSuccess: () => {
      setFormMessage('Action successfully created');
      queryClient.invalidateQueries({
        queryKey: ['action'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['actions'],
        exact: false,
      });
    },
    onError: () => {
      setFormMessage('Error creating action');
    },
    throwOnError: false,
  });
};

export default useCreateActionMutation;
