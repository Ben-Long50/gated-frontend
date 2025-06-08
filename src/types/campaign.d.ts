import { Character } from './character';
import { Affiliation, Faction } from './faction';
import { Picture } from './picture';
import { User } from './user';

interface Campaign {
  id: number;
  createdAt: Date;
  ownerId: number;
  owner: User;
  name: string;
  location: string;
  picture: Picture;
  pendingPlayers: User[];
  players: User[];
  factions: Faction[];
  characters: Character[];
  sessions: Session[];
  affiliations: Affiliation[];
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

interface Notes {
  id: number;
  sessionId: number;
  session?: Partial<Session>;
  characterId: number;
  character?: Partial<Character>;
  content: { html: string; nodes: string };
}
