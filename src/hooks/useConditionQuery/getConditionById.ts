import handleResponse from '../handleResponse';

const getConditionById = async (apiUrl: string, conditionId?: string) => {
  try {
    const response = await fetch(`${apiUrl}/conditions/${conditionId}`, {
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

export default getConditionById;
