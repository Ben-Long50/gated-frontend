import { Keyword } from 'src/types/keyword';
import Tag from './Tag';
import { WeaponWithKeywords } from 'src/types/weapon';
import StatBars from './StatBars';
import ArrowHeader3 from './ArrowHeader3';
import ThemeContainer from './ThemeContainer';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const SubweaponCard = ({
  vehicleId,
  weapon,
  toolTip,
  setToolTip,
  mode,
  cardWidth,
}: {
  vehicleId?: number;
  weapon: WeaponWithKeywords;
  quantity?: number;
  toolTip: number;
  setToolTip: (prevState: number) => void;
  mode?: string;
  cardWidth: number;
}) => {
  const { accentPrimary } = useContext(ThemeContext);

  return (
    <ThemeContainer borderColor={accentPrimary} chamfer="medium">
      <div className="flex h-full w-full grow flex-col items-start justify-between gap-4 p-4">
        <div className="flex items-center gap-4">
          <ArrowHeader3 title={weapon?.name} />
          <p className="text-error italic">
            {weapon?.vehicleId &&
              weapon.vehicleId !== vehicleId &&
              '(Currently equpped on another vehicle)'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {weapon.keywords?.map(
            (item: { keyword: Keyword; value?: number }, index: number) => {
              return (
                <Tag
                  key={index}
                  label={
                    item.value
                      ? item.keyword?.name + ' ' + item.value
                      : item.keyword?.name
                  }
                  description={item.keyword?.description}
                  toolTip={toolTip}
                  setToolTip={setToolTip}
                />
              );
            },
          )}
        </div>
        <div
          className={`${cardWidth < 500 ? 'gap-2 px-2' : 'gap-4 px-4'} grid h-full w-full grow grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2 border-x-2 border-gray-400 border-opacity-50`}
        >
          <StatBars stats={weapon.stats} mode={mode} cardWidth={cardWidth} />
        </div>
      </div>
    </ThemeContainer>
  );
};

export default SubweaponCard;
