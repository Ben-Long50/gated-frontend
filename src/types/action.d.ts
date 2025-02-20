import { Cybernetic } from './cybernetic';

export interface Action {
  id: number;
  name: string;
  description: string;
  costs: ActionCost[];
  roll: ActionRoll[];
  actionType: ActionType;
  actionSubtypes: string[];
  duration: { unit: string; value: number | null };
  cybernetics: Cybernetic[];
}

interface ActionCost {
  stat: ActionCostStat;
  value: number;
}

interface ActionRoll {
  attribute: string;
  skill: string;
}

enum ActionType {
  action = 'action',
  extendedAction = 'extendedAction',
  reaction = 'reaction',
}

enum ActionCostStat {
  actionPoints = 'actionPoints',
  reactionPoints = 'reactionPoints',
  health = 'health',
  sanity = 'sanity',
  power = 'power',
  wyrmShells = 'wyrmShells',
}
