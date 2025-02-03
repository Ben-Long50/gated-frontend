import handleResponse from '../handleResponse';

const editCurrentHealth = async (
  apiUrl: string,
  characterId: number,
  value: number,
) => {
  try {
    const response = await fetch(
      `${apiUrl}/characters/${characterId}/stats/currentHealth`,
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

export default editCurrentHealth;
