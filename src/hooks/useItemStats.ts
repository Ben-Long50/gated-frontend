import { useMemo } from 'react';
import { Item, Stats } from 'src/types/item';
import gradePointMap from './gradePointMap';
import { Keyword } from 'src/types/keyword';

const useItemStats = (item: Item) => {
  const activeActionModifiers = useMemo(() => {
    const modifierObj = {} as Stats;

    const modifierKeywords = [] as { keyword: Keyword; value: number | null }[];

    const activeActions = item?.itemLinkReference?.actions.filter(
      (action) => action.active && action.modifiers,
    );

    activeActions?.forEach((action) => {
      Object.entries(action.modifiers).forEach(([stat, value]) => {
        if (!modifierObj[stat as keyof Stats]) {
          modifierObj[stat as keyof Stats] = value;
        } else {
          const currentStat = modifierObj[stat as keyof Stats];
          modifierObj[stat as keyof Stats] = currentStat + value;
        }
      });
      if (action.keywordModifiers) {
        for (const keyword of action.keywordModifiers) {
          modifierKeywords.push(keyword);
        }
      }
    });

    return { modifierObj, modifierKeywords };
  }, [item]);

  const itemStats = useMemo(() => {
    if (!item?.stats && !item?.modifiedStats) return null;

    const combined: Record<string, number> = {};

    const baseStats = item?.stats || {};
    const modifiedStats = item?.modifiedStats || {};

    for (const [key, value] of Object.entries(baseStats)) {
      combined[key] = value;
    }

    for (const [key, value] of Object.entries(modifiedStats)) {
      combined[key] = (combined[key] || 0) + value;
    }

    for (const [key, value] of Object.entries(
      activeActionModifiers.modifierObj,
    )) {
      if (combined[key]) {
        combined[key] = combined[key] + value;
      } else {
        continue;
      }
    }

    return combined;
  }, [item]);

  if (itemStats?.weapon) {
    const weaponCount = item?.itemLinkReference?.items.filter(
      (item) =>
        item?.itemTypes.includes('weapon') &&
        item?.keywords.every((keyword) => keyword.keyword.name !== 'Turret') &&
        item?.keywords.some(
          (keyword) => keyword.keyword.name === 'Vehicle Weapon',
        ),
    ).length;

    itemStats.currentWeapon = weaponCount || 0;
  }

  if (itemStats?.turret) {
    const turretCount = item?.itemLinkReference?.items.filter(
      (item) =>
        (item?.itemTypes.includes('weapon') &&
          item?.keywords.some(
            (keyword) => keyword.keyword.name === 'Turret',
          )) ||
        item?.keywords.every(
          (keyword) => keyword.keyword.name !== 'Vehicle Weapon',
        ),
    ).length;

    itemStats.currentTurret = turretCount || 0;
  }
  if (itemStats?.wyrmMoldSlots) {
    const wyrmMolds = item?.itemLinkReference?.items.filter((item) => {
      item?.keywords.some((keyword) => keyword.keyword.name !== 'Wyrm Mold');
    });

    const wyrmMoldPoints = wyrmMolds?.reduce(
      (sum, wyrmMold) => sum + (wyrmMold.stats.wyrmMoldPoints || 0),
      0,
    );

    itemStats.currentWyrmMoldSlots = wyrmMoldPoints || 0;
  }

  const itemKeywords = useMemo(() => {
    if (!item?.keywords) {
      return null;
    } else if (item?.keywords && !item?.modifiedKeywords) {
      return [...item.keywords, ...activeActionModifiers.modifierKeywords];
    } else {
      return [
        ...item.keywords,
        ...item.modifiedKeywords,
        ...activeActionModifiers.modifierKeywords,
      ];
    }
  }, [item]);

  const powerLevel = useMemo(
    () =>
      itemStats
        ? Math.ceil(
            Object.entries(itemStats).reduce((sum, [stat, value]) => {
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
        : null,
    [itemStats],
  );

  return { itemStats, itemKeywords, powerLevel };
};

export default useItemStats;
