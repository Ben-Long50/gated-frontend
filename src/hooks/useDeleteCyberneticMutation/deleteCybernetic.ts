import handleResponse from '../handleResponse';

const deleteCybernetic = async (apiUrl: string, cyberneticId: number) => {
  try {
    const response = await fetch(`${apiUrl}/cybernetics/${cyberneticId}`, {
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

export default deleteCybernetic;
