import handleResponse from '../handleResponse';

const clearCart = async (apiUrl: string, characterId: string) => {
  try {
    const response = await fetch(`${apiUrl}/characters/${characterId}/cart`, {
      method: 'PUT',
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

export default clearCart;
