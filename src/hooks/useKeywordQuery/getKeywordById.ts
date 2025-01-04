import handleResponse from '../handleResponse';

const getKeywordById = async (apiUrl, authToken, keywordId) => {
  try {
    const response = await fetch(`${apiUrl}/keywords/${keywordId}`, {
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

export default getKeywordById;
