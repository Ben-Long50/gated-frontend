import { AttributeTree } from './attributeTree';
import { Stats } from './item';

interface Perk {
  id: number;
  name: string;
  description: string;
  modifiers: Stats;
  requirements: Partial<AttributeTree>;
}

export interface PerkTree {
  general: GeneralPerks;
  cybernetica: CyberneticaPerks;
  esoterica: EsotericaPerks;
  peace: PeacePerks;
  violence: ViolencePerks;
}

interface GeneralPerks {
  general: Perk[];
}

interface CyberneticaPerks {
  chromebits: Perk[];
  hardwired: Perk[];
  motorized: Perk[];
  networked: Perk[];
}

interface EsotericaPerks {
  gestalt: Perk[];
  godhead: Perk[];
  mysticism: Perk[];
  outerworld: Perk[];
}

interface PeacePerks {
  barter: Perk[];
  erudition: Perk[];
  rhetoric: Perk[];
  treatment: Perk[];
}

interface ViolencePerks {
  assault: Perk[];
  shooting: Perk[];
  subterfuge: Perk[];
  threshold: Perk[];
}
