import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import deleteVehicle from './deleteVehicle';

const useDeleteVehicleMutation = (
  apiUrl: string,
  vehicleId: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      return deleteVehicle(apiUrl, vehicleId);
    },
    onSuccess: () => {
      navigate('/glam/codex/vehicles');
      queryClient.invalidateQueries({
        queryKey: ['vehicle'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['vehicles'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useDeleteVehicleMutation;
