export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  role: string;
  _count: {
    receivedNotifications: number;
    ownerCampaigns: number;
    pendingCampaigns: number;
    playerCampaigns: number;
  };
}
