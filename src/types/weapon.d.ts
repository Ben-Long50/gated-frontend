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
  cyberneticId: number | null;
  vehicleId: number | null;
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
  cyberneticId: number | null;
  vehicleId: number | null;
  keywords: { keyword: Keyword; value?: number }[];
}

interface WeaponStats {
  damage?: number;
  salvo?: number;
  flurry?: number;
  range?: number;
  currentAmmoCount?: number;
  magCapacity?: number;
  currentMagCount?: number;
  magCount?: number;
  weight?: number;
}
