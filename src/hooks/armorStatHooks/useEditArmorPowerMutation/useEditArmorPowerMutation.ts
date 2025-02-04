import { useMutation, useQueryClient } from '@tanstack/react-query';
import editArmorPower from './editArmorPower';

const useEditArmorPowerMutation = (apiUrl: string, armorId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: number) => {
      return editArmorPower(apiUrl, armorId, value);
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

export default useEditArmorPowerMutation;
