import { Character } from './character';

interface Faction {
  id: number;
  name: string;
  factionType: FactionType;
  picture: { imageUrl: string; publicId: string };
  background: { html: string; nodes: string };
  affiliations: Affiliation[];
}

enum FactionType {
  churchOfElShaddai = 'churchOfElShaddai',
  corporateHoldouts = 'corporateHoldouts',
  federalReservists = 'federalReservists',
  noblebloods = 'noblebloods',
}

interface Affiliation {
  id: number;
  value: number;
  factions: Faction[];
  characters: Character[];
}
