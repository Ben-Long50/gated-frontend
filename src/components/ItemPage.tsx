import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ItemRarity from './ItemRarity';
import CartButton from './CartButton';
import Icon from '@mdi/react';
import {
  mdiCalendarCheckOutline,
  mdiCalendarRemoveOutline,
  mdiCollapseAllOutline,
  mdiExpandAllOutline,
  mdiLinkBoxVariantOutline,
} from '@mdi/js';
import { Action } from 'src/types/action';
import BtnRect from './buttons/BtnRect';
import ItemPicture from './ItemPicture';
import Divider from './Divider';
import Loading from './Loading';
import StatBars from './StatBars';
import ArrowHeader3 from './ArrowHeader3';
import ArrowHeader2 from './ArrowHeader2';
import useItemQuery from '../hooks/useItemQuery/useItemQuery';
import ItemCardSmall from './ItemCardSmall';
import { Keyword } from 'src/types/keyword';
import { Item } from 'src/types/item';
import useItemStats from 'src/hooks/useItemStats';
import LinkedItemCard from './LinkedItemCard';
import LinkedActionCard from './LinkedActionCard';
import ItemRadialMenu from './ItemRadialMenu';
import Tag from './Tag';
import useModalStore from 'src/stores/modalStore';

const ItemPage = ({
  itemId,
  mode,
  category,
}: {
  itemId: number;
  mode?: string;
  category: string;
}) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cardWidth, setCardWidth] = useState(0);
  const [traitsExpanded, setTraitsExpanded] = useState(false);

  const location = useLocation();
  const parts = location.pathname.split('/');

  const cardRef = useRef(null);

  const setBackgroundPath = useModalStore((state) => state.setBackgroundPath);

  const { data: item, isLoading } = useItemQuery(Number(itemId));

  const { itemStats, itemKeywords, powerLevel } = useItemStats(item);

  const linkedWeapons =
    item?.itemLinkReference?.items.filter((item) =>
      item.itemTypes.includes('weapon'),
    ) || [];

  const linkedArmor =
    item?.itemLinkReference?.items.filter((item) =>
      item.itemTypes.includes('armor'),
    ) || [];

  const linkedVehicles =
    item?.itemLinkReference?.items.filter((item) =>
      item.itemTypes.includes('vehicle'),
    ) || [];

  const linkedModifiactions =
    item?.itemLinkReference?.items.filter((item) =>
      item.itemTypes.includes('modification'),
    ) || [];

  const linkedActions = item?.itemLinkReference?.actions || [];

  useLayoutEffect(() => {
    if (!isLoading && cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth);
    }
  }, [isLoading]);

  if (isLoading) return <Loading />;

  if (!item) return <h1>No item found</h1>;

  return (
    <div className="flex w-full max-w-6xl flex-col items-center gap-8">
      <div className="relative grid w-full grid-cols-[1fr_auto_1fr]">
        <ItemRadialMenu className="relative size-8" item={item} />
        <h1 className="col-start-2 text-center">{item.name}</h1>
        {mode === 'codex' && (
          <div className="col-start-3 flex items-center justify-end gap-4 self-end">
            <CartButton category={category} itemId={item?.id} />
          </div>
        )}
      </div>
      <div className="relative grid h-full w-full grid-rows-2 gap-8 sm:grid-cols-2 sm:grid-rows-1">
        {item.picture?.imageUrl && (
          <ItemPicture key={item.id} className={`timing w-full`} item={item} />
        )}
        <div className="flex w-full flex-col gap-4">
          {item.conditions.length > 0 && (
            <div className="flex flex-wrap items-center justify-start gap-1">
              {item.conditions?.map((condition) => (
                <Tag key={condition.id} condition={condition} />
              ))}
            </div>
          )}
          <div className="flex items-center justify-between">
            <ItemRarity
              className="col-span-2 place-self-start"
              rarity={item?.rarity}
              grade={item?.grade}
              cardWidth={cardWidth}
            />
            <h4>Cost {item.price ? <span>{`${item.price}p`}</span> : 'N/A'}</h4>
          </div>

          <div className="flex items-center justify-between">
            <ArrowHeader3 title="Power Level" />
            <h3>{powerLevel}</h3>
          </div>
          {item.keywords?.length > 0 && (
            <div
              className={` ${mode !== 'codex' && 'col-span-2'} col-start-1 row-start-2 flex flex-wrap items-center gap-1`}
            >
              <ArrowHeader3 title="Traits" />
              <button
                aria-label="Expand all traits"
                className="bg-tertiary group ml-auto size-10 rounded p-2 shadow-md shadow-black"
                onClick={() => setTraitsExpanded((prev) => !prev)}
              >
                {traitsExpanded ? (
                  <Icon
                    path={mdiCollapseAllOutline}
                    className="text-secondary timing group-hover:text-yellow-300"
                  />
                ) : (
                  <Icon
                    path={mdiExpandAllOutline}
                    className="text-secondary timing group-hover:text-yellow-300"
                  />
                )}
              </button>
              <Divider />
              <div className="flex flex-col gap-4">
                {itemKeywords &&
                  itemKeywords.length > 0 &&
                  itemKeywords?.map(
                    (item: { keyword: Keyword; value: number | null }) => {
                      return (
                        <ItemCardSmall
                          key={item.keyword?.id}
                          expanded={traitsExpanded}
                          heading={
                            <h4>
                              {item.value
                                ? item.keyword?.name.replace(
                                    /X/g,
                                    item.value.toString(),
                                  )
                                : item.keyword?.name}
                            </h4>
                          }
                        >
                          <p>
                            {item.value
                              ? item.keyword?.description.replace(
                                  /X/g,
                                  item.value.toString(),
                                )
                              : item.keyword?.description}
                          </p>
                        </ItemCardSmall>
                      );
                    },
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
      {itemStats && (
        <div
          ref={cardRef}
          className={`${cardWidth < 500 ? 'gap-2 px-2' : 'gap-8 px-4'} grid h-full w-full grow grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2 border-x-2 border-gray-400 border-opacity-50`}
        >
          <StatBars stats={itemStats} cardWidth={cardWidth} />
        </div>
      )}
      <p className="self-start">{item.description}</p>
      {linkedWeapons.length > 0 && (
        <>
          <Divider />
          <ArrowHeader2 className="self-start" title="Integrated Weapons" />
          <div className="flex w-full flex-col gap-8">
            {linkedWeapons.map((weapon: Item, index: number) => {
              return (
                <LinkedItemCard
                  key={index}
                  mode={mode}
                  item={weapon}
                  cardWidth={cardRef.current?.offsetWidth}
                />
              );
            })}
          </div>
        </>
      )}
      {linkedArmor.length > 0 && (
        <>
          <Divider />
          <ArrowHeader2 className="self-start" title="Integrated Armor" />
          <div className="flex w-full flex-col gap-8">
            {linkedArmor.map((armor: Item, index: number) => {
              return (
                <LinkedItemCard
                  key={index}
                  mode={mode}
                  item={armor}
                  cardWidth={cardRef.current?.offsetWidth}
                />
              );
            })}
          </div>
        </>
      )}
      {linkedVehicles.length > 0 && (
        <>
          <Divider />
          <ArrowHeader2 className="self-start" title="Supplied Vehicles" />
          <div className="flex w-full flex-col gap-8">
            {linkedVehicles.map((vehicle: Item, index: number) => {
              return (
                <LinkedItemCard
                  key={index}
                  mode={mode}
                  item={vehicle}
                  cardWidth={cardRef.current?.offsetWidth}
                />
              );
            })}
          </div>
        </>
      )}
      {linkedActions.length > 0 && (
        <>
          <Divider />
          <ArrowHeader2 className="self-start" title="Unique Actions" />
          <div className="flex w-full flex-col gap-8">
            {linkedActions.map((action: Action, index: number) => {
              return (
                <LinkedActionCard
                  key={index}
                  action={action}
                  cardWidth={cardRef.current?.offsetWidth}
                />
              );
            })}
          </div>
        </>
      )}
      {linkedModifiactions.length > 0 && (
        <ThemeContainer chamfer="small" borderColor={accentPrimary}>
          <p className="text-accent absolute -top-3 left-5 z-20 text-base">
            Modifications
          </p>
          <div className="flex flex-col gap-4 p-4">
            {linkedModifiactions.map((modification: Item, index: number) => {
              return (
                <>
                  <LinkedItemCard
                    key={modification.id}
                    item={modification}
                    cardWidth={cardRef.current?.offsetWidth}
                  />
                  {index < linkedModifiactions.length - 1 && (
                    <hr className="w-full border-yellow-300 border-opacity-50" />
                  )}
                </>
              );
            })}
          </div>
        </ThemeContainer>
      )}
      {item.baseItem && (
        <div className="flex w-full items-center justify-between">
          <Link
            className="timing group flex items-center gap-4 self-start py-2"
            to={`/glam/codex/${category}/${item.baseItem.id}`}
          >
            <Icon
              path={mdiLinkBoxVariantOutline}
              className="group-hover:text-accent timing text-secondary size-8 shrink-0"
            />
            <div className="overflow-hidden">
              <p
                className={`timing group-hover:text-accent inline-block origin-left -translate-x-full transform text-left ease-in-out group-hover:translate-x-0`}
              >
                {item.baseItem.name}
              </p>
            </div>
          </Link>
          <button
            className="group flex items-center gap-4 py-2"
            onClick={() => {
              if (item.baseItem && item.updatedAt < item.baseItem.updatedAt) {
                navigate('update');
              }
            }}
          >
            {item.updatedAt < item.baseItem.updatedAt ? (
              <>
                <div className="overflow-hidden">
                  <p
                    className={`timing group-hover:text-accent inline-block origin-right translate-x-full transform text-right ease-in-out group-hover:translate-x-0`}
                  >
                    New Version Available
                  </p>
                </div>
                <Icon
                  path={mdiCalendarRemoveOutline}
                  className="group-hover:text-accent timing text-secondary size-8 shrink-0"
                />
              </>
            ) : (
              <>
                <div className="overflow-hidden">
                  <p
                    className={`timing group-hover:text-accent inline-block origin-right translate-x-full transform text-right ease-in-out group-hover:translate-x-0`}
                  >
                    Up to Date
                  </p>
                </div>
                <Icon
                  path={mdiCalendarCheckOutline}
                  className="group-hover:text-accent timing text-secondary size-8 shrink-0"
                />
              </>
            )}
          </button>
          <Outlet context={{ item }} />
        </div>
      )}

      {((parts.includes('codex') && user?.role === 'ADMIN') ||
        (parts.includes('codex') && user?.role === 'SUPERADMIN')) && (
        <Link className="w-full self-end sm:max-w-1/3" to="update">
          <BtnRect
            ariaLabel="Navigat to edit weapon form"
            type="button"
            className="text-accent hover:underline"
          >
            {'Edit ' + item.name}
          </BtnRect>
        </Link>
      )}
      {(parts.includes('inventory') || parts.includes('equipment')) && (
        <Link
          className="w-full self-end sm:max-w-1/3"
          to="upgrade/tutorial"
          onClick={() => setBackgroundPath(`${location.pathname}/upgrade`)}
        >
          <BtnRect ariaLabel="Navigate to modify weapon form" type="button">
            {'Upgrade ' + item.name}
          </BtnRect>
        </Link>
      )}
    </div>
  );
};

export default ItemPage;
