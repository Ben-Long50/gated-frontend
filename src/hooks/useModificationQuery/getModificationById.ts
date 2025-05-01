import handleResponse from '../handleResponse';

const getModificationById = async (apiUrl: string, modificationId?: number) => {
  try {
    const response = await fetch(`${apiUrl}/modifications/${modificationId}`, {
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

export default getModificationById;
