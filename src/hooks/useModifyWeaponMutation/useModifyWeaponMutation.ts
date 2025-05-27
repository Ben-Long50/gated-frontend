import { useMutation, useQueryClient } from '@tanstack/react-query';
import modifyWeapon from './modifyWeapon';

const useModifyWeaponMutation = (
  apiUrl: string,
  weaponId: number,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return modifyWeapon(formData, weaponId, apiUrl);
    },
    onSuccess: (data) => {
      setFormMessage(data.message);
      queryClient.invalidateQueries({
        queryKey: ['item', weaponId],
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

export default useModifyWeaponMutation;
