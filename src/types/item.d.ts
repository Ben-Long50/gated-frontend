import { Action } from './action';
import { ConditionReference } from './condition';
import { Keyword } from './keyword';
import { Picture } from './picture';

interface Item {
  id: number;
  updatedAt: Date;
  name: string;
  itemType: ItemType;
  itemSubtype?: string;
  rarity: string;
  grade: number;
  picture: Picture;
  price: number | null;
  equipped: boolean;
  description: string;
  stats: Stats;
  modifiedStats?: Stats;
  keywords: { keyword: Keyword; value: number | null }[];
  modifiedKeywords: { keyword: Keyword; value: number | null }[];
  conditions: ConditionReference[];
  itemLinkReference?: LinkReference;
  baseItemId: number | null;
  baseItem: Item | null;
}

interface LinkReference {
  id: number;
  itemId: number;
  items: Item[];
  actions: Action[];
}

interface Stats {
  damage?: number;
  salvo?: number;
  flurry?: number;
  range?: number;
  currentAmmoCount?: number;
  magCapacity?: number;
  currentMagCount?: number;
  magCount?: number;
  armor?: number;
  ward?: number;
  currentBlock?: number;
  block?: number;
  cyber?: number;
  currentPower?: number;
  power?: number;
  weight?: number;
  size?: number;
  speed?: number;
  agility?: number;
  hull?: number;
  currentHull?: number;
  cargo?: number;
  currentCargo?: number;
  hangar?: number;
  currentHangar?: number;
  pass?: number;
  currentPass?: number;
  weapon?: number;
  currentWeapon?: number;
}

enum ItemType {
  weapon = 'weapon',
  armor = 'armor',
  augmentation = 'augmentation',
  vehicle = 'vehicle',
  drone = 'drone',
  modification = 'modification',
  reusable = 'reusable',
  consumable = 'consumable',
}
