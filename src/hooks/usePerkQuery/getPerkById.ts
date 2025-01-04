import handleResponse from '../handleResponse';

const getPerkById = async (apiUrl, authToken, perkId) => {
  try {
    const response = await fetch(`${apiUrl}/perks/${perkId}`, {
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

export default getPerkById;
