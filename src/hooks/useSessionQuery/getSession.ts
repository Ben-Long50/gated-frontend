import handleResponse from '../handleResponse';

const getSession = async (
  apiUrl: string,
  campaignId: string,
  sessionId: string,
) => {
  try {
    const response = await fetch(
      `${apiUrl}/campaigns/${campaignId}/sessions/${sessionId}`,
      {
        method: 'GET',
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

export default getSession;
