import { useMemo } from 'react';
import { Item } from 'src/types/item';
import gradePointMap from './gradePointMap';

const useItemStats = (items: Item[] | null) => {
  const itemStats = useMemo(
    () =>
      items && items[0]
        ? items?.map((item) =>
            Object.fromEntries(
              Object.entries(item?.stats).map(([stat, value]) =>
                item?.modifiedStats &&
                Object.keys(item?.modifiedStats).includes(stat)
                  ? [stat, value + item?.modifiedStats[stat]]
                  : [stat, value],
              ),
            ),
          )
        : null,
    [items],
  );

  const itemKeywords = useMemo(
    () =>
      items && items[0]
        ? items?.map((item) => {
            if (item.modifiedKeywords) {
              return [...item.keywords, ...item.modifiedKeywords];
            } else {
              return item.keywords;
            }
          })
        : null,
    [items],
  );

  const powerLevel = useMemo(
    () =>
      itemStats
        ? Math.ceil(
            itemStats
              ?.map((stats) =>
                Object.entries(stats).reduce((sum, [stat, value]) => {
                  if (gradePointMap[stat]) {
                    let totalGpCost = 0;
                    for (value; value > 0; value--) {
                      totalGpCost = gradePointMap[stat](value) + totalGpCost;
                    }
                    return sum + totalGpCost;
                  } else {
                    return sum;
                  }
                }, 0),
              )
              .reduce((sum, level) => sum + level, 0),
          )
        : null,
    [itemStats],
  );

  return { itemStats, itemKeywords, powerLevel };
};

export default useItemStats;
