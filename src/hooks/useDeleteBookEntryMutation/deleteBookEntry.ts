import handleResponse from '../handleResponse';

const deleteBookEntry = async (apiUrl: string, bookEntryId: string) => {
  try {
    const response = await fetch(`${apiUrl}/book/${bookEntryId}`, {
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

export default deleteBookEntry;
