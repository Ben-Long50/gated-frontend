import { useMutation, useQueryClient } from '@tanstack/react-query';
import createVehicleMod from './createVehicleMod';

const useCreateVehicleModMutation = (
  apiUrl: string,
  modId: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: object) => {
      return createVehicleMod(formData, modId, apiUrl);
    },
    onSuccess: () => {
      setFormMessage('Modification successfully created');
      queryClient.invalidateQueries({
        queryKey: ['vehicleMod'],
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

export default useCreateVehicleModMutation;
