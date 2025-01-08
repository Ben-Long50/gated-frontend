import handleResponse from '../handleResponse';

const deleteWeapon = async (apiUrl: string, weaponId: string) => {
  try {
    const response = await fetch(`${apiUrl}/weapons/${weaponId}`, {
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

export default deleteWeapon;
