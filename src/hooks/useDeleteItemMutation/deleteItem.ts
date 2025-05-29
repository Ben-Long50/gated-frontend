import handleResponse from '../handleResponse';

const deleteItem = async (apiUrl: string, category: string, itemId: number) => {
  try {
    if (!itemId) throw new Error('Cannot delete with an undefined itemId');

    const response = await fetch(`${apiUrl}/items/${category}/${itemId}`, {
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
