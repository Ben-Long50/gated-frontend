import handleResponse from '../handleResponse';

const createCharacterAffiliation = async (
  formData: FormData,
  characterId: number,
  apiUrl: string,
) => {
  try {
    const response = await fetch(
      `${apiUrl}/characters/${characterId}/affiliations/create`,
      {
        method: 'POST',
        credentials: 'include',
        body: formData,
      },
    );
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
};

export default createCharacterAffiliation;
