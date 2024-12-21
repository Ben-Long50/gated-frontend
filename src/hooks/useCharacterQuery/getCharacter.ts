import handleResponse from '../handleResponse';

const getCharacter = async (apiUrl, authToken, characterId) => {
  try {
    console.log(characterId);

    const response = await fetch(`${apiUrl}/characters/${characterId}`, {
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

export default getCharacter;
