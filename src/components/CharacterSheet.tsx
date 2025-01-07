import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import { mdiCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import StatBar from './StatBar';
import PerkCard from './PerkCard';
import AttributeCard from './AttributeCard';
import useAttributeTree from '../hooks/useAttributeTree';
import { LayoutContext } from '../contexts/LayoutContext';
import HealthIcon from './icons/HealthIcon';
import SanityIcon from './icons/SanityIcon';
import CyberIcon from './icons/CyberIcon';
import EquipIcon from './icons/EquipIcon';
import EvasionIcon from './icons/EvasionIcon';
import ArmorIcon from './icons/ArmorIcon';
import WardIcon from './icons/WardIcon';
import SpeedIcon from './icons/SpeedIcon';
import { Link, useParams } from 'react-router-dom';
import BtnRect from './buttons/BtnRect';
import useCharacterQuery from '../hooks/useCharacterQuery/useCharacterQuery';
import InjuryIcon from './icons/InjuryIcon';
import InsanityIcon from './icons/InsanityIcon';
import Loading from './Loading';

const CharacterSheet = () => {
  const { accentPrimary } = useContext(ThemeContext);
  const { apiUrl } = useContext(AuthContext);
  const { layoutSize } = useContext(LayoutContext);

  const [storyVisibility, setStoryVisibility] = useState(
    layoutSize === 'xsmall' ? false : true,
  );

  const { characterId } = useParams();

  const {
    data: character,
    isPending,
    isLoading,
  } = useCharacterQuery(apiUrl, characterId);

  const attributeTree = useAttributeTree(character?.attributes);

  if (isLoading || isPending) {
    return <Loading />;
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
            <div className="bg-primary flex h-full w-full items-center justify-between gap-4 px-4 py-2 clip-4 sm:px-8">
              <h1 className="text-start text-3xl font-semibold tracking-widest">
                {character.firstName + ' ' + character.lastName}
              </h1>
              <p className="text-accent flex size-8 shrink-0 items-center justify-center text-3xl font-semibold sm:pt-1">
                {character.level}
              </p>
            </div>
          </ThemeContainer>
          <div className="flex flex-col items-center gap-1 pr-2">
            <h3 className="text-xl">Profits</h3>
            <p className="text-xl">{character.profits}p</p>
          </div>
        </div>
        <div className="flex w-full items-center justify-evenly gap-2 sm:gap-8 lg:w-auto lg:justify-center">
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-primary text-xl font-semibold tracking-widest">
              Height
            </h3>
            <p className="text-xl">
              {Math.floor(character.height / 12)}ft {character.height % 12}in
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-primary text-xl font-semibold tracking-widest">
              Weight
            </h3>
            <p className="text-xl">{character.weight} lbs</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-primary text-xl font-semibold tracking-widest">
              Age
            </h3>
            <p className="text-xl">{character.age}</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-primary text-xl font-semibold tracking-widest">
              Sex
            </h3>
            <p className="text-xl">{character.sex}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 sm:flex-row">
        {character.picture.imageUrl && (
          <ThemeContainer
            className="size mx-auto aspect-square w-full max-w-96"
            chamfer="24"
            borderColor={accentPrimary}
          >
            <img
              className="clip-6"
              src={character.picture.imageUrl}
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
              <h3 className="">
                {character.firstName + ' ' + character.lastName}'s Story
              </h3>
              <button
                className="text-tertiary hover:underline"
                onClick={() => setStoryVisibility(!storyVisibility)}
              >
                {storyVisibility ? 'hide' : 'show'}
              </button>
            </div>
            {storyVisibility && <p className="mt-2">{character.background}</p>}
          </div>
        </ThemeContainer>
      </div>
      <div
        className={` ${layoutSize !== 'xsmall' && layoutSize !== 'small' ? 'stat-bar-layout' : 'stat-bar-layout-sm'} w-full gap-4`}
      >
        <StatBar
          title="Health"
          current={character.stats.currentHealth}
          total={attributeTree.stats.health}
          color="rgb(248 113 113)"
        >
          <HealthIcon className="size-8" />
        </StatBar>
        <StatBar
          title="Sanity"
          current={character.stats.currentSanity}
          total={attributeTree.stats.sanity}
          color="rgb(96 165 250)"
        >
          <SanityIcon className="size-8" />
        </StatBar>
        <StatBar
          title="Cyber"
          current={attributeTree.stats.cyber}
          total={attributeTree.stats.cyber}
          color="rgb(52 211 153)"
        >
          <CyberIcon className="size-8" />
        </StatBar>
        <StatBar
          title="Equip"
          current={attributeTree.stats.equip}
          total={attributeTree.stats.equip}
          color="rgb(251 191 36)"
        >
          <EquipIcon className="size-8" />
        </StatBar>
      </div>
      <div className="flex flex-col gap-8">
        <ThemeContainer chamfer="24" borderColor={accentPrimary}>
          <div className="bg-primary flex flex-wrap justify-center gap-8 px-8 py-4 clip-6 lg:justify-between lg:pl-10">
            <div className="flex flex-wrap justify-around gap-6">
              {Object.entries(attributeTree.stats).map(([stat, points]) => {
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
                  Permanent Injuries
                </h3>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, index) =>
                    index < character.stats.injuries ? (
                      <InjuryIcon key={index} className="size-8" />
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
                  Permanent Insanities
                </h3>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, index) =>
                    index < character.stats.insanities ? (
                      <InsanityIcon key={index} className="size-7" />
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
          {Object.entries(attributeTree.tree).map(
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
          <div className="flex flex-col items-start gap-4 md:grid md:grid-cols-2">
            {character.perks.map((perk) => {
              return (
                <PerkCard className="w-full" key={perk.name} perk={perk} />
              );
            })}
          </div>
        </div>
      </ThemeContainer>
      <Link to={`update`}>
        <BtnRect className="sm:w-1/2 sm:justify-self-end">
          Update character info
        </BtnRect>
      </Link>
    </div>
  );
};

export default CharacterSheet;
