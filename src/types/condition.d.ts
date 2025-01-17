import { Modifier } from './modifier';

export interface Condition {
  name: string;
  description: string;
  stacks?: number;
  modifiers: Modifier[];
}
