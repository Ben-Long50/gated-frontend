import handleResponse from '../handleResponse';

const createItemCopy = async (
  apiUrl: string,
  category: string,
  itemId: number,
) => {
  try {
    const response = await fetch(`${apiUrl}/items/${category}/${itemId}`, {
      method: 'POST',
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

export default createItemCopy;
