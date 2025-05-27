import handleResponse from '../handleResponse';

const createItem = async (
  apiUrl: string,
  category: string,
  formData: FormData,
) => {
  try {
    const response = await fetch(`${apiUrl}/items/${category}`, {
      method: 'POST',
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

export default createItem;
