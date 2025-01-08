import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import signout from './signout';

const useSignoutMutation = (apiUrl: string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      return await signout(apiUrl);
    },
    onSuccess: () => {
      navigate('/signin');
    },
  });
};

export default useSignoutMutation;
