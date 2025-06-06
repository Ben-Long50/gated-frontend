import handleResponse from '../handleResponse';

const activateAction = async (
  apiUrl: string,
  actionId: number,
  value: boolean,
) => {
  try {
    const response = await fetch(`${apiUrl}/actions/${actionId}/toggle`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value,
      }),
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

export default activateAction;
