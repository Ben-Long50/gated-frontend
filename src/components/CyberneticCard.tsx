import { mdiChevronDown, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { LayoutContext } from '../contexts/LayoutContext';
import { ThemeContext } from '../contexts/ThemeContext';
import ProfitsIcon from './icons/ProfitsIcon';
import Tag from './Tag';
import ThemeContainer from './ThemeContainer';
import CyberIcon from './icons/CyberIcon';
import PowerIcon from './icons/PowerIcon';
import BodyIcon from './icons/BodyIcon';
import { Link } from 'react-router-dom';
import CloudinaryImage from './CloudinaryImage';
import { AuthContext } from '../contexts/AuthContext';
import SubweaponCard from './SubweaponCard';
import SubarmorCard from './SubarmorCard';
import { Keyword } from '../types/keyword';
import SubactionCard from './SubactionCard';
import { Action } from 'src/types/action';
import { ArmorWithKeywords } from 'src/types/armor';
import { WeaponWithKeywords } from 'src/types/weapon';

const CyberneticCard = ({ cybernetic }, props) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { layoutSize } = useContext(LayoutContext);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [detailHeight, setDetailHeight] = useState(1000);
  const [descriptionHeight, setDescriptionHeight] = useState(1000);
  const [toolTip, setToolTip] = useState('');

  useEffect(() => {
    if (toolTip) {
      document.addEventListener('click', () => setToolTip(''));
    } else {
      document.removeEventListener('click', () => setToolTip(''));
    }

    return () => {
      document.removeEventListener('click', () => setToolTip(''));
    };
  }, [toolTip]);

  const detailRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (detailRef.current) {
      setDetailHeight(detailRef.current.offsetHeight);
    }
    if (descriptionRef.current) {
      setDescriptionHeight(descriptionRef.current.offsetHeight);
    }
  }, [detailRef.current]);

  return (
    <ThemeContainer
      chamfer="24"
      className="w-full rounded-br-5xl rounded-tl-5xl shadow-lg shadow-slate-950"
      borderColor={accentPrimary}
    >
      <div
        className={`${props.className} bg-primary timing flex cursor-pointer flex-col p-4 clip-6`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!toolTip) {
            setDetailsOpen(!detailsOpen);
            setDescriptionOpen(!detailsOpen);
          } else {
            setToolTip('');
          }
        }}
      >
        {layoutSize === 'small' || layoutSize === 'xsmall' ? (
          <div className="relative flex h-full flex-col gap-4 sm:gap-8">
            <div className="flex w-full items-start justify-between gap-8">
              <div>
                <div className="flex items-center justify-start gap-4">
                  <h2> {cybernetic.name}</h2>
                  {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
                    <Link to={`${cybernetic.id}/update`}>
                      <button className="text-accent hover:underline">
                        Edit
                      </button>
                    </Link>
                  )}
                </div>
                <p className="text-tertiary flex-1 whitespace-nowrap text-left">
                  (
                  {cybernetic.cyberneticType[0].toUpperCase() +
                    cybernetic.cyberneticType.slice(1)}{' '}
                  augment)
                </p>
              </div>
              <div className="flex items-center justify-end gap-4">
                <ProfitsIcon className="size-6 shrink-0" />
                {cybernetic.price ? (
                  <p>{cybernetic.price + 'p'}</p>
                ) : (
                  <Icon className="text-secondary" path={mdiClose} size={1.5} />
                )}
              </div>
            </div>
            {cybernetic.keywords.length > 0 && (
              <div className="flex w-full flex-wrap items-center gap-1 justify-self-start">
                {cybernetic.keywords.map(
                  (item: { keyword: Keyword; value?: number }) => {
                    return (
                      <Tag
                        key={item.keyword.id}
                        label={
                          item.value
                            ? item.keyword.name + ' ' + item.value
                            : item.keyword.name
                        }
                        description={item.keyword.description}
                        toolTip={toolTip}
                        setToolTip={setToolTip}
                      />
                    );
                  },
                )}
              </div>
            )}
            <div
              className={`flex ${detailsOpen ? 'flex-col' : 'flex-row'} items-start justify-start gap-6`}
            >
              {cybernetic.picture && (
                <CloudinaryImage
                  className={`${detailsOpen ? 'max-w-full' : 'max-w-48'} aspect-square shrink clip-6`}
                  url={cybernetic.picture?.imageUrl}
                  alt={cybernetic.name + ' ' + 'image'}
                />
              )}
              <div
                className={`flex h-full ${detailsOpen ? 'flex-row items-center justify-start' : 'flex-col items-start justify-between'} w-full gap-4 sm:gap-8`}
              >
                {cybernetic.body && (
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <BodyIcon className="size-8" />
                      {cybernetic.body.map((body, index) => {
                        return (
                          <p key={body}>
                            {body}
                            <span>
                              {index < cybernetic.body.length - 1 && ','}
                            </span>
                          </p>
                        );
                      })}
                    </div>
                  </div>
                )}
                {cybernetic.stats.cyber && (
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2">
                      <CyberIcon className="size-8" />
                      <p>{cybernetic.stats.cyber}</p>
                    </div>
                  </div>
                )}
                {cybernetic.stats.power && (
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2">
                      <PowerIcon className="size-8" />
                      <p>{cybernetic.stats.power}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <span
              className={`absolute bottom-0 right-0 transition duration-300 ${detailsOpen && '-rotate-180'}`}
            >
              <Icon
                path={mdiChevronDown}
                size={1.1}
                className={`text-secondary`}
              ></Icon>
            </span>
          </div>
        ) : (
          <div className="relative flex h-full gap-8">
            {cybernetic.picture && (
              <CloudinaryImage
                className={`${detailsOpen ? 'max-w-96' : 'max-w-60'} aspect-square shrink clip-6`}
                url={cybernetic.picture?.imageUrl}
                alt={cybernetic.name + ' ' + 'image'}
              />
            )}
            <div className="flex h-full grow flex-col items-start justify-between gap-6">
              <div className="flex w-full items-start justify-between gap-4">
                <div>
                  <div className="flex items-center justify-start gap-4">
                    <h2> {cybernetic.name}</h2>
                    {(user?.role === 'ADMIN' ||
                      user?.role === 'SUPERADMIN') && (
                      <Link to={`${cybernetic.id}/update`}>
                        <button className="text-accent hover:underline">
                          Edit
                        </button>
                      </Link>
                    )}
                  </div>
                  <p className="text-tertiary flex-1 whitespace-nowrap text-left">
                    (
                    {cybernetic.cyberneticType[0].toUpperCase() +
                      cybernetic.cyberneticType.slice(1)}{' '}
                    augment)
                  </p>
                </div>
                <div className="flex items-center justify-end gap-4">
                  <ProfitsIcon className="size-6 shrink-0" />
                  {cybernetic.price ? (
                    <p>{cybernetic.price + 'p'}</p>
                  ) : (
                    <Icon
                      className="text-secondary"
                      path={mdiClose}
                      size={1.5}
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                {cybernetic.body && (
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2">
                      <BodyIcon className="size-8" />
                      {cybernetic.body.map((body, index) => {
                        return (
                          <p key={body}>
                            {body}
                            <span>
                              {index < cybernetic.body.length - 1 && ','}
                            </span>
                          </p>
                        );
                      })}
                    </div>
                  </div>
                )}
                {cybernetic.keywords.length > 0 && (
                  <div className="flex w-full flex-wrap items-center gap-2 justify-self-start">
                    {cybernetic.keywords.map(
                      (item: { keyword: Keyword; value?: number }) => {
                        return (
                          <Tag
                            key={item.keyword.id}
                            label={
                              item.value
                                ? item.keyword.name + ' ' + item.value
                                : item.keyword.name
                            }
                            description={item.keyword.description}
                            toolTip={toolTip}
                            setToolTip={setToolTip}
                          />
                        );
                      },
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-start gap-8">
                {cybernetic.stats.cyber && (
                  <div className="flex flex-col items-center gap-1">
                    <p>CBR</p>
                    <div className="flex items-center gap-2">
                      <CyberIcon className="size-8" />
                      <p className="sm:pt-1">{cybernetic.stats.cyber}</p>
                    </div>
                  </div>
                )}
                {cybernetic.stats.power && (
                  <div className="flex flex-col items-center gap-1">
                    <p>PWR</p>
                    <div className="flex items-center gap-2">
                      <PowerIcon className="size-8" />
                      <p className="sm:pt-1">{cybernetic.stats.power}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={`timing overflow-hidden`}>
                <p
                  ref={descriptionRef}
                  className={`timing text-secondary flex flex-col gap-8 pr-8`}
                  style={
                    descriptionOpen
                      ? {
                          marginTop: 0,
                        }
                      : {
                          marginTop: -descriptionHeight - 4,
                        }
                  }
                >
                  {cybernetic.description}
                </p>
              </div>
              <span
                className={`absolute bottom-0 right-0 transition duration-300 ${detailsOpen && '-rotate-180'}`}
              >
                <Icon
                  path={mdiChevronDown}
                  size={1.1}
                  className={`text-secondary`}
                ></Icon>
              </span>
            </div>
          </div>
        )}
        <div className={`overflow-hidden`}>
          <div
            ref={detailRef}
            className={`timing flex flex-col gap-8 p-0.5`}
            style={
              detailsOpen
                ? {
                    marginTop: 0,
                  }
                : {
                    marginTop: -detailHeight - 4,
                  }
            }
          >
            {layoutSize === 'small' ||
              (layoutSize === 'xsmall' && <p>{cybernetic.description}</p>)}
            {cybernetic.weapons.length > 0 && (
              <ThemeContainer
                className={` ${detailsOpen && 'mt-6'}`}
                chamfer="16"
                borderColor={accentPrimary}
              >
                <p className="text-accent absolute -top-3 left-5 z-20 text-base">
                  Integrated weapons
                </p>
                <div className="bg-primary flex flex-col gap-4 p-4 clip-4">
                  {cybernetic.weapons.map(
                    (weapon: WeaponWithKeywords, index: number) => {
                      return (
                        <div
                          key={weapon.name}
                          className="flex h-full grow flex-col items-start justify-between gap-4"
                        >
                          <SubweaponCard
                            weapon={weapon}
                            toolTip={toolTip}
                            setToolTip={setToolTip}
                          />
                          {index < cybernetic.weapons.length - 1 && (
                            <hr className="w-full border-yellow-300 border-opacity-50" />
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              </ThemeContainer>
            )}
            {cybernetic.armor.length > 0 && (
              <ThemeContainer
                className={` ${detailsOpen && 'mt-6'}`}
                chamfer="16"
                borderColor={accentPrimary}
              >
                <p className="text-accent absolute -top-3 left-5 z-20 text-base">
                  Integrated armor
                </p>
                <div className="bg-primary flex flex-col gap-4 p-4 clip-4">
                  {cybernetic.armor.map(
                    (armor: ArmorWithKeywords, index: number) => {
                      return (
                        <>
                          <SubarmorCard
                            key={armor.id}
                            armor={armor}
                            toolTip={toolTip}
                            setToolTip={setToolTip}
                          />
                          {index < cybernetic.armor.length - 1 && (
                            <hr className="w-full border-yellow-300 border-opacity-50" />
                          )}
                        </>
                      );
                    },
                  )}
                </div>
              </ThemeContainer>
            )}
            {cybernetic.actions.length > 0 && (
              <ThemeContainer chamfer="16" borderColor={accentPrimary}>
                <p className="text-accent absolute -top-3 left-5 z-20 text-base">
                  Unique actions
                </p>
                <div className="bg-primary flex flex-col gap-4 p-4 clip-4">
                  {cybernetic.actions.map((action: Action, index: number) => {
                    return (
                      <>
                        <SubactionCard key={action.id} action={action} />
                        {index < cybernetic.actions.length - 1 && (
                          <hr className="w-full border-yellow-300 border-opacity-50" />
                        )}
                      </>
                    );
                  })}
                </div>
              </ThemeContainer>
            )}
          </div>
        </div>
      </div>
    </ThemeContainer>
  );
};

export default CyberneticCard;
