import handleResponse from '../handleResponse';

const modifyItem = async (
  formData: FormData,
  characterId: number,
  itemId: number,
  category: string,
  apiUrl: string,
) => {
  try {
    const response = await fetch(
      `${apiUrl}/characters/${characterId}/items/${category}/${itemId}/modify`,
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
