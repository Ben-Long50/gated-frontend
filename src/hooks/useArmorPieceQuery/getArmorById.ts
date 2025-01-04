import handleResponse from '../handleResponse';

const getArmorById = async (apiUrl, authToken, armorId) => {
  try {
    const response = await fetch(`${apiUrl}/armor/${armorId}`, {
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

export default getArmorById;
