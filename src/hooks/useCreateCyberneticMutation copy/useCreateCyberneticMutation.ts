import { useMutation, useQueryClient } from '@tanstack/react-query';
import createCybernetic from './createCybernetic';

const useCreateCyberneticMutation = (apiUrl, authToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => {
      return createCybernetic(formData, apiUrl, authToken);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['cybernetics'],
        exact: false,
      });
    },
    throwOnError: false,
  });
};

export default useCreateCyberneticMutation;
