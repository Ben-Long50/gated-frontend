import handleResponse from '../../handleResponse';

const editDronePower = async (
  apiUrl: string,
  droneId: number,
  value: number,
) => {
  try {
    const response = await fetch(
      `${apiUrl}/drones/${droneId}/stats/currentPower`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
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

export default editDronePower;
