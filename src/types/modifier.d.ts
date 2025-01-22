export type Modifier = StatModifier | RollModifier;

export interface StatModifier {
  type: 'Stat';
  stat: Stat;
  operator: ModifierOperator;
  value: number;
}

export interface RollModifier {
  type: 'Roll';
  action: number;
  operator: ModifierOperator;
  dice: number;
}

// export enum Stat {
//   currentHealth = 'currentHealth',
//   maxHealth = 'maxHealth',
//   currentSanity = 'currentSanity',
//   maxSanity = 'maxSanity',
//   cyber = 'cyber',
//   equip = 'equip',
//   speed = 'speed',
//   evasion = 'evasion',
//   armor = 'armor',
//   ward = 'ward',
// }

export type ModifierType = 'Stat' | 'Roll';

export type Stat =
  | 'Health'
  | 'Max health'
  | 'Sanity'
  | 'Max sanity'
  | 'Cyber'
  | 'Equip'
  | 'Speed'
  | 'Evasion'
  | 'Armor'
  | 'Ward'
  | 'Permanent injury'
  | 'Permanent insanity';

export type ModifierOperator = 'add' | 'subtract' | 'multiply' | 'divide';

// export enum ModifierOperator {
//   add = 'add',
//   subtract = 'subtract',
//   multiply = 'multiply',
//   divide = 'divide',
// }
