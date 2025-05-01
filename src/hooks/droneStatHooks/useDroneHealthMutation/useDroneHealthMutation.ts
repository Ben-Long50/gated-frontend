import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { Drone } from 'src/types/drone';
import editDroneHealth from './editDroneHealth';

const useDroneHealthMutation = (
  apiUrl: string,
  droneId: number,
  characterId: number,
) => {
  const queryClient = useQueryClient();
  const updateBuffer = useRef(0);
  const timeoutRef = useRef(0);

  const editDroneHealthMutation = useMutation({
    mutationFn: async (value: number) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      updateBuffer.current += value;

      return new Promise((resolve) => {
        timeoutRef.current = setTimeout(async () => {
          const finalValue = updateBuffer.current;

          updateBuffer.current = 0;
          await editDroneHealth(apiUrl, droneId, finalValue);
          resolve(finalValue);
        }, 1000);
      });
    },

    onMutate: (value) => {
      queryClient.cancelQueries({ queryKey: ['drone', droneId] });

      const prevDroneData: Drone | undefined = queryClient.getQueryData([
        'drone',
        droneId,
      ]);

      queryClient.setQueryData(['drone', droneId], (prev: Drone) => ({
        ...prev,
        stats: {
          ...prev.stats,
          currentHealth: prev.stats.currentHealth + value,
        },
      }));

      return { prevDroneData };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['drone', droneId],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['equipment'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['character', characterId],
      });
    },
    throwOnError: false,
  });
  return editDroneHealthMutation;
};

export default useDroneHealthMutation;
