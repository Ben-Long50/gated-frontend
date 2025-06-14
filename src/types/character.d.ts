import { Action } from './action';
import { AttributeTree } from './attributeTree';
import { Campaign } from './campaign';
import { Condition, ConditionReference } from './condition';
import { Affiliation } from './faction';
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
  attributes: AttributeTree;
  firstName: string;
  lastName: string;
  active: boolean;
  playerCharacter: boolean;
  npcTypes?: string[];
  preferences: CharacterPreferences;
  perks: Perk[];
  conditions: ConditionReference[];
  characterCart: CharacterCart;
  characterInventory: CharacterInventory;
  affiliations: Affiliation[];
}

interface CharacterStats {
  maxHealth?: number;
  currentHealth?: number;
  maxSanity?: number;
  currentSanity?: number;
  maxCyber?: number;
  cyber?: number;
  maxEquip?: number;
  weight?: number;
  injuries?: number;
  insanities?: number;
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
  armors: Item[];
  augmentations: Item[];
  vehicles: Item[];
  drones: Item[];
  reusables: Item[];
  consumables: Item[];
  actions: Action[];
}

interface CartItemReference {
  id: number;
  characterCartId: number;
  itemId: number;
  item: Item;
  quantity: number;
}
