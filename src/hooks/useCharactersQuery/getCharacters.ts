import handleResponse from '../handleResponse';

const getCharacters = async (apiUrl: string) => {
  try {
    const response = await fetch(`${apiUrl}/characters`, {
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

export default getCharacters;
