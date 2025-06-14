import handleResponse from '../handleResponse';

const createItemCondition = async (
  apiUrl: string,
  itemId: number,
  formData: object,
) => {
  try {
    const response = await fetch(`${apiUrl}/items/${itemId}/conditions`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
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

export default createItemCondition;
