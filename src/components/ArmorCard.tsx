import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useState } from 'react';
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

const ArmorCard = ({ armor }, props) => {
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
            <h2> {armor.name}</h2>
            <div className="flex items-center justify-end gap-4">
              <ProfitsIcon className="size-6" />
              <p>{armor.price}p</p>
            </div>
          </div>
          <div className="flex w-full flex-wrap items-center gap-1 justify-self-start">
            {armor.keywords.map((keyword) => {
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
                src={armor.picture.imageUrl}
                alt="armor picture"
              />
            </ThemeContainer>
            <div className="flex h-full flex-col items-start justify-between gap-4 sm:gap-8">
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
      ) : (
        <div className="relative flex h-full gap-8">
          <ThemeContainer chamfer="24" borderColor={accentPrimary}>
            <img
              className="aspect-square max-w-48 shrink clip-6"
              src={armor.picture.imageUrl}
              alt="armor picture"
            />
          </ThemeContainer>
          <div className="flex h-full grow flex-col items-start justify-between gap-6">
            <div className="flex w-full items-start justify-between gap-8">
              <h2> {armor.name}</h2>
              <div className="flex items-center justify-end gap-4">
                <ProfitsIcon className="size-6" />
                <p>{armor.price}p</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {armor.keywords.map((keyword) => {
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
              {armor.stats.armor && (
                <div className="flex flex-col items-center gap-1">
                  <p>AV</p>
                  <div className="flex items-center gap-2">
                    <ArmorIcon className="size-8" />
                    <p>{armor.stats.armor}</p>
                  </div>
                </div>
              )}
              {armor.stats.ward && (
                <div className="flex flex-col items-center gap-1">
                  <p>WV</p>
                  <div className="flex items-center gap-2">
                    <WardIcon className="size-8" />
                    <p>{armor.stats.ward}</p>
                  </div>
                </div>
              )}
              {armor.stats.block && (
                <div className="flex flex-col items-center gap-1">
                  <p>BP</p>
                  <div className="flex items-center gap-2">
                    <BlockIcon className="size-8" />
                    <p>{armor.stats.block}</p>
                  </div>
                </div>
              )}
              {armor.stats.power && (
                <div className="flex flex-col items-center gap-1">
                  <p>PWR</p>
                  <div className="flex items-center gap-2">
                    <PowerIcon className="size-8" />
                    <p>{armor.stats.power}</p>
                  </div>
                </div>
              )}
              {armor.stats.weight && (
                <div className="flex flex-col items-center gap-1">
                  <p>WGT</p>
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
      )}
      <div
        className={`timing ease-in-out ${!detailsOpen ? 'hidden' : 'flex'} scrollbar-secondary mt-4 flex flex-col gap-2 overflow-y-auto`}
      >
        <strong className="text-primary text-lg tracking-wide">
          Description:
        </strong>
        <p className="text-secondary">{armor.description}</p>
      </div>
    </div>
  );
};

export default ArmorCard;
