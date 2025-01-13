import handleResponse from '../handleResponse';

const getVehicleModById = async (apiUrl: string, modId: string) => {
  try {
    const response = await fetch(`${apiUrl}/vehicles/modifications/${modId}`, {
      method: 'GET',
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

export default getVehicleModById;
