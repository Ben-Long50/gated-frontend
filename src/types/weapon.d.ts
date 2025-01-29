import { Keyword } from './keyword';
import { Picture } from './picture';

export interface Weapon {
  id: number;
  name: string;
  rarity: string;
  grade: number;
  picture: Picture;
  description: string;
  stats: WeaponStats;
  price: number;
  keywords: { keywordId: number; value?: number }[];
}

export interface WeaponWithKeywords {
  id: number;
  name: string;
  rarity: string;
  grade: number;
  picture: Picture;
  description: string;
  stats: WeaponStats;
  price: number;
  keywords: { keyword: Keyword; value?: number }[];
}

interface WeaponStats {
  damage?: number;
  salvo?: number;
  flurry?: number;
  range?: number;
  magCapacity?: number;
  magCount?: number;
  weight?: number;
}
