import handleResponse from '../handleResponse';

const modifyDrone = async (
  formData: FormData,
  droneId: number,
  apiUrl: string,
) => {
  try {
    const response = await fetch(`${apiUrl}/drones/${droneId}`, {
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

export default modifyDrone;
