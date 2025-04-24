import handleResponse from '../handleResponse';

const getCampaign = async (apiUrl: string, campaignId: number) => {
  try {
    const response = await fetch(`${apiUrl}/campaigns/${campaignId}`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await handleResponse(response);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
};

export default getCampaign;
