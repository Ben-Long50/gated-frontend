import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import { mdiCircleOutline, mdiTriangleDown } from '@mdi/js';
import Icon from '@mdi/react';
import PerkCard from './PerkCard';
import AttributeCard from './AttributeCard';
import useAttributeTree from '../hooks/useAttributeTree';
import { LayoutContext } from '../contexts/LayoutContext';
import EvasionIcon from './icons/EvasionIcon';
import ArmorIcon from './icons/ArmorIcon';
import WardIcon from './icons/WardIcon';
import SpeedIcon from './icons/SpeedIcon';
import { Link, useParams } from 'react-router-dom';
import BtnRect from './buttons/BtnRect';
import InjuryIcon from './icons/InjuryIcon';
import InsanityIcon from './icons/InsanityIcon';
import Loading from './Loading';
import useStats from '../hooks/useStats';
import useCharacterQuery from '../hooks/useCharacterQuery/useCharacterQuery';
import ArrowHeader2 from './ArrowHeader2';
import ArrowHeader1 from './ArrowHeader1';
import ArrowHeader3 from './ArrowHeader3';
import Divider from './Divider';
import BtnAuth from './buttons/BtnAuth';
import StatBars from './StatBars';

const CharacterSheet = () => {
  const { accentPrimary } = useContext(ThemeContext);
  const { apiUrl, user } = useContext(AuthContext);
  const { mobile } = useContext(LayoutContext);

  const [infoVisibility, setInfoVisibility] = useState(mobile ? false : true);

  const cardRef = useRef(null);

  const { characterId } = useParams();

  const {
    data: character,
    isLoading: characterLoading,
    isPending: characterPending,
    isError: characterError,
  } = useCharacterQuery(apiUrl, Number(characterId));

  const isLoading = characterLoading;
  const isPending = characterPending;

  const { stats } = useStats(
    character?.characterInventory,
    character?.attributes,
    character?.perks,
  );

  const attributeTree = useAttributeTree(character?.attributes);

  if (isLoading || isPending) {
    return <Loading />;
  }

  if (characterError) {
    throw new Error('Could not find character');
  }

  return (
    <div className="text-primary flex w-full max-w-5xl flex-col gap-10">
      <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
        <div className="flex w-full gap-4">
          <ThemeContainer
            className="w-full grow"
            chamfer="small"
            borderColor={accentPrimary}
          >
            <div className="flex h-full w-full items-center justify-between gap-4 p-4">
              <ArrowHeader1
                title={character.firstName + ' ' + character.lastName}
              />
              <h1 className="text-accent">{character.level}</h1>
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
            chamfer="medium"
            borderColor={accentPrimary}
            overflowHidden={true}
          >
            <img
              className="clip-6"
              src={character.picture.imageUrl}
              alt="Preview"
            />
          </ThemeContainer>
        )}

        <ThemeContainer
          chamfer="medium"
          className="mb-auto max-h-96 w-full"
          borderColor={accentPrimary}
        >
          <div className="scrollbar-secondary-2 flex max-h-96 flex-col gap-4 overflow-y-auto p-4">
            <div className="flex w-full items-center justify-between">
              <ArrowHeader3
                title={
                  character.firstName + ' ' + character.lastName + "'s Info"
                }
              />
              <button
                className="text-tertiary hover:underline"
                onClick={() => setInfoVisibility(!infoVisibility)}
              >
                {infoVisibility ? 'hide' : 'show'}
              </button>
            </div>
            {infoVisibility && (
              <>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-8 gap-y-4">
                  <>
                    <h4>Character Type</h4>
                    <Icon path={mdiTriangleDown} size={0.375} rotate={-90} />
                    {character.playerCharacter ? (
                      <p>Player Character</p>
                    ) : (
                      <p>Non-player Character</p>
                    )}
                  </>
                  {character ? (
                    <>
                      <h4>Campaign</h4>
                      <Icon path={mdiTriangleDown} size={0.375} rotate={-90} />
                      <p>{character.campaign?.name || 'N/A'}</p>
                    </>
                  ) : (
                    <p>No campaign</p>
                  )}
                  {character ? (
                    <>
                      <h4>Gang</h4>
                      <Icon path={mdiTriangleDown} size={0.375} rotate={-90} />
                      <p>{character.gang?.name || 'N/A'}</p>
                    </>
                  ) : (
                    <p>No campaign</p>
                  )}
                </div>
                <Divider />
                <Link to={`resume?state=Backstory`}>
                  <BtnAuth>Backstory</BtnAuth>
                </Link>
                <Link to={`resume?state=First Taste`}>
                  <BtnAuth>First Taste</BtnAuth>
                </Link>
                <Link to={`resume?state=Bad Medicine`}>
                  <BtnAuth>Bad Medicine</BtnAuth>
                </Link>
              </>
            )}
          </div>
        </ThemeContainer>
      </div>
      <div
        ref={cardRef}
        className={`${cardRef.current?.offsetWidth < 500 ? 'gap-2 px-2' : 'gap-4 px-4'} grid h-full w-full grow grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2`}
      >
        <StatBars
          cardWidth={cardRef.current?.offsetWidth}
          stats={{
            ...character.stats,
            cyber: stats.cyber,
            weight: stats.weight,
            maxWeight: stats.maxWeight,
          }}
        />
      </div>
      <div className="flex flex-col gap-8">
        <ThemeContainer chamfer="medium" borderColor={accentPrimary}>
          <div className="flex flex-wrap justify-center gap-8 px-8 py-4 lg:justify-between lg:pl-10">
            <div className="flex flex-wrap justify-around gap-6">
              <div className="flex flex-col items-center justify-between gap-2">
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Speed
                </h3>
                <div className="flex items-center justify-center gap-4">
                  <SpeedIcon className="size-8" />
                  <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                    {stats.speed}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-2">
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Evasion
                </h3>
                <div className="flex items-center justify-center gap-4">
                  <EvasionIcon className="size-8" />
                  <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                    {stats.evasion}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-2">
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Armor
                </h3>
                <div className="flex items-center justify-center gap-4">
                  <ArmorIcon className="size-8" />
                  <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                    {stats.armor}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-2">
                <h3 className="text-primary text-xl font-semibold tracking-widest">
                  Ward
                </h3>
                <div className="flex items-center justify-center gap-4">
                  <WardIcon className="text-secondary size-8" />
                  <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                    {stats.ward}
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
                chamfer="medium"
                borderColor={accentPrimary}
              >
                <div className="p-6">
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
      <ThemeContainer chamfer="medium" borderColor={accentPrimary}>
        <div className="p-4">
          <div className="flex flex-col items-start gap-4 md:grid md:grid-cols-2">
            <ArrowHeader2 className="col-span-2" title="Perks" />
            {character.perks.map((perk) => {
              return <PerkCard key={perk.name} perk={perk} />;
            })}
          </div>
        </div>
      </ThemeContainer>
      {user?.id === character.userId && (
        <Link to={`update`}>
          <BtnRect
            type="button"
            ariaLabel="Update character information"
            className="sm:w-1/2 sm:justify-self-end"
          >
            Update character info
          </BtnRect>
        </Link>
      )}
    </div>
  );
};

export default CharacterSheet;
