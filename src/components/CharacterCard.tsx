import { useContext, useRef } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import { LayoutContext } from '../contexts/LayoutContext';
import { Link } from 'react-router-dom';
import WardIcon from './icons/WardIcon';
import ArmorIcon from './icons/ArmorIcon';
import EvasionIcon from './icons/EvasionIcon';
import SpeedIcon from './icons/SpeedIcon';
import CloudinaryImage from './CloudinaryImage';
import { Character } from 'src/types/character';
import ArrowHeader1 from './ArrowHeader2';
import InjuryIcon from './icons/InjuryIcon';
import InsanityIcon from './icons/InsanityIcon';
import CharacterIcon from './icons/CharacterIcon';
import EquipmentIcon from './icons/EquipmentIcon';
import StatBars from './StatBars';
import useCharacter from 'src/hooks/useCharacter';
import RadialMenu from './RadialMenu';
import Tag from './Tag';
import ConditionIcon from './icons/ConditionIcon';
import ConditionLinkField from './form_fields/ConditionLinkField';
import CharacterMenu from './CharacterMenu';

const CharacterCard = ({
  character,
  path,
}: {
  character: Character;
  path?: string;
}) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { mobile } = useContext(LayoutContext);

  const cardRef = useRef(null);

  const filteredCharacter = useCharacter(character);

  return (
    <ThemeContainer
      className="w-full"
      chamfer="medium"
      borderColor={accentPrimary}
    >
      <div ref={cardRef} className="relative grid sm:grid-cols-[1fr_4fr]">
        <div className="absolute left-0 top-0 flex h-full w-[375px] items-center overflow-hidden rounded-bl clip-6">
          <CloudinaryImage
            url={character.picture?.imageUrl}
            alt={`${character.firstName} ${character.lastName}'s image`}
            position={character.picture?.position}
            style={{
              maskImage: 'linear-gradient(to right, black 0%, transparent 90%',
            }}
          />
          {mobile && (
            <div className="absolute inset-0 z-10 bg-zinc-900 bg-opacity-60" />
          )}
        </div>
        <CharacterMenu character={character} />
        <div className="z-10 flex h-full w-full flex-col justify-between gap-4 p-4 sm:col-start-2 md:gap-6 md:p-6">
          <div className="flex w-full items-center justify-between gap-4">
            <ArrowHeader1
              title={
                filteredCharacter.firstName + ' ' + filteredCharacter.lastName
              }
            />
            {!mobile && (
              <div className="flex grow items-center justify-start gap-1">
                {filteredCharacter.conditions?.map((condition) => (
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
            <p className="text-accent mr-8 flex size-8 shrink-0 items-center justify-center text-3xl font-semibold sm:pt-1">
              {filteredCharacter.level}
            </p>
          </div>
          {mobile && (
            <div className="flex grow items-center justify-start gap-1">
              {filteredCharacter.conditions?.map((condition) => (
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
            <StatBars
              stats={{
                maxHealth: filteredCharacter.stats.maxHealth,
                maxSanity: filteredCharacter.stats.maxSanity,
                currentHealth: filteredCharacter.stats.currentHealth,
                currentSanity: filteredCharacter.stats.currentSanity,
              }}
              cardWidth={cardRef.current?.offsetWidth}
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
                    {filteredCharacter.stats.speed}
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
                    {filteredCharacter.stats.evasion}
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
                    {filteredCharacter.stats.armor}
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
                    {filteredCharacter.stats.ward}
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
                    {filteredCharacter.stats.injuries || 0}
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
                    {filteredCharacter.stats.insanities || 0}
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
