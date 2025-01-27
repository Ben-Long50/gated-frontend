import { Keyword } from 'src/types/keyword';
import Tag from './Tag';
import { LayoutContext } from '../contexts/LayoutContext';
import { useContext } from 'react';
import ArmorIcon from './icons/ArmorIcon';
import WardIcon from './icons/WardIcon';
import BlockIcon from './icons/BlockIcon';

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
      <div className="flex flex-wrap items-center justify-start gap-8">
        {armor.stats.armor && (
          <div className="flex flex-col items-center gap-1">
            {layoutSize !== 'small' && layoutSize !== 'xsmall' && <p>AV</p>}
            <div className="flex items-center gap-2">
              <ArmorIcon className="size-8" />
              <p className="sm:pt-1">{armor.stats.armor}</p>
            </div>
          </div>
        )}
        {armor.stats.ward && (
          <div className="flex flex-col items-center gap-1">
            {layoutSize !== 'small' && layoutSize !== 'xsmall' && <p>WV</p>}
            <div className="flex items-center gap-2">
              <WardIcon className="size-8" />
              <p className="sm:pt-1">{armor.stats.ward}</p>
            </div>
          </div>
        )}
        {armor.stats.block && (
          <div className="flex flex-col items-center gap-1">
            {layoutSize !== 'small' && layoutSize !== 'xsmall' && <p>BP</p>}
            <div className="flex items-center gap-2">
              <BlockIcon className="size-8" />
              <p className="sm:pt-1">{armor.stats.block}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubarmorCard;
