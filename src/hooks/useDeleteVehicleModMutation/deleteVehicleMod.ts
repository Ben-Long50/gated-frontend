import handleResponse from '../handleResponse';

const deleteVehicleMod = async (apiUrl: string, modId: string) => {
  try {
    const response = await fetch(`${apiUrl}/vehicles/modifications/${modId}`, {
      method: 'DELETE',
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

export default deleteVehicleMod;
