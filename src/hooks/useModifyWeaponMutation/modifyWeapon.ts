import handleResponse from '../handleResponse';

const modifyWeapon = async (
  formData: FormData,
  weaponId: number,
  apiUrl: string,
) => {
  try {
    const response = await fetch(`${apiUrl}/weapons/${weaponId}`, {
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

export default modifyWeapon;
