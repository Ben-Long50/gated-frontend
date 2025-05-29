import handleResponse from '../handleResponse';

const markNotificationsRead = async (apiUrl: string) => {
  try {
    const response = await fetch(`${apiUrl}/notifications/read`, {
      method: 'PUT',
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

export default markNotificationsRead;
