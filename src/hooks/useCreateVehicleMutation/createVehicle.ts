import handleResponse from '../handleResponse';

const createVehicle = async (formData: FormData, apiUrl: string) => {
  try {
    const response = await fetch(`${apiUrl}/vehicles`, {
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

export default createVehicle;
