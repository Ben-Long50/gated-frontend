import { User } from './user';

export interface ErrorReport {
  id: number;
  createdAt: Date;
  title: string;
  content: string;
  userId: number;
  user: User;
}
