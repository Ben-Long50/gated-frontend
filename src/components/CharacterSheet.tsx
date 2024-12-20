import { useContext } from 'react';
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
import { LayoutContext } from '../contexts/LayoutContext';
import useAttributeTree from '../hooks/useAttributeTree';

const CharacterSheet = () => {
  const { accentPrimary } = useContext(ThemeContext);
  const { apiUrl, user } = useContext(AuthContext);
  const { layoutSize } = useContext(LayoutContext);

  const character = {
    name: 'Uni Dori',
    level: 4,
    height: { inches: 73 },
    weight: { pounds: 180 },
    age: 30,
    sex: 'male',
    profits: 20,
    attributes: {
      cybernetica: {
        points: 4,
        skills: {
          chromebits: { points: 4 },
        },
      },
      peace: {
        points: 1,
        skills: {
          barter: { points: 1 },
        },
      },
      violence: {
        points: 2,
        skills: {
          shooting: { points: 2 },
          threshold: { points: 3 },
        },
      },
    },
    stats: {
      health: {
        current: 10,
        total: 0,
      },
      sanity: { current: 4, total: 0 },
      speed: { current: 0, total: 0 },
      cyber: { current: 10, total: 0 },
      equip: { current: 16, total: 0 },
      evasion: { current: 1, total: 1 },
      armor: { current: 0, total: 0 },
      ward: { current: 0, total: 0 },
    },
    injuries: 3,
    insanities: 2,
    perks: [
      {
        name: 'Benefactor',
        requirements: {
          cybernetica: { points: 0, skills: { chromebits: { points: 3 } } },
        },
        description:
          'When you select this perk, you receive a non-blackmarket cybernetic of your choice. If it is ever destroyed or damaged, it is repaired or replaced for free. Every time your Upgrade Level increases, you receive another cybernetic. These cybernetics are personalized to you, and cannot be shared.',
      },
      {
        name: 'Proto-chrome',
        requirements: {
          cybernetica: { points: 0, skills: { chromebits: { points: 4 } } },
        },
        description:
          'When you select this perk, you receive 1 of 4 unique cybernetic augments. They are listed in the cybernetic section “Prototype Augments”. You or a trusted associate are able to repair or rebuild this cybernetic if it is damaged or lost.',
      },
    ],
    weapons: [
      {
        name: 'Ranger Smoothbore',
        type: 'Shotgun',
        weild: 2,
        description:
          'The weapon of choice for hired outriders, those lonesome souls that patrol the Wastes Between.',
        stats: {
          DMG: 5,
          SLV: 2,
          RNG: 20,
          MAG: 8,
          WGT: 3,
          Cost: 4,
        },
        keywords: [],
      },
    ],
    armor: [
      {
        name: 'Mk. 3 Industrial Suit',
        type: 'Power',
        description:
          'Designed to protect laborers against hazardous environments.',
        stats: { AV: 4, BP: 10, WGT: 10, PWR: 6, Cost: 15 },
        keywords: ['Torque'],
      },
    ],
    cybernetics: [
      {
        name: 'CR87 Cyberdeck',
        type: 'Function Augment',
        body: 'Brain',
        stats: { Cyber: 2, Cost: 15 },
        description:
          'The Caldwin CR87 is a cerebral and spinal augment that acts as a miniature Sphere Hub once deployed. As an Extended Action, you can deploy the Cyber Deck. Whilst deployed, you can only take simple actions, such as walking and conversating. Your Upload range increases to 500 feet. As an action, you can mark characters you see in range. Marked characters can be targeted by Upload as long as they’re within 500 feet, line of sight not required. While deployed, you retain the mark and track their location, even if they exceed 500 feet. You lose the mark once you deactivate it.',
      },
    ],
  };

  //   const { data: character } = useCharacterQuery(user.id, apiUrl);

  const attributeTree = useAttributeTree();
  const structuredTree = attributeTree.structureTree(character.attributes);
  const stats = attributeTree.calculateSkills(structuredTree);

  return (
    <div className="text-primary flex w-full max-w-5xl flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-8">
        <ThemeContainer chamfer="16" borderColor={accentPrimary}>
          <div className="bg-primary flex grow items-center justify-around gap-8 px-8 clip-4">
            <h1 className="py-2 text-center text-3xl font-semibold tracking-widest">
              {character.name}
            </h1>
            <p className="accent-primary flex size-8 shrink-0 items-center justify-center rounded-full pt-1 text-2xl font-semibold">
              {character.level}
            </p>
          </div>
        </ThemeContainer>
        <div className="flex w-full max-w-80 items-center justify-between gap-2 sm:gap-8">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-primary text-xl font-semibold tracking-widest">
              Height
            </h3>
            <p className="text-xl">
              {Math.floor(character.height.inches / 12)}ft{' '}
              {character.height.inches % 12}in
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-primary text-xl font-semibold tracking-widest">
              Weight
            </h3>
            <p className="text-xl">{character.weight.pounds} lbs</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-primary text-xl font-semibold tracking-widest">
              Age
            </h3>
            <p className="text-xl">{character.age}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-primary text-xl font-semibold tracking-widest">
              Sex
            </h3>
            <p className="text-xl">{character.sex}</p>
          </div>
        </div>
      </div>
      <div className={`stat-bar-layout w-full items-center gap-4`}>
        <StatBar
          title="Health"
          current={character.stats.health.current}
          total={stats.health}
          color="rgb(248 113 113)"
        />
        <StatBar
          title="Sanity"
          current={character.stats.sanity.current}
          total={stats.sanity}
          color="rgb(96 165 250)"
        />
        <StatBar
          title="Cyber"
          current={character.stats.cyber.current}
          total={stats.cyber}
          color="rgb(52 211 153)"
        />
        <StatBar
          title="Equip"
          current={character.stats.equip.current}
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
                  index < character.injuries ? (
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
                  index < character.insanities ? (
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
            {character.perks.map((perk) => {
              return <PerkCard key={perk.name} perk={perk} />;
            })}
          </div>
        </div>
      </ThemeContainer>
      <ThemeContainer chamfer="16" borderColor={accentPrimary}>
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
      </ThemeContainer>
    </div>
  );
};

export default CharacterSheet;
