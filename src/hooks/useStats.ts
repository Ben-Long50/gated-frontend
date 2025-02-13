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
    } else if (item.stats.currentStacks === 0) {
      return sum;
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
    maxHealth: 10 + tree.getPoints('violence', 'threshold') * 1,
    maxSanity: 5 + tree.getPoints('esoterica', 'mysticism') * 1,
    maxWeight: 10 + tree.getPoints('violence', 'threshold') * 1,
    maxCyber: 4 + tree.getPoints('cybernetica', 'chromebits') * 1,
    speed: 4 + tree.getPoints('violence', 'assault') * 1,
    armor: 0 + armorValue,
    ward: 0 + wardValue,
    evasion: 1,
    weight: 0 + weaponWeight + armorWeight + itemWeight,
    cyber: 0 + equippedCyber,
    permanentInjuries: 5,
    permanentInsanities: 5,
  };

  const rollBonuses = {} as { key: number };

  const getBonusValue = (modifier: Modifier) => {
    let bonusValue;

    switch (modifier.valueType) {
      case 'number':
        bonusValue = modifier.value || 0;
        break;
      case 'attribute':
        bonusValue = tree.getPoints(modifier.attribute);
        break;
      case 'skill':
        bonusValue = tree.getPoints(modifier.attribute, modifier.skill);
        break;
      default:
        bonusValue = 0;
        break;
    }

    return bonusValue;
  };

  const calculateBonus = (modifier: Modifier) => {
    const bonusValue = getBonusValue(modifier);

    if (modifier.type === 'stat') {
      const currentValue = stats[modifier.stat] || 0;

      switch (modifier.operator) {
        case 'add':
          stats[modifier.stat] = currentValue + bonusValue;
          break;
        case 'subtract':
          stats[modifier.stat] = currentValue - bonusValue;
          break;
        default:
          stats[modifier.stat] = bonusValue;
      }
    } else if (modifier.type === 'roll') {
      const currentValue = rollBonuses[modifier.action?.name] || 0;

      switch (modifier.operator) {
        case 'add':
          rollBonuses[modifier.action?.name] = currentValue + bonusValue;
          break;
        case 'subtract':
          rollBonuses[modifier.action?.name] = currentValue - bonusValue;
          break;
        default:
          rollBonuses[modifier.action?.name] = bonusValue;
      }
    }
  };

  equippedCybernetics?.forEach((cybernetic: CyberneticWithKeywords) => {
    if (!cybernetic.modifiers) return;

    cybernetic.modifiers.forEach((modifier: Modifier) => {
      calculateBonus(modifier);
    });
  });

  equippedItems?.forEach((item: Item) => {
    if (!item.modifiers) return;

    item.modifiers?.forEach((modifier: Modifier) => {
      calculateBonus(modifier);
    });
  });

  perks?.forEach((perk) => {
    if (!perk.modifiers) return;

    perk.modifiers?.forEach((modifier: Modifier) => {
      calculateBonus(modifier);
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
