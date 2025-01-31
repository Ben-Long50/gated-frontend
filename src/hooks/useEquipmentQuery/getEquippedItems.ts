import handleResponse from '../handleResponse';

const getEquippedItems = async (apiUrl: string, characterId?: string) => {
  try {
    const response = await fetch(
      `${apiUrl}/characters/${characterId}/equipment`,
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

export default getEquippedItems;
