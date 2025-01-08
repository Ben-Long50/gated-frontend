import handleResponse from '../handleResponse';

const deletePerk = async (apiUrl: string, perkId: string) => {
  try {
    const response = await fetch(`${apiUrl}/perks/${perkId}`, {
      method: 'DELETE',
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

export default deletePerk;
