import handleResponse from '../handleResponse';

const deleteNotification = async (apiUrl: string, notificationId: number) => {
  try {
    const response = await fetch(`${apiUrl}/notifications/${notificationId}`, {
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

export default deleteNotification;
