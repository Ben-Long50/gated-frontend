import PerkCard from './PerkCard';
import Icon from '@mdi/react';
import { mdiTriangleSmallUp } from '@mdi/js';
import { PerkTree } from 'src/hooks/usePerks';

const PerkList = ({
  perkTree,
  mode,
  checkedPerk,
  setCheckedPerk,
}: {
  perkTree: Partial<PerkTree>;
}) => {
  return (
    <div className="flex w-full max-w-4xl flex-col gap-10">
      {Object.entries(perkTree).map(([perkType, skills]) => {
        return (
          Object.entries(skills).reduce(
            (accumulator, [skill, perkList]) => accumulator + perkList.length,
            0,
          ) > 0 && (
            <div key={perkType} className="flex flex-col gap-10">
              <h2 className="pl-4 text-left">
                {perkType.charAt(0).toUpperCase() + perkType.slice(1, -5)}
              </h2>
              {Object.entries(skills).map(([skill, perkList]) => {
                {
                  return (
                    perkList.length > 0 && (
                      <div className="flex flex-col gap-4" key={skill}>
                        <div className="flex items-center justify-between gap-2">
                          <Icon
                            className="text-primary"
                            path={mdiTriangleSmallUp}
                            rotate={90}
                            size={1.5}
                          />
                          <h3 className="mr-auto">
                            {skill.charAt(0).toUpperCase() + skill.slice(1)}
                          </h3>
                          <h4>({perkList.length})</h4>
                        </div>
                        {perkList.map((perk) => {
                          return (
                            <div
                              key={perk.name}
                              className="flex items-center justify-between gap-4"
                            >
                              <PerkCard className="w-full" perk={perk} />
                              {mode === 'edit' && (
                                <input
                                  className="size-6"
                                  type="checkbox"
                                  checked={checkedPerk === perk.id}
                                  onChange={() => setCheckedPerk(perk.id)}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )
                  );
                }
              })}
            </div>
          )
        );
      })}
    </div>
  );
};

export default PerkList;
