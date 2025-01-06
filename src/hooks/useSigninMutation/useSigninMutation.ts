import { useMutation } from '@tanstack/react-query';
import signin from './signin';
import { useNavigate } from 'react-router-dom';

const useSigninMutation = (
  apiUrl: string,
  setErrors: (errors: string[]) => void,
) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (formData: object) => {
      return await signin(formData, apiUrl);
    },
    onSuccess: () => {
      navigate('/glam/codex/book/introduction');
    },
    onError: (error) => {
      setErrors(error.errors);
    },
    throwOnError: false,
  });
};

export default useSigninMutation;
