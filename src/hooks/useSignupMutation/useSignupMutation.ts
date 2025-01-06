import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import signup from './signup';

const useSignupMutation = (
  apiUrl: string,
  setErrors: (errors: string[]) => void,
) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (formData: object) => {
      return await signup(formData, apiUrl);
    },
    onSuccess: () => navigate('/signin'),
    onError: (error) => {
      setErrors(error.errors);
    },
    throwOnError: false,
  });
};

export default useSignupMutation;
