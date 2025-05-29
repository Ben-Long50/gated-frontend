import handleResponse from '../handleResponse';

const deleteItemCondition = async (
  apiUrl: string,
  conditionId: number,
  itemId: number,
) => {
  try {
    const response = await fetch(
      `${apiUrl}/items/${itemId}/conditions/${conditionId}`,
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

export default deleteItemCondition;
