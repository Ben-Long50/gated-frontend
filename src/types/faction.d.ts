interface Faction {
  id: number;
  name: string;
  factionType: FactionType;
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
  primaryFactionId: number;
  secondaryFactionId: number;
  primaryCharacterId: number;
  secondaryCharacterId: number;
}
