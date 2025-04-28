import { Keyword } from 'src/types/keyword';
import Tag from './Tag';
import { ArmorWithKeywords } from 'src/types/armor';
import StatBars from './StatBars';
import ArrowHeader3 from './ArrowHeader3';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import { Link } from 'react-router-dom';

const SubarmorCard = ({
  armor,
  toolTip,
  setToolTip,
  mode,
  cardWidth,
}: {
  armor: ArmorWithKeywords;
  toolTip: number;
  setToolTip: (prevState: number) => void;
  mode?: string;
  cardWidth: number;
}) => {
  const { accentPrimary } = useContext(ThemeContext);

  return (
    <ThemeContainer
      borderColor={accentPrimary}
      chamfer="medium"
      overflowHidden={true}
    >
      <Link to={`armor/${armor.id}`}>
        <div className="timing hover:bg-secondary flex h-full grow flex-col items-start justify-between gap-4 p-4">
          <ArrowHeader3 title={armor?.name} />
          <div className="flex flex-wrap items-center gap-2">
            {armor.keywords?.map(
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
            <StatBars stats={armor.stats} mode={mode} cardWidth={cardWidth} />
          </div>
        </div>
      </Link>
    </ThemeContainer>
  );
};

export default SubarmorCard;
