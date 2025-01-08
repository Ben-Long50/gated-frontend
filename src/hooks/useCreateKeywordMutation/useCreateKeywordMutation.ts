import { useMutation, useQueryClient } from '@tanstack/react-query';
import createKeyword from './createKeyword';

const useCreateKeywordMutation = (
  apiUrl: string,
  keywordId: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: object) => {
      return createKeyword(formData, keywordId, apiUrl);
    },
    onSuccess: () => {
      setFormMessage('Keyword successfully created');
      queryClient.invalidateQueries({
        queryKey: ['keyword'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['keywords'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useCreateKeywordMutation;
