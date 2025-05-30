import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateFaction from './updateAccount';
import { User } from 'src/types/user';

const useUpdateAccountMutation = (
  apiUrl: string,
  setFormMessage: (message: string) => void,
  setErrors: (errors: string[]) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: Partial<User>) => {
      return updateFaction(apiUrl, formData);
    },
    onSuccess: () => {
      setFormMessage('Account successfully updated');
      return queryClient.invalidateQueries({
        queryKey: ['account'],
      });
    },
    onError: (error: string[]) => {
      setErrors(error);
    },
    throwOnError: false,
  });
};

export default useUpdateAccountMutation;
