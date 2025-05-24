import { FormApi, useStore } from '@tanstack/react-form';
import { Item } from 'src/types/item';
import useItemStats from './useItemStats';
import gradePointMap from './gradePointMap';

const useGradePoints = (form: FormApi, item: Item) => {
  const { powerLevel } = useItemStats([item]);

  const newGrade = useStore(form.store, (state) => state.values.grade);

  const newStats = useStore(form.store, (state) => state.values.modifiedStats);

  const usedGp = (
    Object.entries(newStats) as [keyof typeof gradePointMap, number][]
  ).reduce((sum, [stat, value]) => {
    let level =
      item?.modifiedStats && item?.modifiedStats[stat]
        ? value - item?.modifiedStats[stat]
        : value;
    let totalGpCost = 0;
    for (level; level > 0; level--) {
      totalGpCost =
        item?.stats && item.stats[stat]
          ? gradePointMap[stat](level + item.stats[stat]) + totalGpCost
          : gradePointMap[stat](level) + totalGpCost;
    }
    return sum + totalGpCost;
  }, 0);

  const availableGp = (newGrade - item?.grade) * 5 - usedGp;

  const upgradePrice = (() => {
    let cost = 0;
    for (let grade = newGrade; grade > item?.grade; grade--) {
      cost = item?.price ? cost + grade * (item?.price / 4) : 0;
    }
    return Math.ceil(cost);
  })();

  const upgradedPowerLevel = powerLevel
    ? (
        Object.entries(newStats) as [keyof typeof gradePointMap, number][]
      ).reduce((sum, [stat, value]) => {
        if (gradePointMap[stat]) {
          return sum + gradePointMap[stat](value);
        } else {
          return sum;
        }
      }, 0) + powerLevel
    : null;

  return {
    gradePointMap,
    availableGp,
    upgradePrice,
    powerLevel,
    upgradedPowerLevel,
  };
};

export default useGradePoints;
