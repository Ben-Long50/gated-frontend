import { ArmorWithKeywords } from './armor';
import { CyberneticWithKeywords } from './cybernetic';
import { Item } from './item';
import { Keyword } from './keyword';
import { VehicleWithWeapons } from './vehicle';
import { WeaponWithKeywords } from './weapon';

export type ItemObject =
  | WeaponWithKeywords
  | ArmorWithKeywords
  | CyberneticWithKeywords
  | VehicleWithWeapons
  | Item;
