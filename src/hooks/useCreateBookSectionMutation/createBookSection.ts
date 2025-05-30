import handleResponse from '../handleResponse';

const createBookSection = async (formData: object, apiUrl: string) => {
  try {
    const response = await fetch(`${apiUrl}/book/sections`, {
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

export default createBookSection;
