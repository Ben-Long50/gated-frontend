import { Cybernetic } from 'src/types/cybernetic';
import { Weapon } from 'src/types/weapon';
import { Armor } from 'src/types/armor';
import { Modifier, StatModifier } from 'src/types/modifier';
import useAttributeTree from './useAttributeTree';
import { AttributeTree } from 'src/types/attributeTree';
import { Perk } from 'src/types/perk';
import useActions from './useActions';

const useStats = (
  equipment: {
    weapons: Weapon[];
    armor: Armor[];
    cybernetics: Cybernetic[];
  },
  attributTree: Partial<AttributeTree>,
  perks: Perk[],
) => {
  const tree = useAttributeTree(attributTree);

  const actions = useActions();

  const weaponWeight =
    equipment?.weapons?.reduce((sum: number, weapon) => {
      if (weapon.stats.weight) {
        return sum + weapon.stats.weight;
      }
      return sum;
    }, 0) || 0;

  const armorWeight =
    equipment?.armor?.reduce((sum: number, armor) => {
      if (
        armor.stats.weight &&
        armor.stats.currentPower &&
        armor.stats.currentPower === 0
      ) {
        return sum + armor.stats.weight;
      }
      return sum;
    }, 0) || 0;

  const armorValue = equipment?.armor?.reduce((sum: number, armor) => {
    if (armor.stats.armor) {
      return sum + armor.stats.armor;
    }
    return sum;
  }, 0);

  const wardValue = equipment?.armor?.reduce((sum: number, armor) => {
    if (armor.stats.ward) {
      return sum + armor.stats.ward;
    }
    return sum;
  }, 0);

  const equippedCyber =
    equipment?.cybernetics?.reduce((sum: number, cybernetic) => {
      if (cybernetic.stats.cyber) {
        return sum + cybernetic.stats.cyber;
      }
      return sum;
    }, 0) || 0;

  const stats = {
    maxHealth: 10 + tree.getPoints('violence', 'threshold') * 2,
    maxSanity: 5 + tree.getPoints('esoterica', 'mysticism') * 2,
    maxWeight: 10 + tree.getPoints('violence', 'threshold') * 2,
    maxCyber: 4 + tree.getPoints('cybernetica', 'chromebits') * 2,
    speed: 4 + tree.getPoints('violence', 'assault') * 2,
    armor: armorValue,
    ward: 0 + wardValue,
    evasion: 1,
    weight: weaponWeight + armorWeight,
    cyber: equippedCyber,
    permanentInjuries: 5,
    permanentInsanities: 5,
  };

  const rollBonuses = {} as { key: number };

  equipment?.cybernetics?.forEach((cybernetic) => {
    if (!cybernetic.modifiers) return;

    cybernetic.modifiers.forEach((modifier: Modifier) => {
      if (modifier.type === 'Stat') {
        const statKey = modifier.stat.toLowerCase();
        const currentValue = stats[statKey] ?? 0;

        switch (modifier.operator) {
          case 'add':
            stats[statKey] = currentValue + modifier.value;
            break;
          case 'subtract':
            stats[statKey] = currentValue - modifier.value;
            break;
          default:
            stats[statKey] = modifier.value;
        }
      } else if (modifier.type === 'Roll') {
        const actionData = actions?.filteredActions?.filter(
          (action) => modifier?.action == action?.id,
        )[0];

        const currentValue = rollBonuses[actionData?.name] || 0;

        switch (modifier.operator) {
          case 'add':
            rollBonuses[actionData?.name] = currentValue + modifier.dice;
            break;
          case 'subtract':
            rollBonuses[actionData?.name] = currentValue - modifier.dice;
            break;
          default:
            rollBonuses[actionData?.name] = modifier.dice;
        }
      }
    });
  });

  perks?.forEach((perk) => {
    if (!perk.modifiers) return;

    perk.modifiers?.forEach((modifier: StatModifier) => {
      let statKey;

      switch (modifier.stat) {
        case 'Cyber':
          statKey = 'maxCyber';
          break;
        case 'Max health':
          statKey = 'maxHealth';
          break;
        case 'Permanent injury':
          statKey = 'permanentInjuries';
          break;
        default:
          break;
      }

      const currentValue = stats[statKey] ?? 0;

      switch (modifier.operator) {
        case 'add':
          stats[statKey] = currentValue + modifier.value;
          break;
        case 'subtract':
          stats[statKey] = currentValue - modifier.value;
          break;
        default:
          stats[statKey] = modifier.value;
      }
    });
  });

  return {
    stats,
    rollBonuses,
    isLoading: actions.isLoading,
    isPending: actions.isPending,
  };
};

export default useStats;
