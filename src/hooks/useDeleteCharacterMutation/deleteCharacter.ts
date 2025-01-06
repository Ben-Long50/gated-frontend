import handleResponse from '../handleResponse';

const deleteCharacter = async (characterId: string, apiUrl: string) => {
  try {
    const response = await fetch(`${apiUrl}/characters/${characterId}`, {
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

export default deleteCharacter;
