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
