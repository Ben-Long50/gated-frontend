import { AttributeTree } from 'src/types/attributeTree';
import { Perk } from 'src/types/perk';
import { CharacterStats, SortedInventory } from 'src/types/character';
import { Item } from 'src/types/item';
import { useMemo } from 'react';
import { Action } from 'src/types/action';

const useStats = (
  equipment: SortedInventory | null,
  actions: Action[],
  attributeTree: AttributeTree,
  perks?: Perk[],
) => {
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

  const baseStats: CharacterStats = useMemo(
    () => ({
      maxHealth: 10 + attributeTree?.violence.skills.threshold.points * 2,
      maxSanity: 5 + attributeTree?.esoterica.skills.mysticism.points * 1,
      maxEquip: 10 + attributeTree?.violence.skills.threshold.points * 1,
      maxCyber: 4 + attributeTree?.cybernetica.skills.chromebits.points * 1,
      speed: 4 + attributeTree?.violence.skills.assault.points * 1,
      armor: 0 + armorValue,
      ward: 0 + wardValue,
      evasion: 1,
      weight: 0 + nonArmorWeight + armorWeight,
      cyber: 0 + equippedCyber,
      permanentInjuries: 5,
      permanentInsanities: 5,
      actions: 3,
      reactions: 1,
      chomebitsTn: attributeTree?.cybernetica.skills.chromebits.points,
      hardwiredTn: attributeTree?.cybernetica.skills.hardwired.points,
      motorizedTn: attributeTree?.cybernetica.skills.motorized.points,
      networkedTn: attributeTree?.cybernetica.skills.networked.points,
      gestaltTn: attributeTree?.esoterica.skills.gestalt.points,
      godheadTn: attributeTree?.esoterica.skills.godhead.points,
      mysticismTn: attributeTree?.esoterica.skills.mysticism.points,
      outerworldTn: attributeTree?.esoterica.skills.outerworld.points,
      barterTn: attributeTree?.peace.skills.barter.points,
      rhetoricTn: attributeTree?.peace.skills.rhetoric.points,
      eruditionTn: attributeTree?.peace.skills.erudition.points,
      treatmentTn: attributeTree?.peace.skills.treatment.points,
      assaultTn: attributeTree?.violence.skills.assault.points,
      shootingTn: attributeTree?.violence.skills.shooting.points,
      subterfugeTn: attributeTree?.violence.skills.subterfuge.points,
      thresholdTn: attributeTree?.violence.skills.threshold.points,
    }),
    [
      armorValue,
      wardValue,
      nonArmorWeight,
      armorWeight,
      equippedCyber,
      attributeTree,
    ],
  );

  const calculateBonus = (
    base: CharacterStats,
    modifiers: CharacterStats,
  ): CharacterStats => {
    const updated = { ...base };

    Object.entries(modifiers).forEach(([stat, value]) => {
      const currentValue = updated[stat as keyof CharacterStats] || 0;

      if (typeof value === 'number') {
        updated[stat as keyof CharacterStats] = currentValue + value;
      } else if (
        ['chromebits', 'hardwired', 'motorized', 'networked'].includes(value)
      ) {
        updated[stat as keyof CharacterStats] =
          currentValue +
          attributeTree.cybernetica.skills[
            value as keyof typeof attributeTree.cybernetica.skills
          ].points;
      } else if (
        ['gestalt', 'godhead', 'mysticism', 'outerworld'].includes(value)
      ) {
        updated[stat as keyof CharacterStats] =
          currentValue +
          attributeTree.esoterica.skills[
            value as keyof typeof attributeTree.esoterica.skills
          ].points;
      } else if (
        ['barter', 'rhetoric', 'erudition', 'treatment'].includes(value)
      ) {
        updated[stat as keyof CharacterStats] =
          currentValue +
          attributeTree.peace.skills[
            value as keyof typeof attributeTree.peace.skills
          ].points;
      } else if (
        ['assault', 'shooting', 'subterfuge', 'threshold'].includes(value)
      ) {
        updated[stat as keyof CharacterStats] =
          currentValue +
          attributeTree.violence.skills[
            value as keyof typeof attributeTree.violence.skills
          ].points;
      }
    });

    return updated;
  };

  const finalStats = useMemo(() => {
    let stats = { ...baseStats };

    actions.forEach((action) => {
      if (action.active && action.modifiers) {
        stats = calculateBonus(stats, action.modifiers);
      }
    });

    perks?.forEach((perk) => {
      if (perk.modifiers) {
        stats = calculateBonus(stats, perk.modifiers);
      }
    });

    return stats;
  }, [baseStats, actions, perks]);

  return {
    stats: finalStats,
  };
};

export default useStats;
