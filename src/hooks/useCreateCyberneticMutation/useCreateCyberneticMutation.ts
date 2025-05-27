import { useMutation, useQueryClient } from '@tanstack/react-query';
import createCybernetic from './createCybernetic';

const useCreateCyberneticMutation = (
  apiUrl: string,
  setFormMessage: (message: string) => void,
  cyberneticId?: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return createCybernetic(formData, apiUrl);
    },
    onSuccess: (data) => {
      setFormMessage(data.message);
      queryClient.invalidateQueries({
        queryKey: ['item', cyberneticId],
      });
      return queryClient.invalidateQueries({
        queryKey: ['cybernetics'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useCreateCyberneticMutation;
