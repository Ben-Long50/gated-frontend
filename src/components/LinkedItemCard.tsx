import { Keyword } from 'src/types/keyword';
import Tag from './Tag';
import StatBars from './StatBars';
import ArrowHeader3 from './ArrowHeader3';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import { Link } from 'react-router-dom';
import ItemPicture from './ItemPicture';
import { Item } from 'src/types/item';

const LinkedItemCard = ({
  item,
  mode,
  cardWidth,
}: {
  item: Item;
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
      <Link
        className="hover:bg-secondary timing flex p-4"
        to={`../../item/${item.id}`}
      >
        <div className="my-auto flex max-h-[250px] w-full gap-8">
          {item.picture?.imageUrl && (
            <ItemPicture
              key={item.id}
              className={`timing aspect-square h-[250px]`}
              item={item}
            />
          )}
          <div className="flex grow flex-col items-start justify-start gap-4">
            <ArrowHeader3 title={item?.name} />
            <div className="flex flex-wrap items-center gap-2">
              {item.keywords?.map(
                (item: { keyword: Keyword; value: number | null }) => {
                  return <Tag key={item.keyword?.id} keyword={item} />;
                },
              )}
            </div>
            <div
              className={`${cardWidth < 500 ? 'gap-2 px-2' : 'gap-4 px-4'} scrollbar-primary-2 grid w-full grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2 overflow-y-auto border-x-2 border-gray-400 border-opacity-50`}
            >
              <StatBars stats={item.stats} mode={mode} cardWidth={cardWidth} />
            </div>
          </div>
        </div>
      </Link>
    </ThemeContainer>
  );
};

export default LinkedItemCard;
