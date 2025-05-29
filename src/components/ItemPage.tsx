import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import { Link } from 'react-router-dom';
import ItemRarity from './ItemRarity';
import CartButton from './CartButton';
import Icon from '@mdi/react';
import {
  mdiCalendarCheckOutline,
  mdiCalendarRemoveOutline,
  mdiCollapseAllOutline,
  mdiExpandAllOutline,
  mdiLink,
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
import ItemUpdateModal from './ItemUpdateModal';
import LinkedItemCard from './LinkedItemCard';
import LinkedActionCard from './LinkedActionCard';
import ItemRadialMenu from './ItemRadialMenu';
import Tag from './Tag';

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
  const { apiUrl, user } = useContext(AuthContext);
  const [cardWidth, setCardWidth] = useState(0);
  const [traitsExpanded, setTraitsExpanded] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);

  const toggleUpdateMode = () => {
    setUpdateMode(!updateMode);
  };

  const cardRef = useRef(null);

  const { data: item, isLoading } = useItemQuery(
    apiUrl,
    Number(itemId),
    category,
  );

  const { itemStats, itemKeywords, powerLevel } = useItemStats([item]);

  const linkedWeapons =
    item?.itemLinkReference?.items.filter(
      (item) => item.itemType === 'weapon',
    ) || [];

  const linkedArmor =
    item?.itemLinkReference?.items.filter(
      (item) => item.itemType === 'armor',
    ) || [];

  const linkedModifiactions =
    item?.itemLinkReference?.items.filter(
      (item) => item.itemType === 'modification',
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
        <ItemRadialMenu className="block" item={item} />
        <h1 className="col-start-2 text-center">{item.name}</h1>
        {mode === 'codex' && (
          <div className="col-start-3 flex items-center justify-end gap-4 self-end">
            <CartButton category={category} itemId={item?.id} />
          </div>
        )}
      </div>
      <div className="relative flex h-full w-full flex-col gap-8 sm:flex-row sm:gap-12">
        {item.picture?.imageUrl && (
          <ItemPicture
            key={item.id}
            className={`timing w-full sm:w-2/5`}
            item={item}
          />
        )}
        <div className="flex w-full flex-col gap-4">
          <div className="flex grow flex-wrap items-center justify-start gap-1">
            {item.conditions?.map((condition) => (
              <Tag key={condition.id} condition={condition} />
            ))}
          </div>
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
                  itemKeywords[0]?.map(
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
          <StatBars stats={itemStats[0]} cardWidth={cardWidth} />
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
              path={mdiLink}
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
                toggleUpdateMode();
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
          <ItemUpdateModal
            item={item}
            updateMode={updateMode}
            toggleUpdateMode={toggleUpdateMode}
          />
        </div>
      )}

      {((mode === 'codex' && user?.role === 'ADMIN') ||
        (mode === 'codex' && user?.role === 'SUPERADMIN')) && (
        <Link
          className="w-full self-end sm:max-w-1/3"
          to={`/glam/codex/${category}/${item.id}/update`}
        >
          <BtnRect
            ariaLabel="Navigat to edit weapon form"
            type="button"
            className="text-accent hover:underline"
          >
            {'Edit ' + item.name}
          </BtnRect>
        </Link>
      )}
      {mode === 'inventory' && (
        <Link className="w-full self-end sm:max-w-1/3" to={`modify`}>
          <BtnRect ariaLabel="Navigate to modify weapon form" type="button">
            {'Modify ' + item.name}
          </BtnRect>
        </Link>
      )}
    </div>
  );
};

export default ItemPage;
