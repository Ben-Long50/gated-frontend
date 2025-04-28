import handleResponse from '../handleResponse';

const getArmorById = async (apiUrl: string, armorId: number) => {
  try {
    const response = await fetch(`${apiUrl}/armor/${armorId}`, {
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

export default getArmorById;
