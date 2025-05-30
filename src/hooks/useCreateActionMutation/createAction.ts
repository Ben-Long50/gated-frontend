import handleResponse from '../handleResponse';

const createAction = async (formData: object, apiUrl: string) => {
  try {
    const response = await fetch(`${apiUrl}/actions`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData }),
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

export default createAction;
