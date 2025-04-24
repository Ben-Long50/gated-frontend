import { Keyword } from 'src/types/keyword';
import Tag from './Tag';
import { WeaponWithKeywords } from 'src/types/weapon';
import { WeaponStatBars } from './WeaponCard';

const SubweaponCard = ({
  vehicleId,
  weapon,
  toolTip,
  setToolTip,
  mode,
}: {
  vehicleId?: number;
  weapon: WeaponWithKeywords;
  quantity?: number;
  toolTip: number;
  setToolTip: (prevState: number) => void;
  mode?: string;
}) => {
  return (
    <div className="flex h-full w-full grow flex-col items-start justify-between gap-4">
      <div className="flex items-center gap-4">
        <h3>{weapon?.name}</h3>
        <p className="text-error italic">
          {weapon?.vehicleId &&
            weapon.vehicleId !== vehicleId &&
            '(Currently equpped on another vehicle)'}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {weapon.keywords?.map((item: { keyword: Keyword; value?: number }) => {
          return (
            <Tag
              key={item.keyword?.id}
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
        })}
      </div>
      <div className="timing col-span-2 grid h-full w-full grid-cols-[auto_auto_1fr_auto] place-items-center gap-4 gap-y-2 border-x-2 border-gray-400 border-opacity-50 px-4">
        <WeaponStatBars stats={weapon.stats} mode={mode} />
      </div>
    </div>
  );
};

export default SubweaponCard;
