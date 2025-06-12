import { FormApi, useStore } from '@tanstack/react-form';
import { Item } from 'src/types/item';
import useItemStats from './useItemStats';
import upgradePointMap from './upgradePointMap';

const useUpgradePoints = (form: FormApi, item: Item) => {
  const { powerLevel } = useItemStats(item);

  const newGrade = useStore(form.store, (state) => state.values.grade);

  const newStats = useStore(form.store, (state) => state.values.modifiedStats);

  const usedUp = (
    Object.entries(newStats) as [keyof typeof upgradePointMap, number][]
  ).reduce((sum, [stat, value]) => {
    let level =
      item?.modifiedStats && item?.modifiedStats[stat]
        ? value - item?.modifiedStats[stat]
        : value;
    let totalUpCost = 0;
    for (level; level > 0; level--) {
      totalUpCost =
        item?.stats && item.stats[stat]
          ? upgradePointMap[stat](level + item.stats[stat]) + totalUpCost
          : upgradePointMap[stat](level) + totalUpCost;
    }
    return sum + totalUpCost;
  }, 0);

  const availableUp = (newGrade - item?.grade) * 5 - usedUp;

  const upgradePrice = (() => {
    let cost = 0;
    for (let grade = newGrade; grade > item?.grade; grade--) {
      cost = item?.price ? cost + grade * (item?.price / 4) : 0;
    }
    return Math.ceil(cost);
  })();

  const upgradedPowerLevel = powerLevel
    ? (
        Object.entries(newStats) as [keyof typeof upgradePointMap, number][]
      ).reduce((sum, [stat, value]) => {
        if (upgradePointMap[stat]) {
          return sum + upgradePointMap[stat](value);
        } else {
          return sum;
        }
      }, 0) + powerLevel
    : null;

  return {
    upgradePointMap,
    availableUp,
    upgradePrice,
    powerLevel,
    upgradedPowerLevel,
  };
};

export default useUpgradePoints;
