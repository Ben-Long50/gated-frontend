import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteCybernetic from './deleteCybernetic';
import { useNavigate } from 'react-router-dom';

const useDeleteCyberneticMutation = (
  apiUrl: string,
  cyberneticId: number,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      return deleteCybernetic(apiUrl, cyberneticId);
    },
    onSuccess: () => {
      navigate(-2);
      queryClient.invalidateQueries({
        queryKey: ['cybernetic'],
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

export default useDeleteCyberneticMutation;
