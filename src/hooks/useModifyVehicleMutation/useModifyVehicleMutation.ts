import { useMutation, useQueryClient } from '@tanstack/react-query';
import modifyVehicle from './modifyVehicle';

const useModifyVehicleMutation = (
  apiUrl: string,
  vehicleId: number,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return modifyVehicle(formData, vehicleId, apiUrl);
    },
    onSuccess: (data) => {
      setFormMessage(data.message);
      queryClient.invalidateQueries({
        queryKey: ['vehicle', vehicleId],
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

export default useModifyVehicleMutation;
