import { Keyword } from 'src/types/keyword';
import Tag from './Tag';
import { LayoutContext } from '../contexts/LayoutContext';
import { useContext } from 'react';
import ArmorIcon from './icons/ArmorIcon';
import WardIcon from './icons/WardIcon';
import BlockIcon from './icons/BlockIcon';
import StatCard from './StatCard';

const SubarmorCard = ({ armor, toolTip, setToolTip }) => {
  const { layoutSize } = useContext(LayoutContext);

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
      <div className="timing col-span-2 grid h-full w-full grid-cols-[repeat(auto-fill,minmax(100px,max-content))] place-items-center gap-4">
        {armor.stats.armor && (
          <StatCard label="AV" stat={armor.stats.armor}>
            <ArmorIcon className="size-8" />
          </StatCard>
        )}
        {armor.stats.ward && (
          <StatCard label="WV" stat={armor.stats.ward}>
            <WardIcon className="size-8" />
          </StatCard>
        )}
        {armor.stats.block && (
          <StatCard label="BP" stat={armor.stats.block}>
            <BlockIcon className="size-8" />
          </StatCard>
        )}
      </div>
    </div>
  );
};

export default SubarmorCard;
