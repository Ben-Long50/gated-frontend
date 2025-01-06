import handleResponse from '../handleResponse';

const createArmor = async (formData: FormData, apiUrl: string) => {
  try {
    const response = await fetch(`${apiUrl}/armor`, {
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

export default createArmor;
