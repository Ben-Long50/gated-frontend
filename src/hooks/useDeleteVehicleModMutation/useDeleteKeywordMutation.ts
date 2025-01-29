import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import deleteVehicleMod from './deleteVehicleMod';

const useDeleteVehicleModMutation = (
  apiUrl: string,
  modId: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      return deleteVehicleMod(apiUrl, modId);
    },
    onSuccess: () => {
      navigate(-1);
      queryClient.invalidateQueries({
        queryKey: ['vehicleMod'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['vehicleMods'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useDeleteVehicleModMutation;
