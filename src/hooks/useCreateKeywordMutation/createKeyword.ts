import handleResponse from '../handleResponse';

const createKeyword = async (formData, apiUrl, authToken, keywordId) => {
  try {
    const response = await fetch(`${apiUrl}/keywords`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...formData, keywordId }),
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default createKeyword;
