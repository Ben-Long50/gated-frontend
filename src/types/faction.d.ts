import { Character } from './character';

interface Faction {
  id: number;
  name: string;
  factionType: FactionType;
  background: { html: string; nodes: string };
  primaryAffiliations: Affiliation[];
  secondaryAffiliations: Affiliation[];
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
  primaryFactionId?: number;
  primaryFaction?: Faction;
  secondaryFactionId?: number;
  secondaryFaction?: Faction;
  primaryCharacterId?: number;
  primaryCharacter?: Character;
  secondaryCharacterId?: number;
  secondaryCharacter?: Character;
}
