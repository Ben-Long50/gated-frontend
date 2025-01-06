import handleResponse from '../handleResponse';

const createAction = async (formData, apiUrl, authToken, actionId) => {
  try {
    const response = await fetch(`${apiUrl}/actions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...formData, actionId }),
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default createAction;
