export interface Keyword {
  id: number;
  name: string;
  description: string;
  keywordType: KeywordType;
  gpCost: number;
}

enum KeywordType {
  weapon = 'weapon',
  armor = 'armor',
  cybernetic = 'cybernetic',
}
