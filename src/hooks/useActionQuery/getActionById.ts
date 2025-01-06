import handleResponse from '../handleResponse';

const getActionById = async (apiUrl, authToken, actionId) => {
  try {
    const response = await fetch(`${apiUrl}/actions/${actionId}`, {
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

export default getActionById;
