import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import { Link } from 'react-router-dom';
import ItemRarity from './ItemRarity';
import CartButton from './CartButton';
import { Keyword } from 'src/types/keyword';
import Tag from './Tag';
import { Item } from 'src/types/item';
import ItemPicture from './ItemPicture';
import ArrowHeader2 from './ArrowHeader2';
import StatBars from './StatBars';
import {
  ArmorControls,
  CyberneticControls,
  DroneControls,
  ItemControls,
  VehicleControls,
  WeaponControls,
} from './ItemCardControls';
import { AuthContext } from 'src/contexts/AuthContext';

const ItemCard = ({
  item,
  mode,
  toggleFormLink,
  ownerId,
}: {
  item: Item;
  mode?: string;
  toggleFormLink?: (item: Item) => void;
  ownerId?: number;
}) => {
  const { user } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [cardWidth, setCardWidth] = useState(0);
  const [hover, setHover] = useState(false);

  useLayoutEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth);
    }
  }, []);

  const cardRef = useRef(null);

  const linkedWeapons =
    item.itemLinkReference?.items.filter(
      (item: Item) => item.itemType === 'weapon',
    ) || [];
  const linkedArmors =
    item.itemLinkReference?.items.filter(
      (item: Item) => item.itemType === 'armor',
    ) || [];
  const uniqueActions = item.itemLinkReference?.actions || [];

  return (
    <ThemeContainer
      chamfer="medium"
      className="mb-auto w-full"
      borderColor={accentPrimary}
      overflowHidden={true}
    >
      <Link
        to={
          mode === 'form'
            ? ''
            : mode === 'equipment' ||
                mode === 'deployments' ||
                mode === 'search'
              ? `${item?.itemType}s/${item?.id}`
              : `${item?.id}`
        }
        state={mode}
        className={`${hover && 'bg-secondary'} timing relative flex w-full flex-col gap-8 p-4`}
      >
        <div
          className="my-auto flex max-h-[300px] w-full gap-8"
          onClick={
            mode === 'form' && toggleFormLink
              ? () => {
                  toggleFormLink(item);
                }
              : undefined
          }
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {item.picture?.imageUrl && (
            <ItemPicture
              key={item.id}
              className={`timing aspect-square h-[300px]`}
              item={item}
            />
          )}
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full items-start justify-between">
              <div className="flex items-center gap-4">
                <ArrowHeader2 title={item.name} />
              </div>
              <div className="flex items-start gap-4">
                <p>{item?.price ? item.price + 'p' : 'N/A'}</p>
                {mode === 'codex' && <CartButton itemId={item?.id} />}
              </div>
            </div>
            <div
              className={`timing flex items-center justify-between gap-x-8 gap-y-2`}
            >
              {item.keywords && (
                <div className={`flex flex-wrap items-center gap-1`}>
                  {item?.keywords &&
                    item.keywords.length > 0 &&
                    item.keywords?.map(
                      (item: { keyword: Keyword; value: number | null }) => {
                        return <Tag key={item.keyword?.id} keyword={item} />;
                      },
                    )}
                </div>
              )}
              <ItemRarity
                className="ml-auto"
                rarity={item?.rarity}
                grade={item?.grade}
                cardWidth={cardWidth}
              />
            </div>
            {item.stats && (
              <div
                ref={cardRef}
                className={`${cardWidth < 500 ? 'gap-2 px-2' : 'gap-4 px-4'} scrollbar-primary-2 grid w-full grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2 overflow-y-auto border-x-2 border-gray-400 border-opacity-50`}
              >
                <StatBars
                  cardWidth={cardWidth}
                  stats={item.stats}
                  mode={mode}
                />
                {linkedWeapons.length > 0 && (
                  <>
                    <h4 className="col-span-3 justify-self-start">
                      Integrated Weapons
                    </h4>
                    <p>{linkedWeapons.length}</p>
                  </>
                )}
                {linkedArmors.length > 0 && (
                  <>
                    <h4 className="col-span-3 justify-self-start">
                      Integrated Armors
                    </h4>
                    <p>{linkedArmors.length}</p>
                  </>
                )}
                {uniqueActions.length > 0 && (
                  <>
                    <h4 className="col-span-3 justify-self-start">
                      Unique Actions
                    </h4>
                    <p>{uniqueActions.length}</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        {(mode === 'equipment' || mode === 'deployments') &&
          ownerId === user?.id &&
          (item.itemType === 'weapon' ? (
            <WeaponControls weaponId={item.id} stats={item.stats} />
          ) : item.itemType === 'armor' ? (
            <ArmorControls armorId={item.id} stats={item.stats} />
          ) : item.itemType === 'cybernetic' ? (
            <CyberneticControls cyberneticId={item.id} stats={item.stats} />
          ) : item.itemType === 'vehicle' ? (
            <VehicleControls vehicleId={item.id} stats={item.stats} />
          ) : item.itemType === 'drone' ? (
            <DroneControls droneId={item.id} stats={item.stats} />
          ) : (
            item.itemType === 'reusable' && (
              <ItemControls itemId={item.id} stats={item.stats} />
            )
          ))}
      </Link>
    </ThemeContainer>
  );
};

export default ItemCard;
