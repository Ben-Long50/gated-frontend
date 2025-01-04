import handleResponse from '../handleResponse';

const getActions = async (apiUrl, authToken) => {
  try {
    const response = await fetch(`${apiUrl}/actions`, {
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

export default getActions;
