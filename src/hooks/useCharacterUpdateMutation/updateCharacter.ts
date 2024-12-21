import handleResponse from '../handleResponse';

const updateCharacter = async (formData, characterId, apiUrl, authToken) => {
  try {
    const response = await fetch(`${apiUrl}/characters/${characterId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: formData,
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default updateCharacter;
