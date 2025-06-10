import handleResponse from '../handleResponse';

const getCharacters = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/characters`, {
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
