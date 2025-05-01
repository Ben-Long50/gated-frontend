import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import deleteDrone from './deleteDrone';

const useDeleteDroneMutation = (
  apiUrl: string,
  droneId: number,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      return deleteDrone(apiUrl, droneId);
    },
    onSuccess: () => {
      navigate(-2);
      queryClient.invalidateQueries({
        queryKey: ['drone', droneId],
      });
      queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
        exact: false,
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

export default useDeleteDroneMutation;
