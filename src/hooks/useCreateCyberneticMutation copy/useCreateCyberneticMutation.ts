import { useMutation, useQueryClient } from '@tanstack/react-query';
import createCybernetic from './createCybernetic';

const useCreateCyberneticMutation = (apiUrl, authToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => {
      return createCybernetic(formData, apiUrl, authToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['weapons'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['armor'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['actions'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['cybernetic'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['cybernetics'],
        exact: false,
      });
    },
    throwOnError: false,
  });
};

export default useCreateCyberneticMutation;
