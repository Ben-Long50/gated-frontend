import handleResponse from '../handleResponse';

const getKeywords = async (apiUrl: string) => {
  try {
    const response = await fetch(`${apiUrl}/keywords`, {
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

export default getKeywords;
