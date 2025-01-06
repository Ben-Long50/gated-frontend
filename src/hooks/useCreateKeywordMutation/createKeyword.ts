import handleResponse from '../handleResponse';

const createKeyword = async (
  formData: object,
  keywordId: string,
  apiUrl: string,
) => {
  try {
    const response = await fetch(`${apiUrl}/keywords`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, keywordId }),
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

export default createKeyword;
