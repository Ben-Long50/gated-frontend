import { useMutation, useQueryClient } from '@tanstack/react-query';
import createVehicle from './createVehicle';

const useCreateVehicleMutation = (
  apiUrl: string,
  setFormMessage: (message: string) => void,
  vehicleId: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return createVehicle(formData, apiUrl);
    },
    onSuccess: (data) => {
      setFormMessage(data.message);
      queryClient.invalidateQueries({
        queryKey: ['item', vehicleId],
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

export default useCreateVehicleMutation;
