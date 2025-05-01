import { Action } from './action';
import { Keyword } from './keyword';
import { Picture } from './picture';
import { WeaponWithKeywords } from './weapon';

export interface Drone {
  id: number;
  name: string;
  rarity: string;
  grade: number;
  picture: Picture;
  description: string;
  stats: VehicleStats;
  price: number;
  weapons: WeaponWithKeywords[];
  actions: Action[];
  keywords: { keyword: Keyword; value?: number }[];
  modifications: Modification[];
}

interface DroneStats {
  health?: number;
  currentHealth?: number;
  power?: number;
  currentPower?: number;
  armor?: number;
  speed?: number;
  weight?: number;
}
