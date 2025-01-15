import handleResponse from '../handleResponse';

const getErrorReports = async (apiUrl: string) => {
  try {
    const response = await fetch(`${apiUrl}/errors`, {
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

export default getErrorReports;
