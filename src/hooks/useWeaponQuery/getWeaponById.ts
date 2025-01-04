import handleResponse from '../handleResponse';

const getWeaponById = async (apiUrl, authToken, weaponId) => {
  try {
    const response = await fetch(`${apiUrl}/weapons/${weaponId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await handleResponse(response);

    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default getWeaponById;
