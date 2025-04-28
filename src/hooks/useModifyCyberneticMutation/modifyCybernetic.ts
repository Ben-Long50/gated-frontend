import handleResponse from '../handleResponse';

const modifyCybernetic = async (
  formData: FormData,
  cyberneticId: number,
  apiUrl: string,
) => {
  try {
    const response = await fetch(`${apiUrl}/cybernetics/${cyberneticId}`, {
      method: 'PUT',
      credentials: 'include',
      body: formData,
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

export default modifyCybernetic;
