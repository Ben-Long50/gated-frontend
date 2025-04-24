import handleResponse from '../handleResponse';

const createNotes = async (
  apiUrl: string,
  campaignId: number,
  sessionId: number,
  characterId: number,
  content: { html: string; nodes: object },
) => {
  try {
    const response = await fetch(
      `${apiUrl}/campaigns/${campaignId}/sessions/${sessionId}/characters/${characterId}/notes`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
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

export default createNotes;
