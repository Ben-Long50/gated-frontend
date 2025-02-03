import handleResponse from '../handleResponse';

const getEquippedItems = async (
  apiUrl: string,
  characterId: number,
  inventoryId: number,
) => {
  try {
    const response = await fetch(
      `${apiUrl}/characters/${characterId}/inventory/${inventoryId}/equipment`,
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
