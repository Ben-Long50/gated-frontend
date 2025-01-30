export interface FetchOptions {
  itemList?: Weapon[] | Armor[] | Cybernetic[] | Vehicle[] | Modification[];
  includedKeywords?: string[];
  excludedKeywords?: string[];
}
