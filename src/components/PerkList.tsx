import PerkCard from './PerkCard';
import { Perk, PerkTree } from 'src/types/perk';
import ArrowHeader2 from './ArrowHeader2';
import { FieldApi } from '@tanstack/react-form';
import { capitalCase } from 'change-case';
import ExpandingList from './ExpandingList';

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
              <ArrowHeader2 title={capitalCase(perkType)} />
              {Object.entries(skills).map(([skill, perkList]) => {
                {
                  return (
                    perkList.length > 0 && (
                      <div className="flex flex-col gap-4" key={skill}>
                        <ExpandingList
                          title={
                            capitalCase(skill) + ' ' + `(${perkList.length})`
                          }
                          className="flex flex-col items-start gap-4 md:grid md:grid-cols-2"
                        >
                          {perkList.map((perk: Perk) => {
                            const perkIds = field
                              ? field.state.value.map((perk: Perk) => perk.id)
                              : [];
                            return (
                              <PerkCard
                                key={perk.id}
                                perk={perk}
                                mode={mode}
                                perkIds={perkIds}
                                field={field}
                              />
                            );
                          })}
                        </ExpandingList>
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
