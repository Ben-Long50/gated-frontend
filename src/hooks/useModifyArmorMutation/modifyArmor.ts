import handleResponse from '../handleResponse';

const modifyArmor = async (
  formData: FormData,
  armorId: string,
  apiUrl: string,
) => {
  try {
    const response = await fetch(`${apiUrl}/armor/${armorId}`, {
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

export default modifyArmor;
