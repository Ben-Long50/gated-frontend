import handleResponse from '../../handleResponse';

const refreshArmorBlock = async (apiUrl: string, armorId: number) => {
  try {
    const response = await fetch(
      `${apiUrl}/armor/${armorId}/stats/refreshBlock`,
      {
        method: 'PATCH',
        credentials: 'include',
      },
    );
    const data = await handleResponse(response);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
};

export default refreshArmorBlock;
