import { Fragment, useContext, useEffect, useRef, useState } from 'react';
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
import CharacterStatBars from './CharacterStatBars';
import useCharacter from 'src/hooks/useCharacter';
import Loading from './Loading';
import { capitalCase } from 'change-case';
import ConditionTag from './ConditionTag';
import { Outlet, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import useRadialMenuStore from 'src/stores/radialMenuStore';
import CharacterRadialMenu from './radialMenus/characterRadialMenu/CharacterRadialMenu';

const CharacterCard = ({ id }: { id: number }) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { mobile } = useContext(LayoutContext);
  const { conditionId } = useParams();
  const [cardWidth, setCardWidth] = useState(0);

  const { filteredCharacter: character, isLoading } = useCharacter(id);

  const menuOpen = useRadialMenuStore((state) => state.menuOpen);
  const setMenuOpen = useRadialMenuStore((state) => state.setMenuOpen);
  const setMenu = useRadialMenuStore((state) => state.setMenu);
  const setCoordinates = useRadialMenuStore((state) => state.setCoordinates);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerRef = useRef(null);

  const handleMenu = (e: MouseEvent) => {
    if (!containerRef.current) return;
    setMenu('character', 'large', id);

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!menuOpen) {
      setCoordinates(x, y);
    }
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (containerRef.current) {
      setCardWidth(containerRef.current.offsetWidth);
    }
  }, [inView]);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full" ref={ref}>
      {inView && (
        <ThemeContainer
          className="w-full"
          chamfer="medium"
          borderColor={accentPrimary}
        >
          <div
            ref={containerRef}
            className="relative grid cursor-pointer sm:grid-cols-[1fr_4fr]"
            onClick={(e) => {
              e.stopPropagation();
              handleMenu(e);
            }}
          >
            <div className="absolute left-0 top-0 flex h-full w-[375px] items-center overflow-hidden rounded-bl clip-6">
              <CloudinaryImage
                publicId={character?.picture?.publicId}
                position={character?.picture?.position}
                style={{
                  maskImage:
                    'linear-gradient(to right, black 0%, transparent 90%',
                }}
              />
              {mobile && (
                <div className="absolute inset-0 z-10 bg-zinc-900 bg-opacity-60" />
              )}
            </div>
            <div className="z-10 flex h-full w-full flex-col justify-between gap-4 p-4 sm:col-start-2 md:gap-6 md:p-6">
              <CharacterRadialMenu
                character={character}
                containerRef={containerRef}
              />
              <div className="flex w-full items-center justify-between gap-4">
                <ArrowHeader1
                  title={character?.firstName + ' ' + character?.lastName}
                />
                {character?.npcTypes?.length > 0 && (
                  <h4 className="text-tertiary">
                    (
                    {character.npcTypes
                      .map((type) => capitalCase(type))
                      .join(', ')}
                    )
                  </h4>
                )}
                {!mobile && (
                  <div className="flex grow flex-wrap items-center justify-start gap-1">
                    {character?.conditions?.map((condition) => (
                      <Fragment key={condition.id}>
                        <ConditionTag
                          key={condition.id}
                          condition={condition}
                        />
                        {Number(conditionId) === condition.id && (
                          <Outlet context={{ condition }} />
                        )}
                      </Fragment>
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
                    <ConditionTag key={condition.id} condition={condition} />
                  ))}
                </div>
              )}
              <div
                className={`${cardWidth < 500 ? 'gap-2' : 'gap-4'} grid h-full w-full grow grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2`}
              >
                <CharacterStatBars
                  stats={{
                    maxHealth: character?.stats.maxHealth,
                    maxSanity: character?.stats.maxSanity,
                    currentHealth: character?.stats.currentHealth,
                    currentSanity: character?.stats.currentSanity,
                  }}
                  cardWidth={containerRef.current?.offsetWidth}
                  characterId={character?.id}
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
      )}
    </div>
  );
};

export default CharacterCard;
