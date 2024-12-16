import handleResponse from '../handleResponse';

const getAccount = async (apiUrl, token) => {
  try {
    const response = await fetch(`${apiUrl}/users/authenticated`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await handleResponse(response);

    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default getAccount;
