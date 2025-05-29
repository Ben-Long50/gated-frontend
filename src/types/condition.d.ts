import { Item } from './item';

export interface ConditionReference {
  id: number;
  condition: Condition;
  conditionId: number;
  itemId?: number;
  characterId?: number;
  stacks?: number;
}

export interface Condition {
  id: number;
  name: string;
  conditionType: ConditionType;
  description: string;
}

enum ConditionType {
  character = 'character',
  item = 'item',
}
