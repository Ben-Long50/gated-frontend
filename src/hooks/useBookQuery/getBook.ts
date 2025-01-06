import handleResponse from '../handleResponse';

const getBook = async (apiUrl, authToken) => {
  try {
    const response = await fetch(`${apiUrl}/book`, {
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

export default getBook;
