import handleResponse from '../handleResponse';

const getCyberneticById = async (apiUrl, authToken, cyberneticId) => {
  try {
    const response = await fetch(`${apiUrl}/cybernetics/${cyberneticId}`, {
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

export default getCyberneticById;
