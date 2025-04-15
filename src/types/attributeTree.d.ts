export interface AttributeTree {
  cybernetica: Attribute;
  esoterica: Attribute;
  peace: Attribute;
  violence: Attribute;
}

export interface Attribute {
  points: number;
  skills: {
    [key: string]: Skill;
  };
}

interface Skill {
  points: number;
}

type AttributeName = 'cybernetica' | 'esoterica' | 'peace' | 'violence';

type SkillName =
  | 'chromebits'
  | 'hardwired'
  | 'motorized'
  | 'networked'
  | 'gestalt'
  | 'outerworld'
  | 'mysticism'
  | 'godhead'
  | 'barter'
  | 'rhetoric'
  | 'erudition'
  | 'treatment'
  | 'assault'
  | 'shooting'
  | 'subterfuge'
  | 'threshold';
