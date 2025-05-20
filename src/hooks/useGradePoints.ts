import { FormApi, useStore } from '@tanstack/react-form';
import { Item } from 'src/types/item';
import useItemStats from './useItemStats';

const useGradePoints = (form: FormApi, item: Item) => {
  const gradePointMap = {
    damage: 10,
    salvo: 5,
    flurry: 5,
    range: 0.5,
    magCapacity: 2,
    magCount: 10,
    power: 5,
    armor: 10,
    ward: 10,
    block: 5,
    speed: 2,
    agility: 5,
    hull: 5,
    cargo: 5,
    hangar: 10,
    pass: 5,
    weapon: 20,
  };

  const { powerLevel } = useItemStats(item);

  const newGrade = useStore(form.store, (state) => state.values.grade);

  const newStats = useStore(form.store, (state) => state.values.modifiedStats);

  const usedGp = Object.entries(newStats).reduce(
    (sum, [stat, value]) => sum + gradePointMap[stat] * value,
    0,
  );

  const availableGp = (newGrade - item?.grade) * 5 - usedGp;

  const upgradePrice = (() => {
    let cost = 0;
    for (let grade = newGrade; grade > item?.grade; grade--) {
      cost = cost + grade * (item?.price / 2);
    }
    return Math.ceil(cost);
  })();

  const upgradedPowerLevel = powerLevel
    ? Object.entries(newStats).reduce((sum, [stat, value]) => {
        if (gradePointMap[stat]) {
          return sum + value * gradePointMap[stat];
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
