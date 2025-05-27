import { useMutation, useQueryClient } from '@tanstack/react-query';
import modifyVehicle from './modifyDrone';

const useModifyDroneMutation = (
  apiUrl: string,
  droneId: number,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return modifyVehicle(formData, droneId, apiUrl);
    },
    onSuccess: (data) => {
      setFormMessage(data.message);
      queryClient.invalidateQueries({
        queryKey: ['item', droneId],
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

export default useModifyDroneMutation;
