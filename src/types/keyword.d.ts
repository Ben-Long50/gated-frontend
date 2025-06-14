export interface Keyword {
  id: number;
  name: string;
  description: string;
  keywordType: KeywordType;
  gpCost: number;
}

export interface KeywordReference {
  id: number;
  itemId: number | null;
  modifiedItemId: number | null;
  actionId: number | null;
  keywordId: number;
  keyword: Keyword;
  value: number | null;
}

enum KeywordType {
  weapon = 'weapon',
  armor = 'armor',
  cybernetic = 'cybernetic',
}
