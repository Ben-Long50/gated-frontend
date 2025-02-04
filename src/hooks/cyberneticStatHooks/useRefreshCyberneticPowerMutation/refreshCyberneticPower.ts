import handleResponse from '../../handleResponse';

const refreshCyberneticPower = async (apiUrl: string, cyberneticId: number) => {
  try {
    const response = await fetch(
      `${apiUrl}/cybernetics/${cyberneticId}/stats/refreshPower`,
      {
        method: 'PATCH',
        credentials: 'include',
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

export default refreshCyberneticPower;
