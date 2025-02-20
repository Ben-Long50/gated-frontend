import { useMutation, useQueryClient } from '@tanstack/react-query';
import createVehicle from './createVehicle';

const useCreateVehicleMutation = (
  apiUrl: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return createVehicle(formData, apiUrl);
    },
    onSuccess: (data) => {
      setFormMessage(data.message);
      queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
        exact: false,
      });
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

export default useCreateVehicleMutation;
