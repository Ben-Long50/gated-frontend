import { Keyword } from 'src/types/keyword';
import Tag from './Tag';
import ArmorIcon from './icons/ArmorIcon';
import WardIcon from './icons/WardIcon';
import BlockIcon from './icons/BlockIcon';
import StatCard from './StatCard';
import { ArmorWithKeywords } from 'src/types/armor';
import { ArmorStatBars } from './ArmorCard';

const SubarmorCard = ({
  armor,
  toolTip,
  setToolTip,
  mode,
}: {
  armor: ArmorWithKeywords;
  toolTip: number;
  setToolTip: (prevState: number) => void;
  mode?: string;
}) => {
  return (
    <div className="flex h-full grow flex-col items-start justify-between gap-4">
      <h3> {armor.name}</h3>
      <div className="flex flex-wrap items-center gap-2">
        {armor.keywords?.map((item: { keyword: Keyword; value?: number }) => {
          return (
            <Tag
              key={item.keyword.id}
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
      <div className="timing grid h-full w-full grid-cols-[auto_auto_1fr_auto] place-items-center gap-4 gap-y-2">
        <ArmorStatBars stats={armor.stats} mode={mode} />
      </div>
    </div>
  );
};

export default SubarmorCard;
