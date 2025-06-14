import handleResponse from '../handleResponse';

const editAffiliationValue = async (
  apiUrl: string,
  affiliationId: number,
  value: number,
) => {
  try {
    const response = await fetch(
      `${apiUrl}/affiliations/${affiliationId}/value`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
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

export default editAffiliationValue;
