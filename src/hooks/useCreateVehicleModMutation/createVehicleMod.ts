import handleResponse from '../handleResponse';

const createVehicleMod = async (
  formData: object,
  modId: string,
  apiUrl: string,
) => {
  try {
    const response = await fetch(`${apiUrl}/vehicles/modifications`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, modId }),
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

export default createVehicleMod;
