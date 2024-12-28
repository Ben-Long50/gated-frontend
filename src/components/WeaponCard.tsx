import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import DamageIcon from './icons/DamageIcon';
import SalvoIcon from './icons/SalvoIcon';
import FlurryIcon from './icons/FlurryIcon';
import RangeIcon from './icons/RangeIcon';
import EquipIcon from './icons/EquipIcon';
import ThemeContainer from './ThemeContainer';
import { useContext, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import Tag from './Tag';
import ProfitsIcon from './icons/ProfitsIcon';
import { LayoutContext } from '../contexts/LayoutContext';
import MagCapacityIcon from './icons/MagCapacityIcon';

const WeaponCard = ({ weapon }, props) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <div
      className={`${props.className} bg-secondary timing flex cursor-pointer flex-col p-4 clip-4`}
      onClick={async (e) => {
        e.preventDefault();
        setDetailsOpen(!detailsOpen);
      }}
    >
      {layoutSize === 'small' || layoutSize === 'xsmall' ? (
        <div className="relative flex h-full flex-col items-center gap-4 sm:gap-8">
          <div className="flex w-full items-start justify-between gap-8">
            <h2> {weapon.name}</h2>
            <div className="flex items-center justify-end gap-4">
              <ProfitsIcon className="size-6" />
              <p>{weapon.price}p</p>
            </div>
          </div>
          <div className="flex w-full flex-wrap items-center gap-1 justify-self-start">
            {weapon.keywords.map((keyword) => {
              return (
                <Tag
                  key={keyword.id}
                  label={keyword.name}
                  description={keyword.description}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-6">
            <ThemeContainer chamfer="24" borderColor={accentPrimary}>
              <img
                className="aspect-square max-w-48 shrink clip-6"
                src={weapon.picture.imageUrl}
                alt="Weapon picture"
              />
            </ThemeContainer>
            <div className="flex h-full flex-col items-start justify-between gap-4 sm:gap-8">
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
                      {weapon.stats.magCapacity * (weapon.stats.magCount - 1)}
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
      ) : (
        <div className="relative flex h-full gap-8">
          <ThemeContainer chamfer="24" borderColor={accentPrimary}>
            <img
              className="aspect-square max-w-48 shrink clip-6"
              src={weapon.picture.imageUrl}
              alt="Weapon picture"
            />
          </ThemeContainer>
          <div className="flex h-full grow flex-col items-start justify-between gap-6">
            <div className="flex w-full items-start justify-between gap-8">
              <h2> {weapon.name}</h2>
              <div className="flex items-center justify-end gap-4">
                <ProfitsIcon className="size-6" />
                <p>{weapon.price}p</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {weapon.keywords.map((keyword) => {
                return (
                  <Tag
                    key={keyword.id}
                    label={keyword.name}
                    description={keyword.description}
                  />
                );
              })}
            </div>
            <div className="flex flex-wrap items-center justify-start gap-8">
              {weapon.stats.damage && (
                <div className="flex flex-col items-center gap-1">
                  <p>DMG</p>
                  <div className="flex items-center gap-2">
                    <DamageIcon className="size-8" />
                    <p>{weapon.stats.damage}</p>
                  </div>
                </div>
              )}
              {weapon.stats.salvo && (
                <div className="flex flex-col items-center gap-1">
                  <p>SLV</p>
                  <div className="flex items-center gap-2">
                    <SalvoIcon className="size-8" />
                    <p>{weapon.stats.salvo}</p>
                  </div>
                </div>
              )}
              {weapon.stats.flurry && (
                <div className="flex flex-col items-center gap-1">
                  <p>FLR</p>
                  <div className="flex items-center gap-2">
                    <FlurryIcon className="size-8" />
                    <p>{weapon.stats.flurry}</p>
                  </div>
                </div>
              )}
              {weapon.stats.range && (
                <div className="flex flex-col items-center gap-1">
                  <p>RNG</p>
                  <div className="flex items-center gap-2">
                    <RangeIcon className="size-8" />
                    <p>{weapon.stats.range}</p>
                  </div>
                </div>
              )}
              {weapon.stats.magCapacity && (
                <div className="flex flex-col items-center gap-1">
                  <p>MAG</p>
                  <div className="flex items-center gap-2">
                    <MagCapacityIcon className="size-8" />
                    <p>
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
      )}
      <div
        className={`timing ease-in-out ${!detailsOpen ? 'hidden' : 'flex'} scrollbar-secondary mt-4 flex flex-col gap-2 overflow-y-auto`}
      >
        <strong className="text-primary text-lg tracking-wide">
          Description:
        </strong>
        <p className="text-secondary">{weapon.description}</p>
      </div>
    </div>
  );
};

export default WeaponCard;
