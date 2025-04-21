import { useMutation, useQueryClient } from '@tanstack/react-query';
import createCharacterAffiliation from './createCharacterAffiliation';
import createGangAffiliation from './createGangAffiliation';
import createFactionAffiliation from './createFactionAffiliation';

const useCreateAffiliationMutation = (
  apiUrl: string,
  setFormMessage: (message: string) => void,
  factionId?: string,
  gangId?: string,
  characterId?: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => {
      if (factionId) {
        return createFactionAffiliation(formData, factionId, apiUrl);
      } else if (gangId) {
        return createGangAffiliation(formData, gangId, apiUrl);
      } else if (characterId) {
        return createCharacterAffiliation(formData, characterId, apiUrl);
      } else throw new Error('No primary affiliation entity provided');
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
