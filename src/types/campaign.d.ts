import { Character } from './character';
import { Faction } from './faction';
import { User } from './user';

interface Campaign {
  id: number;
  createdAt: Date;
  ownerId: number;
  owner: User;
  name: string;
  location: string;
  picture: { imageUrl: string; publicId: string };
  pendingPlayers: User[];
  players: User[];
  factions: Faction[];
  characters: Character[];
  sessions: Session[];
}

interface Session {
  id: number;
  createdAt: Date;
  sessionNumber: number;
  name: string;
  location: string;
  picture: { imageUrl: string; publicId: string };
  campaign: Campaign;
  campaignId: number;
  briefing: { html: string; nodes: string };
  characters: Character[];
}
