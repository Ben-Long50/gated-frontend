import handleResponse from '../handleResponse';

const joinCampaign = async (apiUrl: string, campaignId: string) => {
  try {
    const response = await fetch(`${apiUrl}/campaigns/${campaignId}/players`, {
      method: 'PATCH',
      credentials: 'include',
    });
    console.log(response);

    const data = await handleResponse(response);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
};

export default joinCampaign;
