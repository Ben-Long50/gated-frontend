import { CyberneticWithKeywords } from 'src/types/cybernetic';
import { WeaponWithKeywords } from 'src/types/weapon';
import { ArmorWithKeywords } from 'src/types/armor';
import { Modifier, StatModifier } from 'src/types/modifier';
import useAttributeTree from './useAttributeTree';
import { AttributeTree } from 'src/types/attributeTree';
import { Perk } from 'src/types/perk';
import useActions from './useActions';
import useEquipment from './useEquipment';
import { CharacterInventory } from 'src/types/character';
import { Item } from 'src/types/item';

const useStats = (
  inventory: CharacterInventory,
  attributTree: Partial<AttributeTree>,
  perks: Perk[],
) => {
  const tree = useAttributeTree(attributTree);

  const actions = useActions();

  const { equippedWeapons, equippedArmor, equippedCybernetics, equippedItems } =
    useEquipment(inventory);

  const weaponWeight = equippedWeapons?.reduce(
    (sum: number, weapon: WeaponWithKeywords) => {
      if (weapon.stats.weight) {
        return sum + weapon.stats.weight;
      }
      return sum;
    },
    0,
  );

  const armorWeight = equippedArmor?.reduce(
    (sum: number, armor: ArmorWithKeywords) => {
      if (
        armor.stats.weight &&
        armor.stats.currentPower !== null &&
        armor.stats.currentPower === 0
      ) {
        return sum + armor.stats.weight;
      } else if (armor.stats.weight && !armor.stats.power) {
        return sum + armor.stats.weight;
      }
      return sum;
    },
    0,
  );

  const itemWeight = equippedItems?.reduce((sum: number, item: Item) => {
    if (item.stats.currentStacks && item.stats.weight) {
      return sum + item.stats.currentStacks * item.stats.weight;
    } else if (item.stats.weight) {
      return sum + item.stats.weight;
    }
    return sum;
  }, 0);

  const armorValue = equippedArmor?.reduce(
    (sum: number, armor: ArmorWithKeywords) => {
      if (armor.stats.armor) {
        return sum + armor.stats.armor;
      }
      return sum;
    },
    0,
  );

  const wardValue = equippedArmor?.reduce(
    (sum: number, armor: ArmorWithKeywords) => {
      if (armor.stats.ward) {
        return sum + armor.stats.ward;
      }
      return sum;
    },
    0,
  );

  const equippedCyber = equippedCybernetics?.reduce(
    (sum: number, cybernetic: CyberneticWithKeywords) => {
      if (cybernetic.stats.cyber) {
        return sum + cybernetic.stats.cyber;
      }
      return sum;
    },
    0,
  );

  const stats = {
    maxHealth: 10 + tree.getPoints('violence', 'threshold') * 2,
    maxSanity: 5 + tree.getPoints('esoterica', 'mysticism') * 2,
    maxWeight: 10 + tree.getPoints('violence', 'threshold') * 2,
    maxCyber: 4 + tree.getPoints('cybernetica', 'chromebits') * 2,
    speed: 4 + tree.getPoints('violence', 'assault') * 2,
    armor: 0 + armorValue,
    ward: 0 + wardValue,
    evasion: 1,
    weight: 0 + weaponWeight + armorWeight + itemWeight,
    cyber: 0 + equippedCyber,
    permanentInjuries: 5,
    permanentInsanities: 5,
  };

  const rollBonuses = {} as { key: number };

  equippedCybernetics?.forEach((cybernetic) => {
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
