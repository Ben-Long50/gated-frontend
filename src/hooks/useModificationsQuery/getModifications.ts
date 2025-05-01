import handleResponse from '../handleResponse';

const getModifications = async (apiUrl: string) => {
  try {
    const response = await fetch(`${apiUrl}/vehicles/modifications`, {
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

export default getModifications;
