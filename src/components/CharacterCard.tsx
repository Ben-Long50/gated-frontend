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
import CloudinaryImage from './CloudinaryImage';
import useStats from '../hooks/useStats';
import { Character } from 'src/types/character';
import ArrowHeader1 from './ArrowHeader2';
import InjuryIcon from './icons/InjuryIcon';
import InsanityIcon from './icons/InsanityIcon';

const CharacterCard = ({ character }: { character: Character }) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);

  const { stats } = useStats(
    character?.characterInventory,
    character?.attributes,
    character?.perks,
  );

  return (
    <ThemeContainer
      className="w-full"
      chamfer="large"
      borderColor={accentPrimary}
    >
      <div className="bg-primary grid grid-cols-[auto_1fr] gap-8 p-6 clip-8 md:flex-row">
        <ThemeContainer
          className="aspect-square"
          chamfer="medium"
          borderColor={accentPrimary}
        >
          <CloudinaryImage
            className="bg-primary w-[280px]"
            detailsOpen={true}
            url={character.picture?.imageUrl}
            alt={`${character.firstName} ${character.lastName}'s image`}
          />
        </ThemeContainer>
        <div className="flex h-full w-full flex-col justify-between gap-4 md:gap-6">
          <div className="flex w-full items-center justify-between">
            <ArrowHeader1
              title={character.firstName + ' ' + character.lastName}
            />

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
              total={stats.maxHealth}
              color="rgb(248 113 113)"
            >
              <HealthIcon className="size-8" />
            </StatBar>
            <StatBar
              title="Sanity"
              current={character.stats.currentSanity}
              total={stats.maxSanity}
              color="rgb(96 165 250)"
            >
              <SanityIcon className="size-8" />
            </StatBar>
          </div>
          <div className="flex flex-wrap justify-between gap-6">
            <div className="flex items-center gap-6">
              <div
                className="flex flex-col items-center justify-between gap-2"
                key={'evasion'}
              >
                {layoutSize !== 'small' && layoutSize !== 'xsmall' && (
                  <h3 className="text-primary text-xl font-semibold tracking-widest">
                    Speed
                  </h3>
                )}
                <div className="flex items-center justify-center gap-2">
                  <SpeedIcon className="size-8" />
                  <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                    {stats.speed}
                  </p>
                </div>
              </div>
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
                  <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                    {stats.evasion}
                  </p>
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
                  <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                    {stats.armor}
                  </p>
                </div>
              </div>
              <div
                className="flex flex-col items-center justify-between gap-2"
                key={'ward'}
              >
                {layoutSize !== 'small' && layoutSize !== 'xsmall' && (
                  <h3 className="text-primary text-xl font-semibold tracking-widest">
                    Ward
                  </h3>
                )}
                <div className="flex items-center justify-center gap-2">
                  <WardIcon className="text-secondary size-8" />
                  <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                    {stats.ward}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-end gap-6">
              <div
                className="flex flex-col items-center justify-between gap-2"
                key={'ward'}
              >
                {layoutSize !== 'small' && layoutSize !== 'xsmall' && (
                  <h3 className="text-primary text-xl font-semibold tracking-widest">
                    Injuries
                  </h3>
                )}
                <div className="flex items-center justify-center gap-2">
                  <InjuryIcon className="text-secondary size-8" />
                  <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                    {character.stats.injuries}
                  </p>
                </div>
              </div>
              <div
                className="flex flex-col items-center justify-between gap-2"
                key={'ward'}
              >
                {layoutSize !== 'small' && layoutSize !== 'xsmall' && (
                  <h3 className="text-primary text-xl font-semibold tracking-widest">
                    insanities
                  </h3>
                )}
                <div className="flex items-center justify-center gap-2">
                  <InsanityIcon className="text-secondary size-8" />
                  <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                    {character.stats.insanities}
                  </p>
                </div>
              </div>
              <Link className="ml-auto mt-auto self-end" to={`${character.id}`}>
                <BtnRect>Character sheet</BtnRect>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ThemeContainer>
  );
};

export default CharacterCard;
