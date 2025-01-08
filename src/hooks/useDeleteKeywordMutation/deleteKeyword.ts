import handleResponse from '../handleResponse';

const deleteKeyword = async (apiUrl: string, keywordId: string) => {
  try {
    const response = await fetch(`${apiUrl}/keywords/${keywordId}`, {
      method: 'DELETE',
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

export default deleteKeyword;
