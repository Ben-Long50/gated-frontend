import handleResponse from '../handleResponse';

const deleteBookEntry = async (apiUrl, authToken, bookEntryId) => {
  try {
    const response = await fetch(`${apiUrl}/book/${bookEntryId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default deleteBookEntry;
