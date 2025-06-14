import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import ItemRarity from './ItemRarity';
import CartButton from './CartButton';
import { KeywordReference } from 'src/types/keyword';
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
import ItemRadialMenu from './radialMenus/itemRadialMenu/ItemRadialMenu';
import {
  Link,
  Outlet,
  useLocation,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiLinkBoxVariantOutline } from '@mdi/js';
import { useInView } from 'react-intersection-observer';
import KeywordTag from './KeywordTag';
import ConditionTag from './ConditionTag';
import useRadialMenuStore from 'src/stores/radialMenuStore';

const ItemCard = ({
  item,
  mode,
  cardType,
  toggleFormLink,
  ownerId,
}: {
  item: Item;
  mode?: string;
  cardType?: 'small' | 'large';
  toggleFormLink?: (item: Item) => void;
  ownerId?: number;
}) => {
  const { conditionId, traitId } = useParams();
  const { user } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const location = useLocation();
  const parts = location.pathname.split('/');
  const [cardWidth, setCardWidth] = useState(0);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { character } = useOutletContext() || {};

  const containerRef = useRef(null);
  const cardRef = useRef(null);

  const menuOpen = useRadialMenuStore((state) => state.menuOpen);
  const setMenuOpen = useRadialMenuStore((state) => state.setMenuOpen);
  const setMenu = useRadialMenuStore((state) => state.setMenu);
  const setCoordinates = useRadialMenuStore((state) => state.setCoordinates);

  const handleMenu = (e: MouseEvent) => {
    if (!containerRef.current) return;
    setMenu('item', 'large', item.id);

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!menuOpen) {
      setCoordinates(x, y);
    }
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth);
    }
  }, [cardType, inView]);

  const { itemStats } = useItemStats(item);

  const keywordList = [...item?.keywords, ...item?.modifiedKeywords].sort(
    (a, b) => a.keyword.name.localeCompare(b.keyword.name),
  );

  const linkedWeapons =
    item.itemLinkReference?.items.filter((item: Item) =>
      item.itemTypes.includes('weapon'),
    ) || [];
  const linkedArmors =
    item.itemLinkReference?.items.filter((item: Item) =>
      item.itemTypes.includes('armor'),
    ) || [];
  const linkedVehicles =
    item.itemLinkReference?.items.filter((item: Item) =>
      item.itemTypes.includes('vehicle'),
    ) || [];
  const uniqueActions = item.itemLinkReference?.actions || [];

  return (
    <div ref={ref}>
      {inView && (
        <ThemeContainer
          chamfer="medium"
          className="w-full"
          borderColor={accentPrimary}
        >
          <div
            ref={containerRef}
            className={`timing relative flex w-full cursor-pointer flex-col gap-8 p-4`}
            onClick={(e) => {
              e.stopPropagation();
              handleMenu(e);
            }}
          >
            {mode !== 'form' && (
              <ItemRadialMenu item={item} containerRef={containerRef} />
            )}
            <div
              className={`${cardType === 'small' ? 'flex-col' : 'max-h-[300px] flex-row'} my-auto flex w-full gap-8`}
              onClick={
                mode === 'form' && toggleFormLink
                  ? () => {
                      toggleFormLink(item);
                    }
                  : undefined
              }
            >
              {cardType === 'large' && item.picture?.publicId && (
                <ItemPicture
                  key={item.id}
                  className={`timing aspect-square h-[300px]`}
                  item={item}
                />
              )}
              <div className="flex w-full flex-col gap-4">
                <div className="flex w-full items-start justify-between gap-4">
                  <div className="flex w-full items-center gap-4">
                    <div className="flex items-center justify-between gap-4">
                      <ArrowHeader2 title={item?.name} />
                      {item.baseItemId && (
                        <Link
                          className="timing group ml-auto flex items-center gap-4 py-2"
                          to={`/glam/codex/${item.itemTypes[0]}s/${item.baseItemId}`}
                        >
                          <Icon
                            path={mdiLinkBoxVariantOutline}
                            className="group-hover:text-accent timing text-tertiary size-8 shrink-0"
                          />
                        </Link>
                      )}
                    </div>
                    <div className="flex grow flex-wrap items-center justify-start gap-1">
                      {item.conditions?.map((condition) => (
                        <Fragment key={condition.id}>
                          <ConditionTag
                            key={condition.id}
                            condition={condition}
                          />
                          {Number(conditionId) === condition.id && (
                            <Outlet context={{ condition }} />
                          )}
                        </Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="flex grow items-start justify-end gap-4">
                    <p>{item?.price ? item.price + 'p' : 'N/A'}</p>
                    {parts.includes('shop') && (
                      <CartButton character={character} itemId={item?.id} />
                    )}
                  </div>
                </div>
                {cardType === 'small' && item.picture?.imageUrl && (
                  <ItemPicture
                    key={item.id}
                    className={`timing aspect-square h-[300px]`}
                    item={item}
                  />
                )}
                <div
                  className={`timing flex items-center justify-between gap-x-8 gap-y-2`}
                >
                  {keywordList.length > 0 && (
                    <div className={`flex flex-wrap items-center gap-1`}>
                      {keywordList.map((keyword: KeywordReference) => {
                        return (
                          <Fragment key={keyword.id}>
                            <KeywordTag key={keyword.id} keyword={keyword} />
                            {Number(traitId) === keyword.id && (
                              <Outlet context={{ keyword }} />
                            )}
                          </Fragment>
                        );
                      })}
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
                    className={`${cardWidth < 500 ? 'max-h-[200px] gap-2 px-2' : 'gap-4 px-4'} scrollbar-primary-2 grid w-full grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2 overflow-y-auto border-x-2 border-gray-400 border-opacity-50`}
                  >
                    <StatBars
                      cardWidth={cardWidth}
                      stats={itemStats}
                      mode={mode}
                    />
                    {linkedWeapons.length > 0 && (
                      <>
                        <h4 className="col-span-3 justify-self-start">
                          Integrated Weapons
                        </h4>
                        <p className="min-w-6 text-center">
                          {linkedWeapons.length}
                        </p>
                      </>
                    )}
                    {linkedArmors.length > 0 && (
                      <>
                        <h4 className="col-span-3 justify-self-start">
                          Integrated Armors
                        </h4>
                        <p className="min-w-6 text-center">
                          {linkedArmors.length}
                        </p>
                      </>
                    )}
                    {linkedVehicles.length > 0 && (
                      <>
                        <h4 className="col-span-3 justify-self-start">
                          Supplied Vehicles
                        </h4>
                        <p className="min-w-6 text-center">
                          {linkedVehicles.length}
                        </p>
                      </>
                    )}
                    {uniqueActions.length > 0 && (
                      <>
                        <h4 className="col-span-3 justify-self-start">
                          Unique Actions
                        </h4>
                        <p className="min-w-6 text-center">
                          {uniqueActions.length}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            {(mode === 'equipment' || mode === 'deployments') && (
              <div className="z-10">
                {ownerId === user?.id &&
                  (item.itemTypes.includes('weapon') ? (
                    <WeaponControls weaponId={item.id} stats={itemStats} />
                  ) : item.itemTypes.includes('armor') ? (
                    <ArmorControls armorId={item.id} stats={itemStats} />
                  ) : item.itemTypes.includes('augmentation') ? (
                    <CyberneticControls
                      cyberneticId={item.id}
                      stats={itemStats}
                    />
                  ) : item.itemTypes.includes('vehicle') ? (
                    <VehicleControls vehicleId={item.id} stats={itemStats} />
                  ) : item.itemTypes.includes('drone') ? (
                    <DroneControls droneId={item.id} stats={itemStats} />
                  ) : (
                    item.itemTypes.includes('reusable') && (
                      <ItemControls itemId={item.id} stats={itemStats} />
                    )
                  ))}
              </div>
            )}
          </div>
        </ThemeContainer>
      )}
    </div>
  );
};

export default ItemCard;
