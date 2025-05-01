import handleResponse from '../handleResponse';

const modifyVehicle = async (
  formData: FormData,
  vehicleId: number,
  apiUrl: string,
) => {
  try {
    const response = await fetch(`${apiUrl}/vehicles/${vehicleId}`, {
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

export default modifyVehicle;
