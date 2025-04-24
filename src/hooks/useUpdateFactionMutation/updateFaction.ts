import handleResponse from '../handleResponse';

const updateFaction = async (
  formData: FormData,
  campaignId: number,
  factionId: number,
  apiUrl: string,
) => {
  try {
    const response = await fetch(
      `${apiUrl}/campaigns/${campaignId}/factions/${factionId}`,
      {
        method: 'PUT',
        credentials: 'include',
        body: formData,
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

export default updateFaction;
