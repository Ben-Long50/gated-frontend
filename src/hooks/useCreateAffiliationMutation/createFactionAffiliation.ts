import handleResponse from '../handleResponse';

const createFactionAffiliation = async (
  formData: FormData,
  factionId: number,
  apiUrl: string,
) => {
  try {
    const response = await fetch(
      `${apiUrl}/factions/${factionId}/affiliations/create`,
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

export default createFactionAffiliation;
