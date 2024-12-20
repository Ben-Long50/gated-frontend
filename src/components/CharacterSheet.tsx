import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import {
  mdiCircleOutline,
  mdiHeadSnowflakeOutline,
  mdiSkullOutline,
} from '@mdi/js';
import Icon from '@mdi/react';
import StatBar from './StatBar';
import PerkCard from './PerkCard';
import WeaponCard from './WeaponCard';
import ArmorCard from './ArmorCard';
import CyberneticCard from './CyberneticCard';
import AttributeCard from './AttributeCard';
import useAttributeTree from '../hooks/useAttributeTree';
import useCharacterQuery from '../hooks/useCharacterQuery/useCharacterQuery';

const CharacterSheet = () => {
  const { accentPrimary } = useContext(ThemeContext);
  const { apiUrl, authToken } = useContext(AuthContext);

  const [structuredTree, setStructuredTree] = useState({});
  const [stats, setStats] = useState({});

  const { data: character, isPending } = useCharacterQuery(apiUrl, authToken);

  const attributeTree = useAttributeTree();

  useEffect(() => {
    if (character) {
      const structured = attributeTree.structureTree(character[0].attributes);
      setStructuredTree(structured);

      const calculatedStats = attributeTree.calculateSkills(structured);
      setStats(calculatedStats);
      console.log(structured);
    }
  }, [character]);

  if (isPending) {
    return <span></span>;
  }

  return (
    <div className="text-primary flex w-full max-w-5xl flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-8">
        <ThemeContainer chamfer="16" borderColor={accentPrimary}>
          <div className="bg-primary flex grow items-center justify-around gap-8 px-8 clip-4">
            <h1 className="py-2 text-center text-3xl font-semibold tracking-widest">
              {character[0].name}
            </h1>
            <p className="accent-primary flex size-8 shrink-0 items-center justify-center rounded-full pt-1 text-2xl font-semibold">
              {character[0].level}
            </p>
          </div>
        </ThemeContainer>
        <div className="flex w-full max-w-80 items-center justify-between gap-2 sm:gap-8">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-primary text-xl font-semibold tracking-widest">
              Height
            </h3>
            <p className="text-xl">
              {Math.floor(character[0].height / 12)}ft{' '}
              {character[0].height % 12}in
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-primary text-xl font-semibold tracking-widest">
              Weight
            </h3>
            <p className="text-xl">{character[0].weight} lbs</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-primary text-xl font-semibold tracking-widest">
              Age
            </h3>
            <p className="text-xl">{character[0].age}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-primary text-xl font-semibold tracking-widest">
              Sex
            </h3>
            <p className="text-xl">{character[0].sex}</p>
          </div>
        </div>
      </div>
      <div className={`stat-bar-layout w-full items-center gap-4`}>
        <StatBar
          title="Health"
          current={stats.health}
          total={stats.health}
          color="rgb(248 113 113)"
        />
        <StatBar
          title="Sanity"
          current={stats.sanity}
          total={stats.sanity}
          color="rgb(96 165 250)"
        />
        <StatBar
          title="Cyber"
          current={stats.cyber}
          total={stats.cyber}
          color="rgb(52 211 153)"
        />
        <StatBar
          title="Equip"
          current={stats.equip}
          total={stats.equip}
          color="rgb(251 191 36)"
        />
      </div>

      <div className="flex flex-col gap-8">
        <ThemeContainer chamfer="24" borderColor={accentPrimary}>
          <div className="bg-primary clip-6 flex flex-wrap justify-center gap-6 p-4 lg:justify-between lg:pl-10">
            {Object.entries(stats).map(([stat, points]) => {
              const stats = ['speed', 'evasion', 'armor', 'ward'];
              return (
                stats.includes(stat) && (
                  <div className="flex flex-col items-center gap-2" key={stat}>
                    <h3 className="text-primary text-xl font-semibold tracking-widest">
                      {stat.charAt(0).toUpperCase() + stat.slice(1)}{' '}
                    </h3>
                    <p className="text-xl">{points}</p>
                  </div>
                )
              );
            })}
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-primary text-xl font-semibold tracking-widest">
                Permenant Injuries
              </h3>
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, index) =>
                  index < character[0].injuries ? (
                    <Icon
                      key={index}
                      className="text-primary"
                      path={mdiSkullOutline}
                      size={1}
                    />
                  ) : (
                    <Icon
                      key={index}
                      className="text-gray-400"
                      path={mdiCircleOutline}
                      size={1}
                    />
                  ),
                )}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-primary text-xl font-semibold tracking-widest">
                Permenant Insanities
              </h3>
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, index) =>
                  index < character[0].insanities ? (
                    <Icon
                      key={index}
                      className="text-primary"
                      path={mdiHeadSnowflakeOutline}
                      size={1}
                    />
                  ) : (
                    <Icon
                      key={index}
                      className="text-gray-400"
                      path={mdiCircleOutline}
                      size={1}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        </ThemeContainer>

        <div className="mb-auto flex w-full grow flex-col gap-6 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-10">
          {Object.entries(structuredTree).map(
            ([attribute, { points, skills }]) => (
              <ThemeContainer
                key={attribute}
                chamfer="24"
                borderColor={accentPrimary}
              >
                <div className="bg-primary clip-6 p-6">
                  <AttributeCard
                    attribute={attribute}
                    points={points}
                    skills={skills}
                  />
                </div>
              </ThemeContainer>
            ),
          )}
        </div>
      </div>
      <ThemeContainer chamfer="16" borderColor={accentPrimary}>
        <div className="bg-primary p-4 clip-4">
          <h2 className="mb-2 py-2 pl-4 text-left text-2xl font-semibold tracking-widest">
            Perks
          </h2>
          <div className="flex flex-col gap-4">
            {character[0].perks.map((perk) => {
              return <PerkCard key={perk.name} perk={perk} />;
            })}
          </div>
        </div>
      </ThemeContainer>
      {/* <ThemeContainer chamfer="16" borderColor={accentPrimary}>
        <div className="bg-primary p-4 clip-4">
          <h2 className="mb-2 py-2 pl-4 text-left text-2xl font-semibold tracking-widest">
            Weapons
          </h2>
          <div className="flex flex-col gap-4">
            {character.weapons.map((weapon) => {
              return <WeaponCard key={weapon.name} weapon={weapon} />;
            })}
          </div>
        </div>
      </ThemeContainer>
      <ThemeContainer chamfer="16" borderColor={accentPrimary}>
        <div className="bg-primary p-4 clip-4">
          <h2 className="mb-2 py-2 pl-4 text-left text-2xl font-semibold tracking-widest">
            Armor
          </h2>
          <div className="flex flex-col gap-4">
            {character.armor.map((armor) => {
              return <ArmorCard key={armor.name} armor={armor} />;
            })}
          </div>
        </div>
      </ThemeContainer>
      <ThemeContainer chamfer="16" borderColor={accentPrimary}>
        <div className="bg-primary p-4 clip-4">
          <h2 className="mb-2 py-2 pl-4 text-left text-2xl font-semibold tracking-widest">
            Cybernetics
          </h2>
          <div className="flex flex-col gap-4">
            {character.cybernetics.map((cybernetic) => {
              return (
                <CyberneticCard key={cybernetic.name} cybernetic={cybernetic} />
              );
            })}
          </div>
        </div>
      </ThemeContainer>
      <ThemeContainer chamfer="16" borderColor={accentPrimary}>
        <div className="bg-primary p-4 clip-4">
          <h2 className="mb-2 py-2 pl-4 text-left text-2xl font-semibold tracking-widest">
            Items and Equipment
          </h2>
          <div className="flex flex-col gap-4">
            {character.perks.map((perk) => {
              return <PerkCard key={perk.name} perk={perk} />;
            })}
          </div>
        </div>
      </ThemeContainer> */}
    </div>
  );
};

export default CharacterSheet;
