import { ArmorWithKeywords } from './armor';
import { AttributeTree } from './attributeTree';
import { Campaign } from './campaign';
import { CyberneticWithKeywords } from './cybernetic';
import { Gang } from './gang';
import { Perk } from './perk';
import { Picture } from './picture';
import { VehicleWithWeapons } from './vehicle';
import { WeaponWithKeywords } from './weapon';

interface Character {
  id: number;
  userId: number;
  level: number;
  picture: Picture;
  profits: number;
  stats: CharacterStats;
  height: number;
  weight: number;
  age: number;
  sex: string;
  gang?: Gang;
  gangId?: number;
  campaign?: Campaign;
  campaignId?: number;
  backstory: { html: string; nodes: string };
  firstTaste: { html: string; nodes: string };
  badMedicine: { html: string; nodes: string };
  attributes: Partial<AttributeTree>;
  firstName: string;
  lastName: string;
  active: boolean;
  playerCharacter: boolean;
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
