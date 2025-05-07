import handleResponse from '../../handleResponse';

const editDroneHull = async (
  apiUrl: string,
  droneId: number,
  value: number,
) => {
  try {
    const response = await fetch(
      `${apiUrl}/drones/${droneId}/stats/currentHull`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value,
        }),
      },
    );
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
};

export default editDroneHull;
