import handleResponse from '../handleResponse';

const createPerk = async (formData, apiUrl, authToken, perkId) => {
  try {
    const response = await fetch(`${apiUrl}/perks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...formData, perkId }),
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default createPerk;
