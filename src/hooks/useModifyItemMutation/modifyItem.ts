import handleResponse from '../handleResponse';

const modifyItem = async (
  formData: FormData,
  itemId: string,
  apiUrl: string,
) => {
  try {
    const response = await fetch(`${apiUrl}/items/${itemId}`, {
      method: 'PUT',
      credentials: 'include',
      body: formData,
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

export default modifyItem;
