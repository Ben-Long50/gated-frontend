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
