import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteWeapon from './deleteWeapon';
import { useNavigate } from 'react-router-dom';

const useDeleteWeaponMutation = (
  apiUrl: string,
  weaponId: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      return deleteWeapon(apiUrl, weaponId);
    },
    onSuccess: () => {
      navigate(-1);
      queryClient.invalidateQueries({
        queryKey: ['weapon'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['weapons'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useDeleteWeaponMutation;
