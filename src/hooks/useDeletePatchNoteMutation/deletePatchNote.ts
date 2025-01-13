import handleResponse from '../handleResponse';

const deletePatchNote = async (apiUrl: string, patchNoteId: string) => {
  try {
    const response = await fetch(`${apiUrl}/patchNotes/${patchNoteId}`, {
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

export default deletePatchNote;
