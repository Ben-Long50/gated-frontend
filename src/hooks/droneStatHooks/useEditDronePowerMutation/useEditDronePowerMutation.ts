import { useMutation, useQueryClient } from '@tanstack/react-query';
import editDronePower from './editDronePower';

const useEditDronePowerMutation = (
  apiUrl: string,
  droneId: number,
  characterId: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: number) => {
      return editDronePower(apiUrl, droneId, value);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['equipment'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['character', characterId],
      });
    },
    throwOnError: false,
  });
};

export default useEditDronePowerMutation;
