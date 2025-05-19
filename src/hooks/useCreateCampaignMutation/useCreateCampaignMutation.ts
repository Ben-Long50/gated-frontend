import { useMutation, useQueryClient } from '@tanstack/react-query';
import createCampaign from './createCampaign';

const useCreateCampaignMutation = (
  apiUrl: string,
  setFormMessage: (message: string) => void,
  campaignId?: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return createCampaign(formData, apiUrl);
    },
    onSuccess: () => {
      setFormMessage('Campaign successfully created');
      queryClient.invalidateQueries({
        queryKey: ['campaign', campaignId],
      });
      return queryClient.invalidateQueries({
        queryKey: ['campaigns'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useCreateCampaignMutation;
