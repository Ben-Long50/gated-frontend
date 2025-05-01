import handleResponse from '../handleResponse';

const getDroneById = async (apiUrl: string, droneId: number) => {
  try {
    const response = await fetch(`${apiUrl}/drones/${droneId}`, {
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

export default getDroneById;
