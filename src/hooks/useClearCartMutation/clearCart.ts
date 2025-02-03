import handleResponse from '../handleResponse';

const clearCart = async (
  apiUrl: string,
  characterId: number,
  cartId: number,
) => {
  try {
    const response = await fetch(
      `${apiUrl}/characters/${characterId}/cart/${cartId}`,
      {
        method: 'PUT',
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

export default clearCart;
