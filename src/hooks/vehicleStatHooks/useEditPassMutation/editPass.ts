import handleResponse from '../../handleResponse';

const editPass = async (apiUrl: string, vehicleId: number, value: number) => {
  try {
    const response = await fetch(
      `${apiUrl}/vehicles/${vehicleId}/stats/currentPass`,
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

export default editPass;
