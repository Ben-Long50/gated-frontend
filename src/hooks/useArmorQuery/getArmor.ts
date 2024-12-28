import handleResponse from '../handleResponse';

const getArmor = async (apiUrl, authToken) => {
  try {
    const response = await fetch(`${apiUrl}/armor`, {
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

export default getArmor;
