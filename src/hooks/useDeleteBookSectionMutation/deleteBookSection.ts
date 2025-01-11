import handleResponse from '../handleResponse';

const deleteBookSection = async (apiUrl: string, bookSectionId: string) => {
  try {
    const response = await fetch(`${apiUrl}/book/sections/${bookSectionId}`, {
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

export default deleteBookSection;
