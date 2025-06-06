import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
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
import useItemStats from 'src/hooks/useItemStats';
import ItemRadialMenu from './ItemRadialMenu';

const ItemCardMobile = ({
  item,
  mode,
  toggleFormLink,
  ownerId,
}: {
  item: Item;
  mode: string;
  toggleFormLink?: (item: Item) => void;
  ownerId?: number;
}) => {
  const { user } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [toolTip, setToolTip] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  useLayoutEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (toolTip) {
      document.addEventListener('click', () => setToolTip(0));
    } else {
      document.removeEventListener('click', () => setToolTip(0));
    }

    return () => {
      document.removeEventListener('click', () => setToolTip(0));
    };
  }, [toolTip]);

  const cardRef = useRef(null);

  const { itemStats } = useItemStats(item);

  const linkedWeapons =
    item.itemLinkReference?.items.filter((item: Item) =>
      item.itemTypes.includes('weapon'),
    ) || [];
  const linkedArmors =
    item.itemLinkReference?.items.filter((item: Item) =>
      item.itemTypes.includes('armor'),
    ) || [];
  const uniqueActions = item.itemLinkReference?.actions || [];

  return (
    <div ref={cardRef} className="w-full">
      <ThemeContainer
        chamfer="medium"
        className="w-full"
        borderColor={accentPrimary}
      >
        <Link
          to={
            mode === 'form'
              ? ''
              : mode === 'equipment' || mode === 'deployments'
                ? `${item.itemTypes[0]}s/${item?.id}`
                : `${item?.id}`
          }
          className="timing relative flex cursor-pointer flex-col gap-8"
        >
          <div
            className="timing relative flex cursor-pointer flex-col gap-4 p-4"
            onClick={
              mode === 'form' && toggleFormLink
                ? () => {
                    toggleFormLink(item);
                  }
                : undefined
            }
          >
            <div className="flex items-start justify-between gap-4">
              <ArrowHeader2 title={item.name} />
              <div className="mr-10 flex flex-wrap items-start justify-end gap-4 gap-y-2">
                <p>{item?.price ? item.price + 'p' : 'N/A'}</p>
                {mode === 'codex' && <CartButton itemId={item?.id} />}
              </div>
              <ItemRadialMenu className="right-0 top-0" item={item} />
            </div>
            <div className="flex grow flex-wrap items-center justify-start gap-1">
              {item.conditions?.map((condition) => (
                <Tag
                  key={condition.id}
                  condition={{
                    condition: condition.condition,
                    stacks: condition.stacks,
                  }}
                />
              ))}
            </div>
            <div className="flex w-full items-center justify-between">
              {item?.keywords && item.keywords.length > 0 && (
                <div className="col-span-2 flex w-full flex-wrap items-center gap-1 justify-self-start">
                  {item.keywords.map(
                    (item: { keyword: Keyword; value: number | null }) => {
                      return <Tag key={item.keyword?.id} keyword={item} />;
                    },
                  )}
                </div>
              )}
              <ItemRarity
                className="justify-self-end"
                rarity={item?.rarity}
                grade={item?.grade}
                cardWidth={cardWidth}
              />
            </div>
            {item.picture && (
              <ItemPicture className={`timing mx-8 shrink-0`} item={item} />
            )}
            <div className="flex w-full flex-col items-center gap-4 pr-1">
              <div
                className={`${cardWidth && cardWidth < 500 ? 'gap-2 px-2' : 'gap-4 px-4'} grid h-full w-full grow grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2 border-x-2 border-gray-400 border-opacity-50`}
              >
                <StatBars cardWidth={cardWidth} stats={itemStats} mode={mode} />
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
            </div>
            {(mode === 'equipment' || mode === 'deployments') &&
              ownerId === user?.id &&
              (item.itemTypes.includes('weapon') ? (
                <WeaponControls weaponId={item.id} stats={item.stats} />
              ) : item.itemTypes.includes('armor') ? (
                <ArmorControls armorId={item.id} stats={item.stats} />
              ) : item.itemTypes.includes('augmentation') ? (
                <CyberneticControls cyberneticId={item.id} stats={item.stats} />
              ) : item.itemTypes.includes('vehicle') ? (
                <VehicleControls vehicleId={item.id} stats={item.stats} />
              ) : item.itemTypes.includes('drone') ? (
                <DroneControls droneId={item.id} stats={item.stats} />
              ) : (
                item.itemTypes.includes('reusable') && (
                  <ItemControls itemId={item.id} stats={item.stats} />
                )
              ))}
          </div>
        </Link>
      </ThemeContainer>
    </div>
  );
};

export default ItemCardMobile;
