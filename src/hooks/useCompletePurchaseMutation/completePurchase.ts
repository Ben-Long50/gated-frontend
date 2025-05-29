import handleResponse from '../handleResponse';

const completePurchase = async (
  apiUrl: string,
  characterId: number,
  inventoryId: number,
) => {
  try {
    const response = await fetch(
      `${apiUrl}/characters/${characterId}/inventory/${inventoryId}`,
      {
        method: 'POST',
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

export default completePurchase;
