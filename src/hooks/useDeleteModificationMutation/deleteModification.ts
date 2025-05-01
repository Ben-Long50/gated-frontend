import handleResponse from '../handleResponse';

const deleteModification = async (apiUrl: string, modificationId: number) => {
  try {
    const response = await fetch(
      `${apiUrl}/vehicles/modifications/${modificationId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
    );
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
};

export default deleteModification;
