import handleResponse from '../handleResponse';

const createGangAffiliation = async (
  formData: FormData,
  gangId: number,
  apiUrl: string,
) => {
  try {
    const response = await fetch(
      `${apiUrl}/gangs/${gangId}/affiliations/create`,
      {
        method: 'POST',
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

export default createGangAffiliation;
