import { useMutation, useQueryClient } from '@tanstack/react-query';
import editCyberneticPower from './editCyberneticPower';

const useEditCyberneticPowerMutation = (
  apiUrl: string,
  cyberneticId: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: number) => {
      return editCyberneticPower(apiUrl, cyberneticId, value);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['equipment'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
        exact: false,
      });
    },
    throwOnError: false,
  });
};

export default useEditCyberneticPowerMutation;
