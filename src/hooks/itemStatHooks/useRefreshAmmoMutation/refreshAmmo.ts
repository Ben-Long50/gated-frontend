import handleResponse from '../../handleResponse';

const refreshAmmo = async (apiUrl: string, itemId: number) => {
  try {
    const response = await fetch(
      `${apiUrl}/items/${itemId}/stats/refreshAmmo`,
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

export default refreshAmmo;
