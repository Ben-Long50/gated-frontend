import { Picture } from './picture';
import { Weapon, WeaponWithKeywords } from './weapon';

export interface Vehicle {
  id: number;
  name: string;
  rarity: string;
  grade: number;
  picture: Picture;
  description: string;
  stats: VehicleStats;
  price: number;
  weapons: Weapon[];
  modifications: number[];
}

export interface VehicleWithWeapons {
  id: number;
  name: string;
  rarity: string;
  grade: number;
  picture: Picture;
  description: string;
  stats: VehicleStats;
  price: number;
  weapons: WeaponWithKeywords[];
  modifications: Modification[];
}

interface VehicleStats {
  size?: number;
  speed?: number;
  agility?: number;
  hull?: number;
  armor?: number;
  cargo?: number;
  hangar?: number;
  pass?: number;
  weapon?: number;
}

export interface Modification {
  id: number;
  name: string;
  rarity: string;
  grade: number;
  modificationType: string;
  description: string;
  price: number;
  vehicleId: number | null;
}
