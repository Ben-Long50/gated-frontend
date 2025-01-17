import handleResponse from '../handleResponse';

const createCondition = async (
  formData: object,
  conditionId: string,
  apiUrl: string,
) => {
  try {
    const response = await fetch(`${apiUrl}/conditions`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, conditionId }),
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

export default createCondition;
