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
import useCharactersQuery from '../hooks/useCharactersQuery/useCharactersQuery';
import { LayoutContext } from '../contexts/LayoutContext';
import HealthIcon from './icons/HealthIcon';
import SanityIcon from './icons/SanityIcon';
import CyberIcon from './icons/CyberIcon';
import EquipIcon from './icons/EquipIcon';
import EvasionIcon from './icons/EvasionIcon';
import ArmorIcon from './icons/ArmorIcon';
import WardIcon from './icons/WardIcon';
import SpeedIcon from './icons/SpeedIcon';
import { Link } from 'react-router-dom';
import BtnRect from './BtnRect';

const CharacterSheet = () => {
  const { accentPrimary } = useContext(ThemeContext);
  const { apiUrl, authToken } = useContext(AuthContext);
  const { layoutSize } = useContext(LayoutContext);

  const [structuredTree, setStructuredTree] = useState({});
  const [stats, setStats] = useState({});
  const [storyVisibility, setStoryVisibility] = useState(
    layoutSize === 'xsmall' ? false : true,
  );

  const {
    data: character,
    isPending,
    isError,
  } = useCharactersQuery(apiUrl, authToken);

  const attributeTree = useAttributeTree();

  useEffect(() => {
    if (character) {
      const structured = attributeTree.structureTree(character[0].attributes);
      setStructuredTree(structured);

      const calculatedStats = attributeTree.calculateSkills(structured);
      setStats(calculatedStats);
    }
  }, [character]);

  if (isError) {
    return <div className="bg-secondary">No characters found</div>;
  }

  if (isPending) {
    return <span></span>;
  }

  return (
    <div className="text-primary flex w-full max-w-5xl flex-col gap-10">
      <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
        <div className="flex w-full gap-4">
          <ThemeContainer
            className="w-full grow"
            chamfer="16"
            borderColor={accentPrimary}
          >
            <div className="bg-primary flex h-full w-full items-center justify-between gap-8 px-8 clip-4">
              <h1 className="py-2 text-center text-3xl font-semibold tracking-widest">
                {character[0].name}
              </h1>
              <p className="accent-primary flex size-8 shrink-0 items-center justify-center rounded-full text-2xl font-semibold sm:pt-1">
                {character[0].level}
              </p>
            </div>
          </ThemeContainer>
          <div className="flex flex-col items-center gap-1 pr-2">
            <h3 className="text-xl">Profits</h3>
            <p className="text-xl">{character[0].profits} p</p>
          </div>
        </div>
        <div className="flex w-full items-center justify-evenly gap-2 sm:gap-8 lg:w-auto lg:justify-center">
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-primary text-xl font-semibold tracking-widest">
              Height
            </h3>
            <p className="text-xl">
              {Math.floor(character[0].height / 12)}ft{' '}
              {character[0].height % 12}in
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-primary text-xl font-semibold tracking-widest">
              Weight
            </h3>
            <p className="text-xl">{character[0].weight} lbs</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-primary text-xl font-semibold tracking-widest">
              Age
            </h3>
            <p className="text-xl">{character[0].age}</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-primary text-xl font-semibold tracking-widest">
              Sex
            </h3>
            <p className="text-xl">{character[0].sex}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 sm:flex-row">
        {character[0].picture.imageUrl && (
          <ThemeContainer
            className="mx-auto aspect-square max-h-96 shrink-0"
            chamfer="24"
            borderColor={accentPrimary}
          >
            <img
              className="fade-in-bottom max-h-96 clip-6"
              src={character[0].picture.imageUrl}
              alt="Preview"
            />
          </ThemeContainer>
        )}

        <ThemeContainer
          chamfer="24"
          className="mb-auto max-h-96 w-full"
          borderColor={accentPrimary}
        >
          <div className="bg-primary scrollbar-secondary max-h-96 overflow-y-auto p-4 clip-6">
            <div className="flex w-full items-center justify-between px-2">
              <h3 className="">{character[0].name}'s Story</h3>
              <button
                className="text-tertiary hover:underline"
                onClick={() => setStoryVisibility(!storyVisibility)}
              >
                {storyVisibility ? 'hide' : 'show'}
              </button>
            </div>
            {storyVisibility && (
              <p className="mt-2">{character[0].background}</p>
            )}
          </div>
        </ThemeContainer>
      </div>
      <div
        className={` ${layoutSize !== 'xsmall' ? 'stat-bar-layout' : 'stat-bar-layout-sm'} w-full gap-4`}
      >
        <StatBar
          title="Health"
          current={character[0].stats.currentHealth}
          total={stats.health}
          color="rgb(248 113 113)"
        >
          <HealthIcon className="size-8" />
        </StatBar>
        <StatBar
          title="Sanity"
          current={character[0].stats.currentSanity}
          total={stats.sanity}
          color="rgb(96 165 250)"
        >
          <SanityIcon className="size-8" />
        </StatBar>
        <StatBar
          title="Cyber"
          current={stats.cyber}
          total={stats.cyber}
          color="rgb(52 211 153)"
        >
          <CyberIcon className="size-8" />
        </StatBar>
        <StatBar
          title="Equip"
          current={stats.equip}
          total={stats.equip}
          color="rgb(251 191 36)"
        >
          <EquipIcon className="size-8" />
        </StatBar>
      </div>
      <div className="flex flex-col gap-8">
        <ThemeContainer chamfer="24" borderColor={accentPrimary}>
          <div className="bg-primary flex flex-wrap justify-center gap-8 px-8 py-4 clip-6 lg:justify-between lg:pl-10">
            <div className="flex flex-wrap justify-around gap-6">
              {Object.entries(stats).map(([stat, points]) => {
                const stats = ['speed', 'evasion', 'armor', 'ward'];
                return (
                  stats.includes(stat) && (
                    <div
                      className="flex flex-col items-center justify-between gap-2"
                      key={stat}
                    >
                      {layoutSize !== 'xsmall' && (
                        <h3 className="text-primary text-xl font-semibold tracking-widest">
                          {stat.charAt(0).toUpperCase() + stat.slice(1)}{' '}
                        </h3>
                      )}
                      <div className="flex items-center justify-center gap-2">
                        <SpeedIcon className="text-secondary size-8" />
                        <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                          {points}
                        </p>
                      </div>
                    </div>
                  )
                );
              })}
              <div
                className="flex flex-col items-center justify-between gap-2"
                key={'evasion'}
              >
                {layoutSize !== 'xsmall' && (
                  <h3 className="text-primary text-xl font-semibold tracking-widest">
                    Evasion
                  </h3>
                )}
                <div className="flex items-center justify-center gap-2">
                  <EvasionIcon className="size-8" />
                  <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                    1
                  </p>
                </div>
              </div>
              <div
                className="flex flex-col items-center justify-between gap-2"
                key={'armor'}
              >
                {layoutSize !== 'xsmall' && (
                  <h3 className="text-primary text-xl font-semibold tracking-widest">
                    Armor
                  </h3>
                )}
                <div className="flex items-center justify-center gap-2">
                  <ArmorIcon className="size-8" />
                  <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                    0
                  </p>
                </div>
              </div>
              <div
                className="flex flex-col items-center justify-between gap-2"
                key={'ward'}
              >
                {layoutSize !== 'xsmall' && (
                  <h3 className="text-primary text-xl font-semibold tracking-widest sm:text-2xl">
                    Ward
                  </h3>
                )}
                <div className="flex items-center justify-center gap-2">
                  <WardIcon className="text-secondary size-8" />
                  <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                    0
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-8 max-sm:flex-wrap">
              <div className="flex flex-col items-center gap-2">
                <h3 className="text-primary whitespace-nowrap text-xl font-semibold tracking-widest">
                  Permenant Injuries
                </h3>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, index) =>
                    index < character[0].stats.injuries ? (
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
                <h3 className="text-primary whitespace-nowrap text-xl font-semibold tracking-widest">
                  Permenant Insanities
                </h3>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, index) =>
                    index < character[0].stats.insanities ? (
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
                <div className="bg-primary p-6 clip-6">
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
      <Link to={`/characters/${character[0].id}/update`}>
        <BtnRect className="w-full">Update character info</BtnRect>
      </Link>
    </div>
  );
};

export default CharacterSheet;
