import handleResponse from '../handleResponse';

const deleteAffiliation = async (apiUrl: string, affiliationId: string) => {
  try {
    const response = await fetch(`${apiUrl}/affiliations/${affiliationId}`, {
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

export default deleteAffiliation;
