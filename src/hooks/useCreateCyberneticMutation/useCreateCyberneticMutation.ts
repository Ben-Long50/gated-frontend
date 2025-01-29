import { useMutation, useQueryClient } from '@tanstack/react-query';
import createCybernetic from './createCybernetic';

const useCreateCyberneticMutation = (
  apiUrl: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return createCybernetic(formData, apiUrl);
    },
    onSuccess: () => {
      setFormMessage('Cybernetic successfully created');
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
        queryKey: ['activeCharacter'],
        exact: false,
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
