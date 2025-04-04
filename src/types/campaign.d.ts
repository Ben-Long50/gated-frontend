import { Character } from './character';
import { User } from './user';

interface Campaign {
  id: number;
  createdAt: Date;
  owner: User;
  name: string;
  location: string;
  picture: { imageUrl: string; publicId: string };
  pendingPlayers: User[];
  players: User[];
  factions: string[];
  characters: Character[];
}

interface Session {
  id: number;
  createdAt: Date;
  sessionNumber: number;
  name: string;
  campaign: Campaign;
  briefing: { html: string; nodes: string };
  characters: Character[];
}
