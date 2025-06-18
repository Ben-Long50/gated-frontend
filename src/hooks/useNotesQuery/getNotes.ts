import handleResponse from '../handleResponse';

const getNotes = async (
  apiUrl: string,
  campaignId: number,
  characterId: number,
) => {
  try {
    const response = await fetch(
      `${apiUrl}/campaigns/${campaignId}/characters/${characterId}/notes`,
      {
        method: 'GET',
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

export default getNotes;
