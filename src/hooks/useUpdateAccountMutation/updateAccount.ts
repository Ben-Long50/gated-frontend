import { User } from 'src/types/user';
import handleResponse from '../handleResponse';

const updateAccount = async (apiUrl: string, formData: User) => {
  try {
    const response = await fetch(`${apiUrl}/users`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
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

export default updateAccount;
