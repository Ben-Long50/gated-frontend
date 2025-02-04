import handleResponse from '../../handleResponse';

const editAmmo = async (apiUrl: string, weaponId: number, value: number) => {
  try {
    const response = await fetch(
      `${apiUrl}/weapons/${weaponId}/stats/currentAmmoCount`,
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

export default editAmmo;
