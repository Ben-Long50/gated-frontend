import { Action } from './action';

export type Modifier = StatModifier | RollModifier;

export interface StatModifier {
  type: 'Stat';
  stat: Stat;
  operator: ModifierOperator;
  value: number;
  duration?: { unit: string; value: number };
}

export interface RollModifier {
  type: 'Roll';
  action: Action;
  operator: ModifierOperator;
  dice: number;
  duration?: { unit: string; value: number };
}

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
