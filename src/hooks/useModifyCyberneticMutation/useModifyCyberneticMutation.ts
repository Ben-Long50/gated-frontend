import { useMutation, useQueryClient } from '@tanstack/react-query';
import modifyCybernetic from './modifyCybernetic';

const useModifyCyberneticMutation = (
  apiUrl: string,
  cyberneticId: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return modifyCybernetic(formData, cyberneticId, apiUrl);
    },
    onSuccess: (data) => {
      setFormMessage(data.message);
      queryClient.invalidateQueries({
        queryKey: ['cybernetic'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useModifyCyberneticMutation;
