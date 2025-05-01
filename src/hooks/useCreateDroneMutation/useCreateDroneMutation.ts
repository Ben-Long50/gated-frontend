import { useMutation, useQueryClient } from '@tanstack/react-query';
import createDrone from './createDrone';

const useCreateDroneMutation = (
  apiUrl: string,
  setFormMessage: (message: string) => void,
  droneId: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return createDrone(formData, apiUrl);
    },
    onSuccess: (data) => {
      setFormMessage(data.message);
      queryClient.invalidateQueries({
        queryKey: ['drone', droneId],
      });
      return queryClient.invalidateQueries({
        queryKey: ['drones'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useCreateDroneMutation;
