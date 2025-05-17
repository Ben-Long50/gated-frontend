import handleResponse from '../handleResponse';

const editCart = async (
  apiUrl: string,
  characterId: number,
  cartId: number,
  formData: {
    itemId: number;
    value: number;
  },
) => {
  try {
    console.log(formData);

    const response = await fetch(
      `${apiUrl}/characters/${characterId}/cart/${cartId}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: formData.itemId,
          value: formData.value,
        }),
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

export default editCart;
