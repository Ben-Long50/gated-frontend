import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { socket } from 'src/socket';
import editAffiliationValue from './editAffiliationValue';
import { Affiliation } from 'src/types/faction';

const useAffiliationValueMutation = (apiUrl: string, affiliationId: number) => {
  const queryClient = useQueryClient();
  const updateBuffer = useRef(0);
  const timeoutRef = useRef(0);

  return useMutation({
    mutationFn: (value: number) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      updateBuffer.current = value;

      return new Promise((resolve) => {
        timeoutRef.current = setTimeout(async () => {
          const finalValue = updateBuffer.current;

          updateBuffer.current = 0;
          await editAffiliationValue(apiUrl, affiliationId, finalValue);
          resolve(finalValue);
        }, 1000);
      });
    },

    onMutate: (value) => {
      queryClient.cancelQueries({ queryKey: ['affiliation', affiliationId] });

      const prevAffiliationData: Affiliation | undefined =
        queryClient.getQueryData(['affiliation', affiliationId]);

      queryClient.setQueryData(
        ['affiliation', affiliationId],
        (prev: Affiliation) => ({
          ...prev,
          value,
        }),
      );

      return { prevAffiliationData };
    },

    onSuccess: () => {
      socket.emit('affiliation', affiliationId);
      return queryClient.invalidateQueries({
        queryKey: ['affiliation', affiliationId],
      });
    },
    throwOnError: false,
  });
};

export default useAffiliationValueMutation;
