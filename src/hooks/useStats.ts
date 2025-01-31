import { Cybernetic } from 'src/types/cybernetic';
import { Weapon } from 'src/types/weapon';
import { Armor } from 'src/types/armor';
import { StatModifier } from 'src/types/modifier';
import useAttributeTree from './useAttributeTree';
import { AttributeTree } from 'src/types/attributeTree';

const useStats = (
  equipment: {
    weapons: Weapon[];
    armor: Armor[];
    cybernetics: Cybernetic[];
  },
  attributTree: Partial<AttributeTree>,
) => {
  const tree = useAttributeTree(attributTree);
  console.log(tree.tree);

  const weaponWeight = equipment?.weapons?.reduce((sum: number, weapon) => {
    if (weapon.stats.weight) {
      return sum + weapon.stats.weight;
    }
    return 0;
  }, 0);

  const armorWeight = equipment?.armor?.reduce((sum: number, armor) => {
    if (armor.stats.weight) {
      return sum + armor.stats.weight;
    }
    return 0;
  }, 0);

  const armorValue = equipment?.armor?.reduce((sum: number, armor) => {
    if (armor.stats.armor) {
      return sum + armor.stats.armor;
    }
    return 0;
  }, 0);

  const wardValue = equipment?.armor?.reduce((sum: number, armor) => {
    if (armor.stats.ward) {
      return sum + armor.stats.ward;
    }
    return 0;
  }, 0);

  const equippedCyber = equipment?.cybernetics?.reduce(
    (sum: number, cybernetic) => {
      if (cybernetic.stats.cyber) {
        return sum + cybernetic.stats.cyber;
      }
      return 0;
    },
    0,
  );

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
  };

  equipment?.cybernetics?.forEach((cybernetic) => {
    if (!cybernetic.modifiers) return;

    cybernetic.modifiers.forEach((modifier: StatModifier) => {
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
    });
  });
  console.log(stats);

  return {
    stats,
  };
};

export default useStats;
