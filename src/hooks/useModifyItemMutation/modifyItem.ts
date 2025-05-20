import handleResponse from '../handleResponse';

const modifyItem = async (
  formData: FormData,
  characterId: number,
  itemId: number,
  apiUrl: string,
) => {
  try {
    const response = await fetch(
      `${apiUrl}/characters/${characterId}/items/${itemId}/modify`,
      {
        method: 'PUT',
        credentials: 'include',
        body: formData,
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

export default modifyItem;
