import { Keyword } from 'src/types/keyword';
import Tag from './Tag';
import DamageIcon from './icons/DamageIcon';
import SalvoIcon from './icons/SalvoIcon';
import FlurryIcon from './icons/FlurryIcon';
import RangeIcon from './icons/RangeIcon';
import MagCapacityIcon from './icons/MagCapacityIcon';
import { LayoutContext } from '../contexts/LayoutContext';
import { useContext } from 'react';
import { WeaponWithKeywords } from 'src/types/weapon';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

const SubweaponCard = ({
  weapon,
  quantity,
  toolTip,
  setToolTip,
}: {
  weapon: WeaponWithKeywords;
  quantity: number;
  toolTip: string;
  setToolTip: void;
}) => {
  const { layoutSize } = useContext(LayoutContext);

  return (
    <div className="flex h-full grow flex-col items-start justify-between gap-4">
      {quantity ? (
        <h3>{weapon.name + ' x ' + quantity}</h3>
      ) : (
        <h3>{weapon.name}</h3>
      )}

      <div className="flex items-center gap-2">
        {weapon.keywords?.map((item: { keyword: Keyword; value?: number }) => {
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
        })}
      </div>
      <div className="flex flex-wrap items-center justify-start gap-8 gap-y-4">
        {weapon.stats.damage && (
          <div className="flex flex-col items-center gap-1">
            {layoutSize !== 'small' && layoutSize !== 'xsmall' && <p>DMG</p>}
            <div className="flex items-center gap-2">
              <DamageIcon className="size-8" />
              <p className="sm:pt-1">{weapon.stats.damage}</p>
            </div>
          </div>
        )}
        {weapon.stats.salvo && (
          <div className="flex flex-col items-center gap-1">
            {layoutSize !== 'small' && layoutSize !== 'xsmall' && <p>SLV</p>}
            <div className="flex items-center gap-2">
              <SalvoIcon className="size-8" />
              <p className="sm:pt-1">{weapon.stats.salvo}</p>
            </div>
          </div>
        )}
        {weapon.stats.flurry && (
          <div className="flex flex-col items-center gap-1">
            {layoutSize !== 'small' && layoutSize !== 'xsmall' && <p>FLR</p>}
            <div className="flex items-center gap-2">
              <FlurryIcon className="size-8" />
              <p className="sm:pt-1">{weapon.stats.flurry}</p>
            </div>
          </div>
        )}
        {weapon.stats.range && (
          <div className="flex flex-col items-center gap-1">
            {layoutSize !== 'small' && layoutSize !== 'xsmall' && <p>RNG</p>}
            <div className="flex items-center gap-2">
              <RangeIcon className="size-8" />
              <p className="sm:pt-1">{weapon.stats.range}</p>
            </div>
          </div>
        )}
        {weapon.stats.magCapacity && (
          <div className="flex flex-col items-center gap-1">
            {layoutSize !== 'small' && layoutSize !== 'xsmall' && <p>MAG</p>}
            <div className="flex items-center gap-2">
              <MagCapacityIcon className="size-8" />
              {weapon.stats.magCount ? (
                <p className="sm:pt-1">
                  {weapon.stats.magCapacity}/
                  {weapon.stats.magCapacity * (weapon.stats.magCount - 1)}
                </p>
              ) : (
                <p className="sm:pt-1">{weapon.stats.magCapacity}/X</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubweaponCard;
