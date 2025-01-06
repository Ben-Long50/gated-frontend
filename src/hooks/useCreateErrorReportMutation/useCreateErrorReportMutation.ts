import { useMutation } from '@tanstack/react-query';
import createKeyword from './createErrorReport';
import { useNavigate } from 'react-router-dom';

const useCreateErrorReportMutation = (apiUrl: string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (formData: object) => {
      return createKeyword(formData, apiUrl);
    },
    onSettled: () => {
      navigate('/glam/codex/book/introduction');
    },
    throwOnError: false,
  });
};

export default useCreateErrorReportMutation;
