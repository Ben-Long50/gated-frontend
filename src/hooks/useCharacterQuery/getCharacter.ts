import handleResponse from '../handleResponse';

const getCharacter = async (apiUrl: string, characterId: number) => {
  try {
    const response = await fetch(`${apiUrl}/characters/${characterId}`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await handleResponse(response);
    console.log(characterId);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
};

export default getCharacter;
