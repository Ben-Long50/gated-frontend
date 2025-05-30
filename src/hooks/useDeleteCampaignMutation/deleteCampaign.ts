import handleResponse from '../handleResponse';

const deleteCampaign = async (apiUrl: string, campaignId: number) => {
  try {
    const response = await fetch(`${apiUrl}/campaigns/${campaignId}`, {
      method: 'DELETE',
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

export default deleteCampaign;
