import handleResponse from '../handleResponse';

const getAffiliation = async (apiUrl: string, affiliationId: number) => {
  try {
    const response = await fetch(`${apiUrl}/affiliations/${affiliationId}`, {
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

export default getAffiliation;
