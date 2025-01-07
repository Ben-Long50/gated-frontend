import { mdiChevronDown, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import DamageIcon from './icons/DamageIcon';
import SalvoIcon from './icons/SalvoIcon';
import FlurryIcon from './icons/FlurryIcon';
import RangeIcon from './icons/RangeIcon';
import EquipIcon from './icons/EquipIcon';
import ThemeContainer from './ThemeContainer';
import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import Tag from './Tag';
import ProfitsIcon from './icons/ProfitsIcon';
import { LayoutContext } from '../contexts/LayoutContext';
import MagCapacityIcon from './icons/MagCapacityIcon';
import { Link } from 'react-router-dom';
import { Keyword } from 'src/hooks/useKeywords';
import CloudinaryImage from './CloudinaryImage';

const WeaponCard = ({ weapon }, props) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailHeight, setDetailHeight] = useState(1000);
  const [toolTip, setToolTip] = useState(null);

  useEffect(() => {
    if (toolTip) {
      document.addEventListener('click', () => setToolTip(null));
    } else {
      document.removeEventListener('click', () => setToolTip(null));
    }

    return () => {
      document.removeEventListener('click', () => setToolTip(null));
    };
  }, [toolTip]);

  const detailRef = useRef(null);

  useEffect(() => {
    if (detailRef.current) {
      setDetailHeight(detailRef.current.offsetHeight);
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
        onClick={async (e) => {
          e.preventDefault();
          if (!toolTip) {
            setDetailsOpen(!detailsOpen);
          }
        }}
      >
        {layoutSize === 'small' || layoutSize === 'xsmall' ? (
          <>
            <div className="relative flex h-full flex-col gap-4 sm:gap-8">
              <div className="flex w-full items-start justify-between gap-8">
                <div className="flex items-center justify-start gap-4">
                  <h2> {weapon.name}</h2>
                  <Link to={`${weapon.id}/update`}>
                    <button className="text-accent hover:underline">
                      Edit
                    </button>
                  </Link>
                </div>
                <div className="flex items-center justify-end gap-4">
                  <ProfitsIcon className="size-6 shrink-0" />
                  {weapon.price ? (
                    <p>{weapon.price + 'p'}</p>
                  ) : (
                    <Icon
                      className="text-secondary"
                      path={mdiClose}
                      size={1.5}
                    />
                  )}
                </div>
              </div>
              <div className="flex w-full flex-wrap items-center gap-1 justify-self-start">
                {weapon.keywords.map(
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
              <div
                className={`flex ${detailsOpen ? 'flex-col' : 'flex-row'} items-start justify-start gap-6`}
              >
                {weapon.picture && (
                  <CloudinaryImage
                    className={`${detailsOpen ? 'max-w-full' : 'max-w-48'} aspect-square shrink clip-6`}
                    url={weapon.picture?.imageUrl}
                    alt={weapon.name + ' ' + 'image'}
                  />
                )}
                <div
                  className={`timing flex h-full ${weapon.picture && !detailsOpen ? 'flex-col' : 'flex-row pb-4'} flex-wrap items-start justify-between gap-4 sm:gap-8`}
                >
                  {weapon.stats.damage && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <DamageIcon className="size-8" />
                        <p>{weapon.stats.damage}</p>
                      </div>
                    </div>
                  )}
                  {weapon.stats.salvo && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <SalvoIcon className="size-8" />
                        <p>{weapon.stats.salvo}</p>
                      </div>
                    </div>
                  )}
                  {weapon.stats.flurry && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <FlurryIcon className="size-8" />
                        <p>{weapon.stats.flurry}</p>
                      </div>
                    </div>
                  )}
                  {weapon.stats.range && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <RangeIcon className="size-8" />
                        <p>{weapon.stats.range}</p>
                      </div>
                    </div>
                  )}
                  {weapon.stats.magCapacity && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <MagCapacityIcon className="size-8" />
                        <p>
                          {weapon.stats.magCapacity}/
                          {weapon.stats.magCapacity *
                            (weapon.stats.magCount - 1)}
                        </p>
                      </div>
                    </div>
                  )}
                  {weapon.stats.weight && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <EquipIcon className="size-8" />
                        <p>{weapon.stats.weight}</p>
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
            <div className="overflow-hidden">
              <p
                ref={detailRef}
                className={`timing text-secondary pr-8`}
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
                {weapon.description}
              </p>
            </div>
          </>
        ) : (
          <div className="relative flex h-full gap-8">
            {weapon.picture && (
              <CloudinaryImage
                className={`${detailsOpen ? 'max-w-96' : 'max-w-60'} aspect-square shrink clip-6`}
                url={weapon.picture?.imageUrl}
                alt={weapon.name + ' ' + 'image'}
              />
            )}
            <div className="flex h-full grow flex-col items-start justify-between gap-6">
              <div className="flex w-full items-start justify-between gap-8">
                <div className="flex items-center justify-start gap-4">
                  <h2> {weapon.name}</h2>
                  <Link to={`${weapon.id}/update`}>
                    <button className="text-accent hover:underline">
                      Edit
                    </button>
                  </Link>
                </div>
                <div className="flex items-center justify-end gap-4">
                  <ProfitsIcon className="size-6 shrink-0" />
                  {weapon.price ? (
                    <p>{weapon.price + 'p'}</p>
                  ) : (
                    <Icon
                      className="text-secondary"
                      path={mdiClose}
                      size={1.5}
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {weapon.keywords.map(
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
              <div className="flex flex-wrap items-center justify-start gap-8">
                {weapon.stats.damage && (
                  <div className="flex flex-col items-center gap-1">
                    <p>DMG</p>
                    <div className="flex items-center gap-2">
                      <DamageIcon className="size-8" />
                      <p className="sm:pt-1">{weapon.stats.damage}</p>
                    </div>
                  </div>
                )}
                {weapon.stats.salvo && (
                  <div className="flex flex-col items-center gap-1">
                    <p>SLV</p>
                    <div className="flex items-center gap-2">
                      <SalvoIcon className="size-8" />
                      <p className="sm:pt-1">{weapon.stats.salvo}</p>
                    </div>
                  </div>
                )}
                {weapon.stats.flurry && (
                  <div className="flex flex-col items-center gap-1">
                    <p>FLR</p>
                    <div className="flex items-center gap-2">
                      <FlurryIcon className="size-8" />
                      <p className="sm:pt-1">{weapon.stats.flurry}</p>
                    </div>
                  </div>
                )}
                {weapon.stats.range && (
                  <div className="flex flex-col items-center gap-1">
                    <p>RNG</p>
                    <div className="flex items-center gap-2">
                      <RangeIcon className="size-8" />
                      <p className="sm:pt-1">{weapon.stats.range}</p>
                    </div>
                  </div>
                )}
                {weapon.stats.magCapacity && (
                  <div className="flex flex-col items-center gap-1">
                    <p>MAG</p>
                    <div className="flex items-center gap-2">
                      <MagCapacityIcon className="size-8" />
                      <p className="sm:pt-1">
                        {weapon.stats.magCapacity}/
                        {weapon.stats.magCapacity * (weapon.stats.magCount - 1)}
                      </p>
                    </div>
                  </div>
                )}
                {weapon.stats.weight && (
                  <div className="flex flex-col items-center gap-1">
                    <p>WGT</p>
                    <div className="flex items-center gap-2">
                      <EquipIcon className="size-8" />
                      <p className="sm:pt-1">{weapon.stats.weight}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={`overflow-hidden`}>
                <p
                  ref={detailRef}
                  className={`timing text-secondary pr-8`}
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
                  {weapon.description}
                </p>
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
        )}
      </div>
    </ThemeContainer>
  );
};

export default WeaponCard;
