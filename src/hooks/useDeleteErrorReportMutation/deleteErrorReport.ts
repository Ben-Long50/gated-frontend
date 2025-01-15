import handleResponse from '../handleResponse';

const deleteErrorReport = async (apiUrl: string, errorReportId: number) => {
  try {
    const response = await fetch(`${apiUrl}/errors/${errorReportId}`, {
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

export default deleteErrorReport;
