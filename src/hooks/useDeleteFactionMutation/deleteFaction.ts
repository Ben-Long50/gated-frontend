import handleResponse from '../handleResponse';

const deleteFaction = async (
  apiUrl: string,
  campaignId: number,
  factionId: number,
) => {
  try {
    const response = await fetch(
      `${apiUrl}/campaigns/${campaignId}/factions/${factionId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
    );
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
};

export default deleteFaction;
