import handleResponse from '../handleResponse';

const addToCart = async (
  apiUrl: string,
  formData: {
    characterId: string;
    category: string;
    itemId: string;
  },
) => {
  try {
    const response = await fetch(
      `${apiUrl}/characters/${formData.characterId}/cart`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: formData.category,
          itemId: formData.itemId,
        }),
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

export default addToCart;
