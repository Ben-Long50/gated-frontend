import { useContext, useRef } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import { LayoutContext } from '../contexts/LayoutContext';
import WardIcon from './icons/WardIcon';
import ArmorIcon from './icons/ArmorIcon';
import EvasionIcon from './icons/EvasionIcon';
import SpeedIcon from './icons/SpeedIcon';
import CloudinaryImage from './CloudinaryImage';
import ArrowHeader1 from './ArrowHeader2';
import InjuryIcon from './icons/InjuryIcon';
import InsanityIcon from './icons/InsanityIcon';
import Tag from './Tag';
import CharacterRadialMenu from './CharacterRadialMenu';
import CharacterStatBars from './CharacterStatBars';
import useCharacter from 'src/hooks/useCharacter';
import Loading from './Loading';
import { capitalCase } from 'change-case';

const CharacterCard = ({ characterId }: { characterId: number }) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { mobile } = useContext(LayoutContext);

  const { filteredCharacter: character, isLoading } = useCharacter(characterId);

  const cardRef = useRef(null);

  if (isLoading) return <Loading />;

  return (
    <ThemeContainer
      className="w-full"
      chamfer="medium"
      borderColor={accentPrimary}
    >
      <div ref={cardRef} className="grid sm:grid-cols-[1fr_4fr]">
        <div className="absolute left-0 top-0 flex h-full w-[375px] items-center overflow-hidden rounded-bl clip-6">
          <CloudinaryImage
            publicId={character?.picture?.publicId}
            position={character?.picture?.position}
            style={{
              maskImage: 'linear-gradient(to right, black 0%, transparent 90%',
            }}
          />
          {mobile && (
            <div className="absolute inset-0 z-10 bg-zinc-900 bg-opacity-60" />
          )}
        </div>
        <div className="relative flex h-full w-full cursor-pointer flex-col justify-between gap-4 p-4 sm:col-start-2 md:gap-6 md:p-6">
          <CharacterRadialMenu character={character} />
          <div className="flex w-full items-center justify-between gap-4">
            <ArrowHeader1
              title={character?.firstName + ' ' + character?.lastName}
            />
            {character?.npcTypes?.length > 0 && (
              <h4 className="text-tertiary">
                (
                {character.npcTypes.map((type) => capitalCase(type)).join(', ')}
                )
              </h4>
            )}
            {!mobile && (
              <div className="flex grow flex-wrap items-center justify-start gap-1">
                {character?.conditions?.map((condition) => (
                  <Tag key={condition.id} condition={condition} />
                ))}
              </div>
            )}
            <p className="!text-accent flex size-8 shrink-0 items-center justify-center text-3xl font-semibold sm:pt-1">
              {character?.level}
            </p>
          </div>
          {mobile && (
            <div className="flex grow flex-wrap items-center justify-start gap-1">
              {character?.conditions?.map((condition) => (
                <Tag
                  key={condition.id}
                  condition={{
                    condition: condition.condition,
                    stacks: condition.stacks,
                  }}
                />
              ))}
            </div>
          )}
          <div
            className={`${cardRef.current?.offsetWidth < 500 ? 'gap-2' : 'gap-4'} grid h-full w-full grow grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2`}
          >
            <CharacterStatBars
              stats={{
                maxHealth: character?.stats.maxHealth,
                maxSanity: character?.stats.maxSanity,
                currentHealth: character?.stats.currentHealth,
                currentSanity: character?.stats.currentSanity,
              }}
              cardWidth={cardRef.current?.offsetWidth}
              characterId={character.id}
            />
          </div>
          <div
            className={`${mobile ? 'flex-col' : 'flex-row'} flex w-full flex-wrap items-center justify-between gap-6`}
          >
            <div
              className={`${mobile ? 'justify-center' : 'justify-start'} flex items-center justify-start gap-6`}
            >
              <div className="flex flex-col items-center justify-between gap-2">
                {!mobile && (
                  <h3 className="text-primary text-xl font-semibold tracking-widest">
                    Speed
                  </h3>
                )}
                <div className="flex items-center justify-center gap-2">
                  <SpeedIcon className="text-secondary size-8" />
                  <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                    {character?.stats.speed}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-2">
                {!mobile && (
                  <h3 className="text-primary text-xl font-semibold tracking-widest">
                    Evasion
                  </h3>
                )}
                <div className="flex items-center justify-center gap-2">
                  <EvasionIcon className="text-secondary size-8" />
                  <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                    {character?.stats.evasion}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-2">
                {!mobile && (
                  <h3 className="text-primary text-xl font-semibold tracking-widest">
                    Armor
                  </h3>
                )}
                <div className="flex items-center justify-center gap-2">
                  <ArmorIcon className="text-secondary size-8" />
                  <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                    {character?.stats.armor}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-2">
                {!mobile && (
                  <h3 className="text-primary text-xl font-semibold tracking-widest">
                    Ward
                  </h3>
                )}
                <div className="flex items-center justify-center gap-2">
                  <WardIcon className="text-secondary size-8" />
                  <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                    {character?.stats.ward}
                  </p>
                </div>
              </div>
            </div>
            <div className="ml-auto flex items-end justify-end gap-6">
              <div className="flex flex-col items-center justify-between gap-2">
                {!mobile && (
                  <h3 className="text-primary text-xl font-semibold tracking-widest">
                    Injuries
                  </h3>
                )}
                <div className="flex items-center justify-center gap-2">
                  <InjuryIcon className="text-secondary size-8" />
                  <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                    {character?.stats.injuries || 0}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-2">
                {!mobile && (
                  <h3 className="text-primary text-xl font-semibold tracking-widest">
                    Insanities
                  </h3>
                )}
                <div className="flex items-center justify-center gap-2">
                  <InsanityIcon className="text-secondary size-8" />
                  <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                    {character?.stats.insanities || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeContainer>
  );
};

export default CharacterCard;
