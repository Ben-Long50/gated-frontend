import { useMutation, useQueryClient } from '@tanstack/react-query';
import createAffiliation from './createAffiliation';

const useCreateAffiliationMutation = (
  apiUrl: string,
  characterId: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => {
      return createAffiliation(formData, characterId, apiUrl);
    },
    onSuccess: () => {
      setFormMessage('Affiliation successfully created');
      queryClient.invalidateQueries({ queryKey: ['activeCharacter'] });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useCreateAffiliationMutation;
