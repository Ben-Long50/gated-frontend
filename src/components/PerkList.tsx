import { useContext } from 'react';
import PerkCard from './PerkCard';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import Icon from '@mdi/react';
import { mdiTriangleSmallUp } from '@mdi/js';
import { PerkTree } from 'src/hooks/usePerks';

const PerkList = ({ perkTree }: { perkTree: Partial<PerkTree> }) => {
  const { accentPrimary } = useContext(ThemeContext);

  return (
    <div className="flex w-full max-w-4xl flex-col gap-10">
      {perkTree.generalPerks?.general.length > 0 && (
        <ThemeContainer
          chamfer="24"
          borderColor={accentPrimary}
          className="mb-auto w-full"
        >
          <div className="bg-primary clip-6 flex flex-col gap-10 p-6">
            <div className="flex items-center justify-between">
              <h2 className="pl-4 text-left">General</h2>
              <h3>({perkTree.generalPerks?.general.length})</h3>
            </div>
            {perkTree.generalPerks &&
              Object.entries(perkTree.generalPerks).map(([skill, perkList]) => {
                return (
                  <div className="flex flex-col gap-4" key={skill}>
                    {perkList.map((perk) => {
                      return <PerkCard key={perk.name} perk={perk} />;
                    })}
                  </div>
                );
              })}
          </div>
        </ThemeContainer>
      )}
      {perkTree.cyberneticaPerks?.chromebits.length +
        perkTree.cyberneticaPerks?.hardwired.length +
        perkTree.cyberneticaPerks?.motorized.length +
        perkTree.cyberneticaPerks?.networked.length >
        0 && (
        <ThemeContainer
          chamfer="24"
          borderColor={accentPrimary}
          className="mb-auto w-full"
        >
          <div className="bg-primary clip-6 flex flex-col gap-10 p-6">
            <h2 className="pl-4 text-left">Cybernetica</h2>
            {Object.entries(perkTree.cyberneticaPerks).map(
              ([skill, perkList]) => {
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
                          <h3>({perkTree.cyberneticaPerks[skill].length})</h3>
                        </div>
                        {perkList.map((perk) => {
                          return <PerkCard key={perk.name} perk={perk} />;
                        })}
                      </div>
                    )
                  );
                }
              },
            )}
          </div>
        </ThemeContainer>
      )}
      {perkTree.esotericaPerks?.gestalt.length +
        perkTree.esotericaPerks?.godhead.length +
        perkTree.esotericaPerks?.mysticism.length +
        perkTree.esotericaPerks?.outerworld.length >
        0 && (
        <ThemeContainer
          chamfer="24"
          borderColor={accentPrimary}
          className="mb-auto w-full"
        >
          <div className="bg-primary clip-6 flex flex-col gap-10 p-6">
            <h2 className="pl-4 text-left">Esoterica</h2>
            {Object.entries(perkTree.esotericaPerks).map(
              ([skill, perkList]) => {
                return (
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
                      <h3>({perkTree.esotericaPerks[skill].length})</h3>
                    </div>
                    {perkList.map((perk) => {
                      return <PerkCard key={perk.name} perk={perk} />;
                    })}
                  </div>
                );
              },
            )}
          </div>
        </ThemeContainer>
      )}
      {perkTree.peacePerks?.barter.length +
        perkTree.peacePerks?.rhetoric.length +
        perkTree.peacePerks?.erudition.length +
        perkTree.peacePerks?.treatment.length >
        0 && (
        <ThemeContainer
          chamfer="24"
          borderColor={accentPrimary}
          className="mb-auto w-full"
        >
          <div className="bg-primary clip-6 flex flex-col gap-10 p-6">
            <h2 className="pl-4 text-left">Peace</h2>
            {Object.entries(perkTree.peacePerks).map(([skill, perkList]) => {
              return (
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
                    <h3>({perkTree.peacePerks[skill].length})</h3>
                  </div>
                  {perkList.map((perk) => {
                    return <PerkCard key={perk.name} perk={perk} />;
                  })}
                </div>
              );
            })}
          </div>
        </ThemeContainer>
      )}
      {perkTree.violencePerks?.assault.length +
        perkTree.violencePerks?.shooting.length +
        perkTree.violencePerks?.subterfuge.length +
        perkTree.violencePerks?.threshold.length >
        0 && (
        <ThemeContainer
          chamfer="24"
          borderColor={accentPrimary}
          className="mb-auto w-full"
        >
          <div className="bg-primary clip-6 flex flex-col gap-10 p-6">
            <h2 className="pl-4 text-left">Violence</h2>
            {Object.entries(perkTree.violencePerks).map(([skill, perkList]) => {
              return (
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
                    <h3>({perkTree.violencePerks[skill].length})</h3>
                  </div>
                  {perkList.map((perk) => {
                    return <PerkCard key={perk.name} perk={perk} />;
                  })}
                </div>
              );
            })}
          </div>
        </ThemeContainer>
      )}
    </div>
  );
};

export default PerkList;
