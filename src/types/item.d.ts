import { Action } from './action';
import { Modifier } from './modifier';
import { Picture } from './picture';

interface Item {
  id: number;
  name: string;
  rarity: string;
  grade: number;
  picture: Picture;
  price: number;
  equipped: boolean;
  category: ItemCategory;
  subcategory: ItemSubcategory;
  itemType: string;
  description: string;
  stats: Partial<ItemStats>;
  actions: Action[];
  modifiers: Modifier[];
}

interface ItemStats {
  currentPower?: number;
  power?: number;
  weight?: number;
  currentStacks?: number;
  maxStacks?: number;
}

enum ItemCategory {
  reusable = 'reusable',
  consumable = 'consumable',
}

enum ItemSubcategory {
  chemicalTherapy = 'chemicalTherapy',
  chemicalAssistance = 'chemicalAssistance',
  anomaly = 'anomaly',
  gadget = 'gadget',
  misc = 'misc',
}
