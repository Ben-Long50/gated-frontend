import { useMutation, useQueryClient } from '@tanstack/react-query';
import createKeyword from './createKeyword';

const useCreateKeywordMutation = (apiUrl, authToken, keywordId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => {
      return createKeyword(formData, apiUrl, authToken, keywordId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['keyword'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['keywords'],
        exact: false,
      });
    },
  });
};

export default useCreateKeywordMutation;
