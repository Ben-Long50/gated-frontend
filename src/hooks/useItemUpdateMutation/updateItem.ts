import handleResponse from '../handleResponse';

const updateItem = async (
  apiUrl: string,
  itemId: number,
  formData: FormData,
) => {
  try {
    const response = await fetch(`${apiUrl}/items/${itemId}/update`, {
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

export default updateItem;
