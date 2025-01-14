import { mdiChevronDown, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { LayoutContext } from '../contexts/LayoutContext';
import { ThemeContext } from '../contexts/ThemeContext';
import ProfitsIcon from './icons/ProfitsIcon';
import Tag from './Tag';
import ThemeContainer from './ThemeContainer';
import ArmorIcon from './icons/ArmorIcon';
import WardIcon from './icons/WardIcon';
import BlockIcon from './icons/BlockIcon';
import PowerIcon from './icons/PowerIcon';
import EquipIcon from './icons/EquipIcon';
import { Link } from 'react-router-dom';
import { Keyword } from 'src/hooks/useKeywords';
import CloudinaryImage from './CloudinaryImage';
import { AuthContext } from '../contexts/AuthContext';

const ArmorCard = ({ armor }, props) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { layoutSize } = useContext(LayoutContext);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailHeight, setDetailHeight] = useState(1000);
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
          e.stopPropagation();
          if (!toolTip) {
            setDetailsOpen(!detailsOpen);
          } else {
            setToolTip('');
          }
        }}
      >
        {layoutSize === 'small' || layoutSize === 'xsmall' ? (
          <>
            <div className="relative flex h-full flex-col gap-4 sm:gap-8">
              <div className="flex w-full items-start justify-between gap-8">
                <div className="flex items-center justify-start gap-4">
                  <h2> {armor.name}</h2>
                  {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
                    <Link to={`/glam/codex/armor/${armor.id}/update`}>
                      <button className="text-accent hover:underline">
                        Edit
                      </button>
                    </Link>
                  )}
                </div>
                <div className="flex items-center justify-end gap-4">
                  <ProfitsIcon className="size-6 shrink-0" />
                  {armor.price ? (
                    <p>{armor.price + 'p'}</p>
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
                {armor.keywords.map(
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
                {armor.picture && (
                  <CloudinaryImage
                    url={armor.picture?.imageUrl}
                    alt={armor.name + ' ' + 'image'}
                    detailsOpen={detailsOpen}
                  />
                )}
                <div
                  className={`timing flex h-full ${armor.picture && !detailsOpen ? 'flex-col' : 'flex-row pb-4'} flex-wrap items-start justify-between gap-4 sm:gap-8`}
                >
                  {armor.stats.armor && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <ArmorIcon className="size-8" />
                        <p>{armor.stats.armor}</p>
                      </div>
                    </div>
                  )}
                  {armor.stats.ward && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <WardIcon className="size-8" />
                        <p>{armor.stats.ward}</p>
                      </div>
                    </div>
                  )}
                  {armor.stats.block && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <BlockIcon className="size-8" />
                        <p>{armor.stats.block}</p>
                      </div>
                    </div>
                  )}
                  {armor.stats.power && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <PowerIcon className="size-8" />
                        <p>{armor.stats.power}</p>
                      </div>
                    </div>
                  )}
                  {armor.stats.weight && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <EquipIcon className="size-8" />
                        <p>{armor.stats.weight}</p>
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
                {armor.description}
              </p>
            </div>
          </>
        ) : (
          <div className="relative flex h-full gap-8">
            {armor.picture && (
              <CloudinaryImage
                url={armor.picture?.imageUrl}
                alt={armor.name + ' ' + 'image'}
                detailsOpen={detailsOpen}
              />
            )}
            <div className="flex h-full grow flex-col items-start justify-between gap-6">
              <div className="flex w-full items-start justify-between gap-8">
                <div className="flex items-center justify-start gap-4">
                  <h2> {armor.name}</h2>
                  {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
                    <Link to={`${armor.id}/update`}>
                      <button className="text-accent hover:underline">
                        Edit
                      </button>
                    </Link>
                  )}
                </div>
                <div className="flex items-center justify-end gap-4">
                  <ProfitsIcon className="size-6 shrink-0" />
                  {armor.price ? (
                    <p>{armor.price + 'p'}</p>
                  ) : (
                    <Icon
                      className="text-secondary"
                      path={mdiClose}
                      size={1.5}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-1">
                {armor.keywords.map(
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
                {armor.stats.armor && (
                  <div className="flex flex-col items-center gap-1">
                    <p>AV</p>
                    <div className="flex items-center gap-2">
                      <ArmorIcon className="size-8" />
                      <p className="sm:pt-1">{armor.stats.armor}</p>
                    </div>
                  </div>
                )}
                {armor.stats.ward && (
                  <div className="flex flex-col items-center gap-1">
                    <p>WV</p>
                    <div className="flex items-center gap-2">
                      <WardIcon className="size-8" />
                      <p className="sm:pt-1">{armor.stats.ward}</p>
                    </div>
                  </div>
                )}
                {armor.stats.block && (
                  <div className="flex flex-col items-center gap-1">
                    <p>BP</p>
                    <div className="flex items-center gap-2">
                      <BlockIcon className="size-8" />
                      <p className="sm:pt-1">{armor.stats.block}</p>
                    </div>
                  </div>
                )}
                {armor.stats.power && (
                  <div className="flex flex-col items-center gap-1">
                    <p>PWR</p>
                    <div className="flex items-center gap-2">
                      <PowerIcon className="size-8" />
                      <p className="sm:pt-1">{armor.stats.power}</p>
                    </div>
                  </div>
                )}
                {armor.stats.weight && (
                  <div className="flex flex-col items-center gap-1">
                    <p>WGT</p>
                    <div className="flex items-center gap-2">
                      <EquipIcon className="size-8" />
                      <p className="sm:pt-1">{armor.stats.weight}</p>
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
                  {armor.description}
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

export default ArmorCard;
