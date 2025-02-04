import { useMutation, useQueryClient } from '@tanstack/react-query';
import refreshArmorBlock from './refreshArmorBlock';

const useRefreshArmorBlockMutation = (apiUrl: string, armorId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return refreshArmorBlock(apiUrl, armorId);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['equipment'],
        exact: false,
      });
    },
    throwOnError: false,
  });
};

export default useRefreshArmorBlockMutation;
