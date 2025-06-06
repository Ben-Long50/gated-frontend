import { AttributeName, SkillName } from './attributeTree';
import { Stats } from './item';

interface Action {
  id: number;
  name: string;
  description: string;
  costs: ActionCosts;
  roll: ActionRoll[];
  equipped: boolean;
  active: boolean;
  available: boolean;
  actionType: ActionType;
  actionSubtypes: string[];
  duration: { unit: string; value: number | null };
  cooldown: { unit: string; value: number | null };
  modifiers: Stats;
  keywordModifiers: { keyword: Keyword; value: number | null }[];
}

interface ActionCosts {
  actionPoints?: number | null;
  reactionPoints?: number | null;
  power?: number | null;
  health?: number | null;
  sanity?: number | null;
  wyrmShells?: number | null;
  currentAmmoCount?: number | null;
}

interface ActionRoll {
  attribute: AttributeName;
  skill: SkillName;
}

enum ActionType {
  action = 'action',
  extendedAction = 'extendedAction',
  reaction = 'reaction',
  passive = 'passive',
}

enum ActionCostStat {
  actionPoints = 'actionPoints',
  reactionPoints = 'reactionPoints',
  health = 'health',
  sanity = 'sanity',
  power = 'power',
  wyrmShells = 'wyrmShells',
}
