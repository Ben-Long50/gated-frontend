import { mdiChevronDown, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useState } from 'react';
import { LayoutContext } from '../contexts/LayoutContext';
import { ThemeContext } from '../contexts/ThemeContext';
import ProfitsIcon from './icons/ProfitsIcon';
import Tag from './Tag';
import ThemeContainer from './ThemeContainer';
import CyberIcon from './icons/CyberIcon';
import PowerIcon from './icons/PowerIcon';
import DamageIcon from './icons/DamageIcon';
import SalvoIcon from './icons/SalvoIcon';
import FlurryIcon from './icons/FlurryIcon';
import RangeIcon from './icons/RangeIcon';
import MagCapacityIcon from './icons/MagCapacityIcon';
import ArmorIcon from './icons/ArmorIcon';
import WardIcon from './icons/WardIcon';
import BlockIcon from './icons/BlockIcon';
import BodyIcon from './icons/BodyIcon';
import { Link } from 'react-router-dom';
import ActionIcon from './icons/ActionIcon';
import HealthIcon from './icons/HealthIcon';
import SanityIcon from './icons/SanityIcon';
import { Keyword } from 'src/hooks/useKeywords';

const CyberneticCard = ({ cybernetic }, props) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <ThemeContainer
      chamfer="24"
      className="rounded-br-5xl rounded-tl-5xl w-full shadow-lg shadow-slate-950"
      borderColor={accentPrimary}
    >
      <div
        className={`${props.className} bg-primary timing flex cursor-pointer flex-col p-4 clip-6`}
        onClick={async (e) => {
          e.preventDefault();
          setDetailsOpen(!detailsOpen);
        }}
      >
        {layoutSize === 'small' || layoutSize === 'xsmall' ? (
          <div className="relative flex h-full flex-col gap-2 sm:gap-8">
            <div className="flex w-full items-start justify-between gap-8">
              <div>
                <div className="flex items-center justify-start gap-4">
                  <h2> {cybernetic.name}</h2>
                  <Link to={`${cybernetic.id}/update`}>
                    <button className="text-accent hover:underline">
                      Edit
                    </button>
                  </Link>
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
                      />
                    );
                  },
                )}
              </div>
            )}
            <div
              className={`flex ${detailsOpen ? 'flex-col' : 'flex-row'} items-center justify-start gap-6`}
            >
              {cybernetic.picture && (
                <ThemeContainer chamfer="24" borderColor={accentPrimary}>
                  <img
                    className={`aspect-square ${detailsOpen ? 'max-w-full' : 'max-w-48'} shrink clip-6`}
                    src={cybernetic.picture?.imageUrl}
                    alt={cybernetic.name + ' ' + 'image'}
                  />
                </ThemeContainer>
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
              <ThemeContainer chamfer="24" borderColor={accentPrimary}>
                <img
                  className={`${detailsOpen ? 'max-w-96' : 'max-w-60'} aspect-square shrink clip-6`}
                  src={cybernetic.picture?.imageUrl}
                  alt={cybernetic.name + ' ' + 'image'}
                />
              </ThemeContainer>
            )}
            <div className="flex h-full grow flex-col items-start justify-between gap-6">
              <div className="flex w-full items-start justify-between gap-4">
                <div>
                  <div className="flex items-center justify-start gap-4">
                    <h2> {cybernetic.name}</h2>
                    <Link to={`${cybernetic.id}/update`}>
                      <button className="text-accent hover:underline">
                        Edit
                      </button>
                    </Link>
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
        <div
          className={`timing ease-in-out ${!detailsOpen ? 'hidden' : 'flex'} mt-8 flex-col gap-8`}
        >
          <p className="text-secondary">{cybernetic.description}</p>
          {cybernetic.weapons.length > 0 && (
            <ThemeContainer chamfer="16" borderColor={accentPrimary}>
              <p className="text-accent absolute -top-3 left-5 z-20 text-base">
                Integrated weapons
              </p>
              <div className="bg-primary flex flex-col gap-4 p-4 clip-4">
                {cybernetic.weapons.map((weapon, index) => {
                  return (
                    <div
                      key={weapon.name}
                      className="flex h-full grow flex-col items-start justify-between gap-4"
                    >
                      <h3> {weapon.name}</h3>
                      <div className="flex items-center gap-2">
                        {weapon.keywords?.map(
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
                              />
                            );
                          },
                        )}
                      </div>
                      <div className="flex flex-wrap items-center justify-start gap-8">
                        {weapon.stats.damage && (
                          <div className="flex flex-col items-center gap-1">
                            {layoutSize !== 'small' &&
                              layoutSize !== 'xsmall' && <p>DMG</p>}
                            <div className="flex items-center gap-2">
                              <DamageIcon className="size-8" />
                              <p className="sm:pt-1">{weapon.stats.damage}</p>
                            </div>
                          </div>
                        )}
                        {weapon.stats.salvo && (
                          <div className="flex flex-col items-center gap-1">
                            {layoutSize !== 'small' &&
                              layoutSize !== 'xsmall' && <p>SLV</p>}
                            <div className="flex items-center gap-2">
                              <SalvoIcon className="size-8" />
                              <p className="sm:pt-1">{weapon.stats.salvo}</p>
                            </div>
                          </div>
                        )}
                        {weapon.stats.flurry && (
                          <div className="flex flex-col items-center gap-1">
                            {layoutSize !== 'small' &&
                              layoutSize !== 'xsmall' && <p>FLR</p>}
                            <div className="flex items-center gap-2">
                              <FlurryIcon className="size-8" />
                              <p className="sm:pt-1">{weapon.stats.flurry}</p>
                            </div>
                          </div>
                        )}
                        {weapon.stats.range && (
                          <div className="flex flex-col items-center gap-1">
                            {layoutSize !== 'small' &&
                              layoutSize !== 'xsmall' && <p>RNG</p>}
                            <div className="flex items-center gap-2">
                              <RangeIcon className="size-8" />
                              <p className="sm:pt-1">{weapon.stats.range}</p>
                            </div>
                          </div>
                        )}
                        {weapon.stats.magCapacity && (
                          <div className="flex flex-col items-center gap-1">
                            {layoutSize !== 'small' &&
                              layoutSize !== 'xsmall' && <p>MAG</p>}
                            <div className="flex items-center gap-2">
                              <MagCapacityIcon className="size-8" />
                              <p className="sm:pt-1">
                                {weapon.stats.magCapacity}/
                                {weapon.stats.magCapacity *
                                  (weapon.stats.magCount - 1)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      {index < cybernetic.weapons.length - 1 && (
                        <hr className="w-full border-yellow-300 border-opacity-50" />
                      )}
                    </div>
                  );
                })}
              </div>
            </ThemeContainer>
          )}
          {cybernetic.armor.length > 0 && (
            <ThemeContainer chamfer="16" borderColor={accentPrimary}>
              <p className="text-accent absolute -top-3 left-5 z-20 text-base">
                Integrated armor
              </p>
              <div className="bg-primary flex flex-col gap-4 p-4 clip-4">
                {cybernetic.armor.map((armor, index) => {
                  return (
                    <>
                      <div
                        key={armor.name}
                        className="flex h-full grow flex-col items-start justify-between gap-4"
                      >
                        <h3> {armor.name}</h3>
                        <div className="flex items-center gap-2">
                          {armor.keywords?.map(
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
                                />
                              );
                            },
                          )}
                        </div>
                        <div className="flex flex-wrap items-center justify-start gap-8">
                          {armor.stats.armor && (
                            <div className="flex flex-col items-center gap-1">
                              {layoutSize !== 'small' &&
                                layoutSize !== 'xsmall' && <p>AV</p>}
                              <div className="flex items-center gap-2">
                                <ArmorIcon className="size-8" />
                                <p className="sm:pt-1">{armor.stats.armor}</p>
                              </div>
                            </div>
                          )}
                          {armor.stats.ward && (
                            <div className="flex flex-col items-center gap-1">
                              {layoutSize !== 'small' &&
                                layoutSize !== 'xsmall' && <p>WV</p>}
                              <div className="flex items-center gap-2">
                                <WardIcon className="size-8" />
                                <p className="sm:pt-1">{armor.stats.ward}</p>
                              </div>
                            </div>
                          )}
                          {armor.stats.block && (
                            <div className="flex flex-col items-center gap-1">
                              {layoutSize !== 'small' &&
                                layoutSize !== 'xsmall' && <p>BP</p>}
                              <div className="flex items-center gap-2">
                                <BlockIcon className="size-8" />
                                <p className="sm:pt-1">{armor.stats.block}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        {index < cybernetic.armor.length - 1 && (
                          <hr className="w-full border-yellow-300 border-opacity-50" />
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
            </ThemeContainer>
          )}
          {cybernetic.actions.length > 0 && (
            <ThemeContainer chamfer="16" borderColor={accentPrimary}>
              <p className="text-accent absolute -top-3 left-5 z-20 text-base">
                Unique actions
              </p>
              <div className="bg-primary flex flex-col gap-4 p-4 clip-4">
                {cybernetic.actions.map((action, index) => {
                  return (
                    <div
                      key={action.name}
                      className="flex h-full grow flex-col items-start justify-start gap-4"
                    >
                      <div className="flex items-center justify-start gap-4">
                        <h3> {action.name}</h3>
                        <p className="text-tertiary">
                          (
                          {action.actionType[0].toUpperCase() +
                            action.actionType.slice(1)}
                          )
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-start gap-8">
                        <p className="font-semibold tracking-widest">Costs</p>
                        {action.costs.length > 0 &&
                          action.costs.map((cost) => {
                            return (
                              <div
                                key={cost.stat}
                                className="flex flex-col items-center"
                              >
                                <div className="flex items-center gap-2">
                                  {cost.stat === 'health' && (
                                    <HealthIcon className="size-8" />
                                  )}
                                  {cost.stat === 'sanity' && (
                                    <SanityIcon className="size-8" />
                                  )}
                                  {cost.stat === 'actionPoints' && (
                                    <ActionIcon className="size-8" />
                                  )}
                                  {cost.stat === 'power' && (
                                    <PowerIcon className="size-8" />
                                  )}
                                  <p className="sm:pt-1">{cost.value}</p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      <p>{action.description}</p>
                      {index < cybernetic.actions.length - 1 && (
                        <hr className="w-full border-yellow-300 border-opacity-50" />
                      )}
                    </div>
                  );
                })}
              </div>
            </ThemeContainer>
          )}
        </div>
      </div>
    </ThemeContainer>
  );
};

export default CyberneticCard;
