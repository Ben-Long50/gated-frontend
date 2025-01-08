import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteKeyword from './deleteKeyword';
import { useNavigate } from 'react-router-dom';

const useDeleteKeywordMutation = (
  apiUrl: string,
  keywordId: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      return deleteKeyword(apiUrl, keywordId);
    },
    onSuccess: () => {
      navigate('/glam/codex/keywords');
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

export default useDeleteKeywordMutation;
