import handleResponse from '../handleResponse';

const deleteCharacter = async (characterId, apiUrl, authToken) => {
  try {
    const response = await fetch(`${apiUrl}/characters/${characterId}`, {
      method: 'DELETE',
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

export default deleteCharacter;
