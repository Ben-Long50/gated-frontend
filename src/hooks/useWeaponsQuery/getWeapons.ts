import handleResponse from '../handleResponse';

const getWeapons = async (apiUrl, authToken) => {
  try {
    const response = await fetch(`${apiUrl}/weapons`, {
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

export default getWeapons;
