import handleResponse from '../handleResponse';

const getCybernetics = async (apiUrl, authToken) => {
  try {
    const response = await fetch(`${apiUrl}/cybernetics`, {
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

export default getCybernetics;
