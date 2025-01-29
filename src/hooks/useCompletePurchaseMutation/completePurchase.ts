import handleResponse from '../handleResponse';

const completePurchase = async (
  formData: object,
  apiUrl: string,
  characterId: number,
) => {
  try {
    const response = await fetch(
      `${apiUrl}/characters/${characterId}/inventory`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData }),
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
