import { Keyword } from 'src/types/keyword';
import Tag from './Tag';
import StatBars from './StatBars';
import ArrowHeader3 from './ArrowHeader3';
import ThemeContainer from './ThemeContainer';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import ItemPicture from './ItemPicture';
import { Item } from 'src/types/item';

const SubweaponCard = ({
  vehicleId,
  weapon,
  mode,
  cardWidth,
}: {
  vehicleId?: number;
  weapon: Item;
  quantity?: number;
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
        to={`../../weapons/${weapon.id}`}
      >
        <div className="my-auto flex max-h-[250px] w-full gap-8">
          {weapon.picture?.imageUrl && (
            <ItemPicture
              key={weapon.id}
              className={`timing aspect-square h-[250px]`}
              item={weapon}
            />
          )}
          <div className="flex w-full grow flex-col items-start justify-start gap-4">
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
                (item: { keyword: Keyword; value?: number }) => {
                  return <Tag key={item.keyword?.id} keyword={item} />;
                },
              )}
            </div>
            <div
              className={`${cardWidth < 500 ? 'gap-2 px-2' : 'gap-4 px-4'} scrollbar-primary-2 grid w-full grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2 overflow-y-auto border-x-2 border-gray-400 border-opacity-50`}
            >
              <StatBars
                stats={weapon.stats}
                mode={mode}
                cardWidth={cardWidth}
              />
            </div>
          </div>
        </div>
      </Link>
    </ThemeContainer>
  );
};

export default SubweaponCard;
