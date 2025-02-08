import handleResponse from '../handleResponse';

const getItemById = async (apiUrl: string, itemId?: string) => {
  try {
    const response = await fetch(`${apiUrl}/items/${itemId}`, {
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

export default getItemById;
