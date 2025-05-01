import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteArmor from './deleteArmor';
import { useNavigate } from 'react-router-dom';

const useDeleteArmorMutation = (
  apiUrl: string,
  armorId: number,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      return deleteArmor(apiUrl, armorId);
    },
    onSuccess: () => {
      navigate(-2);
      queryClient.invalidateQueries({
        queryKey: ['armorPiece'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['armor'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useDeleteArmorMutation;
