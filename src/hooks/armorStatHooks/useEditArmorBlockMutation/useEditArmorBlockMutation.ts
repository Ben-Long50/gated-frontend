import { useMutation, useQueryClient } from '@tanstack/react-query';
import editArmorBlock from './editArmorBlock';

const useEditArmorBlockMutation = (apiUrl: string, armorId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: number) => {
      return editArmorBlock(apiUrl, armorId, value);
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

export default useEditArmorBlockMutation;
