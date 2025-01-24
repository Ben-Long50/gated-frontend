import handleResponse from '../handleResponse';

const setActiveCharacter = async (apiUrl: string, characterId: string) => {
  try {
    const response = await fetch(`${apiUrl}/characters/active`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ characterId }),
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

export default setActiveCharacter;
