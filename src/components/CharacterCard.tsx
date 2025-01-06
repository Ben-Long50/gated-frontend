import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import StatBar from './StatBar';
import HealthIcon from './icons/HealthIcon';
import SanityIcon from './icons/SanityIcon';
import useAttributeTree from '../hooks/useAttributeTree';
import { ThemeContext } from '../contexts/ThemeContext';
import { LayoutContext } from '../contexts/LayoutContext';
import BtnRect from './buttons/BtnRect';
import { Link } from 'react-router-dom';
import WardIcon from './icons/WardIcon';
import ArmorIcon from './icons/ArmorIcon';
import EvasionIcon from './icons/EvasionIcon';
import SpeedIcon from './icons/SpeedIcon';

const CharacterCard = ({ character }) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);

  const attributeTree = useAttributeTree(character?.attributes);

  return (
    <ThemeContainer chamfer="32" borderColor={accentPrimary}>
      <div className="bg-primary flex flex-wrap gap-4 p-6 clip-8 sm:flex-nowrap md:gap-8">
        <ThemeContainer
          className="mx-auto my-auto aspect-square w-full max-w-72"
          chamfer="24"
          borderColor={accentPrimary}
        >
          <img
            className="aspect-square h-full w-full clip-6"
            src={character.picture.imageUrl}
            alt={`${character.firstName} ${character.lastName}'s card`}
          />
        </ThemeContainer>
        <div className="flex w-full flex-col justify-between gap-4 md:gap-6">
          <div className="flex w-full items-center justify-between md:px-8">
            <h1 className="text-center text-3xl font-semibold tracking-widest">
              {character.firstName + ' ' + character.lastName}
            </h1>
            <p className="text-accent flex size-8 shrink-0 items-center justify-center text-3xl font-semibold sm:pt-1">
              {character.level}
            </p>
          </div>
          <div
            className={` ${layoutSize !== 'small' && layoutSize !== 'xsmall' ? 'stat-bar-layout' : 'stat-bar-layout-sm'} w-full gap-4`}
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
          </div>
          <div className="flex flex-wrap justify-around gap-6">
            {Object.entries(attributeTree.stats).map(([stat, points]) => {
              const stats = ['speed', 'evasion', 'armor', 'ward'];
              return (
                stats.includes(stat) && (
                  <div
                    className="flex flex-col items-center justify-between gap-2"
                    key={stat}
                  >
                    {layoutSize !== 'small' && layoutSize !== 'xsmall' && (
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
              {layoutSize !== 'small' && layoutSize !== 'xsmall' && (
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Evasion
                </h3>
              )}
              <div className="flex items-center justify-center gap-2">
                <EvasionIcon className="size-8" />
                <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">1</p>
              </div>
            </div>
            <div
              className="flex flex-col items-center justify-between gap-2"
              key={'armor'}
            >
              {layoutSize !== 'small' && layoutSize !== 'xsmall' && (
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Armor
                </h3>
              )}
              <div className="flex items-center justify-center gap-2">
                <ArmorIcon className="size-8" />
                <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">0</p>
              </div>
            </div>
            <div
              className="flex flex-col items-center justify-between gap-2"
              key={'ward'}
            >
              {layoutSize !== 'small' && layoutSize !== 'xsmall' && (
                <h3 className="text-primary text-xl font-semibold tracking-widest sm:text-2xl">
                  Ward
                </h3>
              )}
              <div className="flex items-center justify-center gap-2">
                <WardIcon className="text-secondary size-8" />
                <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">0</p>
              </div>
            </div>
            <Link className="ml-auto mt-auto self-end" to={`${character.id}`}>
              <BtnRect>Character sheet</BtnRect>
            </Link>
          </div>
        </div>
      </div>
    </ThemeContainer>
  );
};

export default CharacterCard;
