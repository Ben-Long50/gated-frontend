import useAttributeTree from './useAttributeTree';
import { AttributeTree } from 'src/types/attributeTree';
import { Perk } from 'src/types/perk';
import { CharacterStats, SortedInventory } from 'src/types/character';
import { Item, Stats } from 'src/types/item';
import { useMemo } from 'react';
import { Action } from 'src/types/action';

const useStats = (
  equipment: SortedInventory | null,
  actions: Action[],
  attributTree: Partial<AttributeTree>,
  perks?: Perk[],
) => {
  const tree = useAttributeTree(attributTree);

  const armorWeight = useMemo(
    () =>
      equipment?.armors?.reduce((sum: number, armor: Item) => {
        if (armor.stats.weight && !armor.stats.currentPower) {
          return sum + armor.stats.weight;
        }
        return sum;
      }, 0) || 0,
    [equipment],
  );

  const nonArmorWeight = useMemo(() => {
    const itemArray = [
      ...(equipment?.weapons || []),
      ...(equipment?.reusables || []),
      ...(equipment?.consumables || []),
    ];

    return (
      itemArray.reduce((sum: number, item: Item) => {
        if (item.stats.weight) {
          return sum + item.stats.weight;
        }
        return sum;
      }, 0) || 0
    );
  }, [equipment]);

  const armorValue = useMemo(
    () =>
      equipment?.armors?.reduce((sum: number, armor: Item) => {
        if (armor.stats.armor && armor.stats.currentBlock) {
          return sum + armor.stats.armor;
        }
        return sum;
      }, 0) || 0,
    [equipment],
  );

  const wardValue = useMemo(
    () =>
      equipment?.armors?.reduce((sum: number, armor: Item) => {
        if (armor.stats.ward && armor.stats.currentBlock) {
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
    maxHealth: 10 + tree.getPoints('violence', 'threshold') * 2,
    maxSanity: 5 + tree.getPoints('esoterica', 'mysticism') * 1,
    maxEquip: 10 + tree.getPoints('violence', 'threshold') * 1,
    maxCyber: 4 + tree.getPoints('cybernetica', 'chromebits') * 1,
    speed: 4 + tree.getPoints('violence', 'assault') * 1,
    armor: 0 + armorValue,
    ward: 0 + wardValue,
    evasion: 1,
    weight: 0 + nonArmorWeight + armorWeight,
    cyber: 0 + equippedCyber,
    permanentInjuries: 5,
    permanentInsanities: 5,
    actions: 3,
    reactions: 1,
    chomebitsTn: tree.getPoints('cybernetica', 'chromebits'),
    hardwiredTn: tree.getPoints('cybernetica', 'hardwired'),
    motorizedTn: tree.getPoints('cybernetica', 'motorized'),
    networkedTn: tree.getPoints('cybernetica', 'networked'),
    gestaltTn: tree.getPoints('esoterica', 'gestalt'),
    godheadTn: tree.getPoints('esoterica', 'godhead'),
    mysticismTn: tree.getPoints('esoterica', 'mysticism'),
    outerworldTn: tree.getPoints('esoterica', 'outerworld'),
    barterTn: tree.getPoints('peace', 'barter'),
    rhetoricTn: tree.getPoints('peace', 'rhetoric'),
    eruditionTn: tree.getPoints('peace', 'erudition'),
    treatmentTn: tree.getPoints('peace', 'treatment'),
    assaultTn: tree.getPoints('violence', 'assault'),
    shootingTn: tree.getPoints('violence', 'shooting'),
    subterfugeTn: tree.getPoints('violence', 'subterfuge'),
    thresholdTn: tree.getPoints('violence', 'threshold'),
  } as CharacterStats;

  const calculateBonus = (modifiers: CharacterStats) => {
    Object.entries(modifiers).forEach(([stat, value]) => {
      const currentValue = stats[stat as keyof CharacterStats] || 0;

      if (typeof value === 'number') {
        stats[stat as keyof CharacterStats] = currentValue + value;
      } else if (
        ['chromebits', 'hardwired', 'motorized', 'networked'].some(
          (item) => item === value,
        )
      ) {
        stats[stat as keyof CharacterStats] =
          currentValue + tree.getPoints('cybernetica', value);
      } else if (
        ['gestalt', 'godhead', 'mysticism', 'outerworld'].some(
          (item) => item === value,
        )
      ) {
        stats[stat as keyof CharacterStats] =
          currentValue + tree.getPoints('esoterica', value);
      } else if (
        ['barter', 'rhetoric', 'erudition', 'treatment'].some(
          (item) => item === value,
        )
      ) {
        stats[stat as keyof CharacterStats] =
          currentValue + tree.getPoints('peace', value);
      } else if (
        ['assault', 'shooting', 'subterfuge', 'threshold'].some(
          (item) => item === value,
        )
      ) {
        stats[stat as keyof CharacterStats] =
          currentValue + tree.getPoints('violence', value);
      }
    });
  };

  const activeActions = actions.filter(
    (action) => action.active && action.modifiers,
  );

  activeActions?.forEach((action) => {
    calculateBonus(action.modifiers);
  });

  perks?.forEach((perk) => {
    if (!perk.modifiers) return;

    calculateBonus(perk.modifiers);
  });

  return {
    stats,
  };
};

export default useStats;
