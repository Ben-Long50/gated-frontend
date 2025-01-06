import handleResponse from '../handleResponse';

const getBookEntry = async (apiUrl, authToken, bookEntryTitle) => {
  try {
    const response = await fetch(`${apiUrl}/book/${bookEntryTitle}`, {
      method: 'GET',
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

export default getBookEntry;
