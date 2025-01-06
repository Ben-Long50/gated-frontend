import handleResponse from '../handleResponse';

const getCyberneticById = async (apiUrl: string, cyberneticId: string) => {
  try {
    const response = await fetch(`${apiUrl}/cybernetics/${cyberneticId}`, {
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

export default getCyberneticById;
