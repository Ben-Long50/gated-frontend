import handleResponse from '../handleResponse';

const deleteCharacterCondition = async (
  apiUrl: string,
  conditionId: number,
  characterId: number,
) => {
  try {
    const response = await fetch(
      `${apiUrl}/characters/${characterId}/conditions/${conditionId}`,
      {
        method: 'DELETE',
        credentials: 'include',
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

export default deleteCharacterCondition;
