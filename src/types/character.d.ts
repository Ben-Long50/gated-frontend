import { Action } from './action';
import { AttributeTree } from './attributeTree';
import { Campaign } from './campaign';
import { Condition } from './condition';
import { Gang } from './gang';
import { Item } from './item';
import { Perk } from './perk';
import { Picture } from './picture';

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
  preferences: CharacterPreferences;
  perks: Perk[];
  conditions: { condition: Condition; stacks: number | null }[];
  characterCart: CharacterCart;
  characterInventory: CharacterInventory;
}

interface CharacterStats {
  currentHealth: number;
  currentSanity: number;
  injuries: number;
  insanities: number;
}

interface CharacterPreferences {
  firstName: boolean;
  lastName: boolean;
  age: boolean;
  height: boolean;
  weight: boolean;
  sex: boolean;
  picture: boolean;
  backstory: boolean;
  level: boolean;
  profits: boolean;
  stats: boolean;
  attributes: boolean;
  perks: boolean;
  equipment: boolean;
}

interface CharacterCart {
  id: number;
  characterId: number;
  items: CartItemReference[];
}

interface CharacterInventory {
  id: number;
  characterId: number;
  items: Item[];
  actions: Action[];
}

interface SortedInventory {
  weapons: Item[];
  armor: Item[];
  cybernetics: Item[];
  vehicles: Item[];
  drones: Item[];
  items: Item[];
}

interface CartItemReference {
  id: number;
  characterCartId: number;
  itemId: number;
  item: Item;
  quantity: number;
}
