import handleResponse from '../handleResponse';

const updateCharacter = async (
  formData: FormData,
  apiUrl: string,
  characterId?: string,
) => {
  try {
    const response = await fetch(`${apiUrl}/characters/${characterId}`, {
      method: 'PUT',
      credentials: 'include',
      body: formData,
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

export default updateCharacter;
