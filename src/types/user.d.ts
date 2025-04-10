export interface User {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  role: string;
  _count: { receivedNotifications: number };
}
