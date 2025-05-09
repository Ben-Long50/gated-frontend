import { Action } from './action';
import { ArmorWithKeywords } from './armor';
import { AttributeTree } from './attributeTree';
import { Campaign } from './campaign';
import { CyberneticWithKeywords } from './cybernetic';
import { Drone } from './drone';
import { Gang } from './gang';
import { Item } from './item';
import { Perk } from './perk';
import { Picture } from './picture';
import { Modification, Vehicle, VehicleWithWeapons } from './vehicle';
import { Weapon, WeaponWithKeywords } from './weapon';

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
  weapons: CartWeaponReference[];
  armor: CartArmorReference[];
  cybernetics: CartCyberneticReference[];
  vehicles: CartVehicleReference[];
  drones: CartDroneReference[];
  modifications: CartModificationReference[];
  items: CartItemReference[];
}

interface CharacterInventory {
  id: number;
  characterId: number;
  weapons: Weapon[];
  armor: Armor[];
  cybernetics: Cybernetic[];
  vehicles: Vehicle[];
  drones: Drone[];
  items: Item[];
  actions: Action[];
}

interface CartWeaponReference {
  id: number;
  characterCartId: number;
  weaponId: number;
  weapon: WeaponWithKeywords;
  quantity: number;
}

interface CartArmorReference {
  id: number;
  characterCartId: number;
  armorId: number;
  armor: ArmorWithKeywords;
  quantity: number;
}

interface CartCyberneticReference {
  id: number;
  characterCartId: number;
  cyberneticId: number;
  cybernetic: CyberneticWithKeywords;
  quantity: number;
}

interface CartVehicleReference {
  id: number;
  characterCartId: number;
  vehicleId: number;
  vehicle: Vehicle;
  quantity: number;
}

interface CartDroneReference {
  id: number;
  characterCartId: number;
  droneId: number;
  drone: Drone;
  quantity: number;
}

interface CartModificationReference {
  id: number;
  characterCartId: number;
  modificationId: number;
  modification: Modification;
  quantity: number;
}

interface CartItemReference {
  id: number;
  characterCartId: number;
  itemId: number;
  item: Item;
  quantity: number;
}
