import handleResponse from '../handleResponse';

const toggleEquipment = async (
  apiUrl: string,
  formData: { characterId: string; category: string; itemId: number },
) => {
  try {
    const response = await fetch(
      `${apiUrl}/characters/${formData.characterId}/equipment/${formData.itemId}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: formData.category }),
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

export default toggleEquipment;
