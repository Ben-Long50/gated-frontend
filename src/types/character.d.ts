import { ArmorWithKeywords } from './armor';
import { AttributeTree } from './attributeTree';
import { CyberneticWithKeywords } from './cybernetic';
import { Perk } from './perk';
import { Picture } from './picture';
import { VehicleWithWeapons } from './vehicle';
import { WeaponWithKeywords } from './weapon';

interface Character {
  id: number;
  level: number;
  picture: Picture;
  profits: number;
  stats: CharacterStats;
  height: number;
  weight: number;
  age: number;
  sex: string;
  background: string;
  attributes: Partial<AttributeTree>;
  firstName: string;
  lastName: string;
  active: boolean;
  perks: Perk[];
  weapons: WeaponWithKeywords[];
  armor: ArmorWithKeywords[];
  cybernetics: CyberneticWithKeywords[];
  characterCart: CharacterCart;
  characterInventory: CharacterInventory;
}

interface CharacterStats {
  currentHealth: number;
  currentSanity: number;
  injuries: number;
  insanities: number;
}

interface CharacterCart {
  id: number;
  characterId: number;
  weapons: WeaponWithKeywords[];
  armor: ArmorWithKeywords[];
  cybernetics: CyberneticWithKeywords[];
  vehicles: VehicleWithWeapons[];
}

interface CharacterInventory {
  id: number;
  characterId: number;
  weapons: Weapon[];
  armor: Armor[];
  cybernetics: Cybernetic[];
  vehicles: Vehicle[];
  items: Item[];
}
