import handleResponse from '../handleResponse';

const deleteDrone = async (apiUrl: string, droneId: number) => {
  try {
    const response = await fetch(`${apiUrl}/drones/${droneId}`, {
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

export default deleteDrone;
