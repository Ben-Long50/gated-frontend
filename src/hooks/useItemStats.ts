import { useMemo } from 'react';
import { Item } from 'src/types/item';

const useItemStats = (item: Item) => {
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

  const itemStats = useMemo(
    () =>
      item?.stats
        ? Object.fromEntries(
            Object.entries(item?.stats).map(([stat, value]) =>
              item?.modifiedStats &&
              Object.keys(item?.modifiedStats).includes(stat)
                ? [stat, value + item?.modifiedStats[stat]]
                : [stat, value],
            ),
          )
        : undefined,
    [item],
  );

  const powerLevel = itemStats
    ? Math.ceil(
        Object.entries(itemStats).reduce((sum, [stat, value]) => {
          if (gradePointMap[stat]) {
            return sum + value * gradePointMap[stat];
          } else {
            return sum;
          }
        }, 0),
      )
    : null;

  return { itemStats, powerLevel };
};

export default useItemStats;
