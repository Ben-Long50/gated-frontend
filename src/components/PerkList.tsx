import PerkCard from './PerkCard';
import Icon from '@mdi/react';
import { mdiTriangleSmallUp } from '@mdi/js';
import { PerkTree } from 'src/hooks/usePerks';

const PerkList = ({
  perkTree,
  mode,
  checkedPerks,
  setCheckedPerks,
}: {
  perkTree: Partial<PerkTree>;
}) => {
  return (
    <div className="flex w-full flex-col gap-6 sm:gap-8 lg:gap-10">
      {Object.entries(perkTree).map(([perkType, skills]) => {
        return (
          Object.entries(skills).reduce(
            (accumulator, [skill, perkList]) => accumulator + perkList.length,
            0,
          ) > 0 && (
            <div
              key={perkType}
              className="flex flex-col gap-4 sm:gap-6 lg:gap-8"
            >
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
                        <div className="flex flex-col items-start gap-4 md:grid md:grid-cols-2">
                          {perkList.map((perk) => {
                            return (
                              <div
                                key={perk.name}
                                className="flex w-full items-center justify-between gap-4"
                              >
                                <PerkCard className="w-full" perk={perk} />
                                {mode === 'edit' && (
                                  <input
                                    className="size-6"
                                    type="checkbox"
                                    checked={checkedPerks?.includes(perk.id)}
                                    onChange={() => {
                                      if (!checkedPerks?.includes(perk.id)) {
                                        setCheckedPerks([
                                          ...checkedPerks,
                                          perk.id,
                                        ]);
                                      } else {
                                        setCheckedPerks((prevPerks) =>
                                          prevPerks.filter(
                                            (id) => id !== perk.id,
                                          ),
                                        );
                                      }
                                    }}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
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
