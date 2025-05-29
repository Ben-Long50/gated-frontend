import handleResponse from '../handleResponse';

const updateItem = async (
  apiUrl: string,
  category: string,
  itemId: number,
  formData: FormData,
) => {
  try {
    const response = await fetch(
      `${apiUrl}/items/${category}/${itemId}/update`,
      {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      },
    );
    const data = await handleResponse(response);
    console.log(data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
};

export default updateItem;
