import handleResponse from '../handleResponse';

const getFaction = async (apiUrl: string, factionId: number) => {
  try {
    const response = await fetch(`${apiUrl}/factions/${factionId}`, {
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

export default getFaction;
