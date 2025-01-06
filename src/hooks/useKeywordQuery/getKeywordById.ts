import handleResponse from '../handleResponse';

const getKeywordById = async (apiUrl: string, keywordId: string) => {
  try {
    const response = await fetch(`${apiUrl}/keywords/${keywordId}`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await handleResponse(response);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
};

export default getKeywordById;
