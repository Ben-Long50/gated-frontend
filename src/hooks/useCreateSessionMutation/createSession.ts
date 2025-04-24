import handleResponse from '../handleResponse';

const createSession = async (
  formData: FormData,
  campaignId: number,
  apiUrl: string,
) => {
  try {
    const response = await fetch(`${apiUrl}/campaigns/${campaignId}/sessions`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
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

export default createSession;
