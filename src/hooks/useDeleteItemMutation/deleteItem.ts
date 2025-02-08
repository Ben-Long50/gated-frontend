import handleResponse from '../handleResponse';

const deleteItem = async (apiUrl: string, itemId: string) => {
  try {
    const response = await fetch(`${apiUrl}/item/${itemId}`, {
      method: 'DELETE',
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

export default deleteItem;
