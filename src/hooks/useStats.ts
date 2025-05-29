import { Modifier } from 'src/types/modifier';
import useAttributeTree from './useAttributeTree';
import { AttributeTree } from 'src/types/attributeTree';
import { Perk } from 'src/types/perk';
import { SortedInventory } from 'src/types/character';
import { Item, Stats } from 'src/types/item';
import { useMemo } from 'react';

const useStats = (
  equipment: SortedInventory,
  attributTree: Partial<AttributeTree>,
  perks?: Perk[],
) => {
  const tree = useAttributeTree(attributTree);

  const weaponWeight = useMemo(
    () =>
      equipment?.weapons?.reduce((sum: number, weapon: Item) => {
        if (weapon.stats.weight) {
          return sum + weapon.stats.weight;
        }
        return sum;
      }, 0) || 0,
    [equipment],
  );

  const armorWeight = useMemo(
    () =>
      equipment?.armors?.reduce((sum: number, armor: Item) => {
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
      }, 0) || 0,
    [equipment],
  );

  const itemWeight = useMemo(() => {
    return equipment?.items?.length > 0
      ? equipment?.items?.reduce((sum: number, item: Item) => {
          if (item.stats.weight) {
            return sum + item.stats.weight;
          }
          return sum;
        }, 0)
      : 0;
  }, [equipment]);

  const armorValue = useMemo(
    () =>
      equipment?.armors?.reduce((sum: number, armor: Item) => {
        if (armor.stats.armor) {
          return sum + armor.stats.armor;
        }
        return sum;
      }, 0) || 0,
    [equipment],
  );

  const wardValue = useMemo(
    () =>
      equipment?.armors?.reduce((sum: number, armor: Item) => {
        if (armor.stats.ward) {
          return sum + armor.stats.ward;
        }
        return sum;
      }, 0) || 0,
    [equipment],
  );

  const equippedCyber = useMemo(
    () =>
      equipment?.augmentations?.reduce((sum: number, cybernetic: Item) => {
        if (cybernetic.stats.cyber) {
          return sum + cybernetic.stats.cyber;
        }
        return sum;
      }, 0) || 0,
    [equipment],
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

    const stat = modifier.stat as keyof Stats;

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

  // equipment?.actions.forEach((action: Action) => {
  //   if (!action.modifiers) return;

  //   action.modifiers?.forEach((modifier: Modifier) => {
  //     calculateBonus(modifier);
  //   });
  // });

  perks?.forEach((perk) => {
    if (!perk.modifiers) return;

    perk.modifiers?.forEach((modifier: Modifier) => {
      calculateBonus(modifier);
    });
  });

  return {
    stats,
    rollBonuses,
  };
};

export default useStats;
