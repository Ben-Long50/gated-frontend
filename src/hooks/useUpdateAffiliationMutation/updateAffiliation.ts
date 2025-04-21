import handleResponse from '../handleResponse';

const updateAffiliation = async (
  value: number,
  affiliationId: string,
  apiUrl: string,
) => {
  try {
    const response = await fetch(`${apiUrl}/affiliations/${affiliationId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value }),
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

export default updateAffiliation;
