import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import createPerk from './createPerk';

const useCreatePerkMutation = (apiUrl, authToken) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (formData) => {
      return await createPerk(formData, apiUrl, authToken);
    },
    onSuccess: () => navigate(0),
  });
};

export default useCreatePerkMutation;
