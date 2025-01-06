import { useMutation, useQueryClient } from '@tanstack/react-query';
import createKeyword from './createKeyword';

const useCreateKeywordMutation = (keywordId: string, apiUrl: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: object) => {
      return createKeyword(formData, keywordId, apiUrl);
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
