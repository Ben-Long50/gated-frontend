import { useMutation, useQueryClient } from '@tanstack/react-query';
import createAction from './createAction';

const useCreateActionMutation = (
  apiUrl: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: object) => {
      return createAction(formData, apiUrl);
    },
    onSuccess: (data) => {
      setFormMessage(data.message);
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

export default useCreateActionMutation;
