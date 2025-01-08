import handleResponse from '../handleResponse';

const signout = async (apiUrl: string) => {
  try {
    const response = await fetch(`${apiUrl}/auth/signout`, {
      method: 'POST',
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

export default signout;
