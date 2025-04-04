import { useMutation } from '@tanstack/react-query';
import createCampaign from './createCampaign';

const useCreateCampaignMutation = (
  apiUrl: string,
  setFormMessage: (message: string) => void,
) => {
  return useMutation({
    mutationFn: (formData: FormData) => {
      return createCampaign(formData, apiUrl);
    },
    onSuccess: () => {
      setFormMessage('Campaign successfully created');
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useCreateCampaignMutation;
