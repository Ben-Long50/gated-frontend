import { Action } from './action';
import { Armor, ArmorWithKeywords } from './armor';
import { Keyword } from './keyword';
import { Modifier } from './modifier';
import { Picture } from './picture';
import { Weapon, WeaponWithKeywords } from './weapon';

export interface Cybernetic {
  id: number;
  name: string;
  rarity: string;
  grade: number;
  picture: Picture;
  description: string;
  cyberneticType: string;
  cyber: number;
  stats: Partial<CyberneticStats>;
  price: number;
  equipped: boolean;
  body: string[];
  weapons: Weapon[];
  armor: Armor[];
  actions: Action[];
  modifiers: Modifier[];
  keywords: { keywordId: number; value?: number }[];
}

export interface CyberneticWithKeywords {
  id: number;
  name: string;
  rarity: string;
  grade: number;
  picture: Picture;
  description: string;
  cyberneticType: string;
  cyber: number;
  stats: Partial<CyberneticStats>;
  price: number;
  equipped: boolean;
  body: string[];
  weapons: WeaponWithKeywords[];
  armor: ArmorWithKeywords[];
  actions: Action[];
  modifiers: Modifier[];
  keywords: { keyword: Keyword; value?: number }[];
}

interface CyberneticStats {
  cyber?: number;
  currentPower?: number;
  power?: number;
}
