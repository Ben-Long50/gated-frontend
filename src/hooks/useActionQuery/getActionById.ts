import handleResponse from '../handleResponse';

const getActionById = async (apiUrl: string, actionId: string) => {
  try {
    const response = await fetch(`${apiUrl}/actions/${actionId}`, {
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

export default getActionById;
