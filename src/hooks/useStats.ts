import useAttributeTree from './useAttributeTree';
import { AttributeTree } from 'src/types/attributeTree';
import { Perk } from 'src/types/perk';
import { SortedInventory } from 'src/types/character';
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

  const itemWeight = useMemo(
    () =>
      equipment?.items?.reduce((sum: number, item: Item) => {
        if (item.stats.weight) {
          return sum + item.stats.weight;
        }
        return sum;
      }, 0) || 0,
    [equipment],
  );

  const armorValue = useMemo(
    () =>
      equipment?.armors?.reduce((sum: number, armor: Item) => {
        if (
          armor.stats.armor &&
          armor.stats.currentBlock &&
          armor.stats.currentBlock > 0
        ) {
          return sum + armor.stats.armor;
        }
        return sum;
      }, 0) || 0,
    [equipment],
  );

  const wardValue = useMemo(
    () =>
      equipment?.armors?.reduce((sum: number, armor: Item) => {
        if (
          armor.stats.ward &&
          armor.stats.currentBlock &&
          armor.stats.currentBlock > 0
        ) {
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
    weight: 0 + weaponWeight + armorWeight + itemWeight,
    cyber: 0 + equippedCyber,
    permanentInjuries: 5,
    permanentInsanities: 5,
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
  };

  const calculateBonus = (modifiers: Stats) => {
    Object.entries(modifiers).forEach(([stat, value]) => {
      const currentValue = stats[stat];
      stats[stat] = currentValue + value;
    });
  };

  actions?.forEach((action) => {
    if (!action.modifiers) return;

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
