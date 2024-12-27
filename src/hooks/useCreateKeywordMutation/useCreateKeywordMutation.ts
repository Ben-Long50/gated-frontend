import { useMutation, useQueryClient } from '@tanstack/react-query';
import createKeyword from './createKeyword';

const useCreateKeywordMutation = (apiUrl, authToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => {
      return createKeyword(formData, apiUrl, authToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['keywords'],
        exact: false,
      });
    },
  });
};

export default useCreateKeywordMutation;
