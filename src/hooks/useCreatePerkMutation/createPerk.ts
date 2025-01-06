import handleResponse from '../handleResponse';

const createPerk = async (formData: object, perkId: string, apiUrl: string) => {
  try {
    const response = await fetch(`${apiUrl}/perks`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, perkId }),
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

export default createPerk;
