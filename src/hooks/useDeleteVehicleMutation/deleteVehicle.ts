import handleResponse from '../handleResponse';

const deleteVehicle = async (apiUrl: string, vehicleId: string) => {
  try {
    const response = await fetch(`${apiUrl}/vehicles/${vehicleId}`, {
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

export default deleteVehicle;
