import { Action } from './action';
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
  ownerId: number;
  name: string;
  rarity: string;
  grade: number;
  picture: Picture;
  description: string;
  stats: VehicleStats;
  price: number;
  equipped: boolean;
  weapons: WeaponWithKeywords[];
  actions: Action[];
  modifications: Modification[];
}

interface VehicleStats {
  size?: number;
  speed?: number;
  agility?: number;
  hull?: number;
  currentHull?: number;
  armor?: number;
  cargo?: number;
  currentCargo?: number;
  hangar?: number;
  currentHangar?: number;
  pass?: number;
  currentPass?: number;
  weapon?: number;
  currentWeapon?: number;
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
