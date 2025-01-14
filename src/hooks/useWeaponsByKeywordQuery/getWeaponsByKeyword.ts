import handleResponse from '../handleResponse';

const getWeaponsByKeyword = async (apiUrl: string, keywordName: string) => {
  try {
    const response = await fetch(`${apiUrl}/weapons/keywords/${keywordName}`, {
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

export default getWeaponsByKeyword;
