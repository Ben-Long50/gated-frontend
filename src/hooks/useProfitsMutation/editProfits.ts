import handleResponse from '../handleResponse';

const editProfits = async (
  apiUrl: string,
  characterId: number,
  value: number,
) => {
  try {
    const response = await fetch(
      `${apiUrl}/characters/${characterId}/profits`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value,
        }),
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

export default editProfits;
