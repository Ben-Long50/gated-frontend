import PerkCard from './PerkCard';
import { Perk, PerkTree } from 'src/types/perk';
import ArrowHeader2 from './ArrowHeader2';
import { FieldApi } from '@tanstack/react-form';

const PerkList = ({
  field,
  perkTree,
  className,
  mode,
}: {
  field?: FieldApi;
  perkTree: Partial<PerkTree>;
  className?: string;
  mode?: string;
}) => {
  return (
    <div className={`${className} z-20 flex w-full flex-col gap-8 px-0.5`}>
      {Object.entries(perkTree).map(([perkType, skills]) => {
        return (
          Object.entries(skills).reduce(
            (accumulator, [_, perkList]) => accumulator + perkList.length,
            0,
          ) > 0 && (
            <div key={perkType} className="flex flex-col gap-8 p-4 sm:p-8">
              <ArrowHeader2
                title={perkType.charAt(0).toUpperCase() + perkType.slice(1)}
              />
              {Object.entries(skills).map(([skill, perkList]) => {
                {
                  return (
                    perkList.length > 0 && (
                      <div className="flex flex-col gap-4" key={skill}>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="mr-auto">
                            {skill.charAt(0).toUpperCase() + skill.slice(1)}
                          </h3>
                          <h4>({perkList.length})</h4>
                        </div>
                        <div className="flex flex-col items-start gap-4 md:grid md:grid-cols-2">
                          {perkList.map((perk: Perk) => {
                            const perkIds = field.state.value.map(
                              (perk: Perk) => perk.id,
                            );
                            return (
                              <div
                                key={perk.id}
                                className="flex w-full items-center justify-between gap-4"
                              >
                                <PerkCard perk={perk} mode={mode} />
                                {mode === 'form' && (
                                  <input
                                    className="size-6"
                                    type="checkbox"
                                    checked={perkIds.includes(perk.id)}
                                    onChange={() => {
                                      if (!perkIds?.includes(perk.id)) {
                                        field.handleChange([
                                          ...field.state.value,
                                          perk,
                                        ]);
                                      } else {
                                        field.handleChange(
                                          field.state.value.filter(
                                            (item: Perk) => item.id !== perk.id,
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
