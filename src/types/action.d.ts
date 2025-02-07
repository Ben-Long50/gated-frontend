import { Cybernetic } from './cybernetic';

export interface Action {
  id: number;
  name: string;
  description: string;
  costs: ActionCost[];
  attribute: string;
  skill: string;
  actionType: ActionType;
  actionSubtypes: string[];
  cybernetics: Cybernetic[];
}

interface ActionCost {
  stat: ActionCostStat;
  value: number;
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
