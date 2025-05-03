import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import { Link, useLocation, useParams } from 'react-router-dom';
import ItemRarity from './ItemRarity';
import CartButton from './CartButton';
import Icon from '@mdi/react';
import {
  mdiCollapseAllOutline,
  mdiExpandAllOutline,
  mdiTriangleDown,
} from '@mdi/js';
import { WeaponWithKeywords } from 'src/types/weapon';
import { ArmorWithKeywords } from 'src/types/armor';
import { Modification } from 'src/types/vehicle';
import SubweaponCard from './SubweaponCard';
import { Action } from 'src/types/action';
import SubactionCard from './SubactionCard';
import SubarmorCard from './SubarmorCard';
import SubmodificationCard from './SubmodificationCard';
import BodyIcon from './icons/BodyIcon';
import BtnRect from './buttons/BtnRect';
import StopwatchIcon from './icons/StopwatchIcon';
import { subcategoryMap } from '../types/maps';
import ModifierTag from './ModifierTag';
import { Modifier } from 'src/types/modifier';
import ItemPicture from './ItemPicture';
import Divider from './Divider';
import useWeaponQuery from '../hooks/useWeaponQuery/useWeaponQuery';
import Loading from './Loading';
import StatBars from './StatBars';
import ArrowHeader3 from './ArrowHeader3';
import useArmorPieceQuery from '../hooks/useArmorPieceQuery/useArmorPieceQuery';
import ArrowHeader2 from './ArrowHeader2';
import useCyberneticQuery from '../hooks/useCyberneticQuery/useCyberneticQuery';
import useVehicleQuery from '../hooks/useVehicleQuery/useVehicleQuery';
import useItemQuery from '../hooks/useItemQuery/useItemQuery';
import ItemCardSmall from './ItemCardSmall';
import { Keyword } from 'src/types/keyword';
import useDroneQuery from '../hooks/useDroneQuery/useDroneQuery';

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

  const cardRef = useRef(null);

  const {
    data: weapon,
    isLoading: weaponLoading,
    isPending: weaponPending,
  } = useWeaponQuery(apiUrl, Number(itemId), {
    enabled: category === 'weapons',
  });

  const {
    data: armor,
    isLoading: armorLoading,
    isPending: armorPending,
  } = useArmorPieceQuery(apiUrl, Number(itemId), {
    enabled: category === 'armor',
  });

  const {
    data: cybernetic,
    isLoading: cyberneticLoading,
    isPending: cyberneticPending,
  } = useCyberneticQuery(apiUrl, Number(itemId), {
    enabled: category === 'cybernetics',
  });

  const {
    data: vehicle,
    isLoading: vehicleLoading,
    isPending: vehiclePending,
  } = useVehicleQuery(apiUrl, Number(itemId), {
    enabled: category === 'vehicles',
  });

  const {
    data: drone,
    isLoading: droneLoading,
    isPending: dronePending,
  } = useDroneQuery(apiUrl, Number(itemId), {
    enabled: category === 'drones',
  });

  const {
    data: miscItem,
    isLoading: miscItemLoading,
    isPending: miscItemPending,
  } = useItemQuery(apiUrl, Number(itemId), { enabled: category === 'items' });

  let item;

  switch (category) {
    case 'weapons':
      item = weapon;
      break;
    case 'armor':
      item = armor;
      break;
    case 'cybernetics':
      item = cybernetic;
      break;
    case 'vehicles':
      item = vehicle;
      break;
    case 'drones':
      item = drone;
      break;
    case 'items':
      item = miscItem;
      break;
    default:
      break;
  }

  const isLoading =
    weaponLoading ||
    armorLoading ||
    cyberneticLoading ||
    vehicleLoading ||
    droneLoading ||
    miscItemLoading;

  const isPending =
    weaponPending ||
    armorPending ||
    cyberneticPending ||
    vehiclePending ||
    dronePending ||
    miscItemPending;

  useLayoutEffect(() => {
    if (!isLoading && cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth);
    }
  }, [isLoading]);

  if (isLoading) return <Loading />;

  return (
    <div className="flex w-full max-w-6xl flex-col items-center gap-8 sm:gap-12">
      <div className="grid w-full grid-cols-[1fr_auto_1fr]">
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
        <div className="flex w-full flex-col gap-8">
          <div className="flex items-center justify-between">
            <ItemRarity
              className="col-span-2 place-self-start"
              rarity={item?.rarity}
              grade={item?.grade}
              cardWidth={cardWidth}
            />
            <h4>Cost {item.price ? <span>{`${item.price}p`}</span> : 'N/A'}</h4>
          </div>
          {(item.cyberneticType || item.body) && (
            <div className="flex items-center justify-between">
              {item.cyberneticType && (
                <h3>
                  {item.cyberneticType[0].toUpperCase() +
                    item.cyberneticType.slice(1)}{' '}
                  Augment
                </h3>
              )}
              {item.body && (
                <div className="flex flex-col items-center gap-1">
                  <div className="mr-4 flex flex-wrap items-center gap-2">
                    <BodyIcon className="text-secondary size-8" />
                    {item.body.map((body, index) => {
                      return (
                        <p key={body}>
                          {body}
                          <span>{index < item.body.length - 1 && ','}</span>
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
          {item.modifiers && item.modifiers?.length > 0 && (
            <div className="flex w-full items-center justify-start gap-2 sm:gap-4">
              {item.modifiers?.map((modifier: Modifier, index: number) => (
                <ModifierTag key={index} modifier={modifier} />
              ))}
            </div>
          )}
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
                {item?.keywords &&
                  item.keywords.length > 0 &&
                  item.keywords?.map(
                    (item: { keyword: Keyword; value?: number }) => {
                      return (
                        <ItemCardSmall
                          key={item.keyword.id}
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

              {item?.category && (
                <div className="flex items-center gap-4">
                  <h4>{subcategoryMap[item.subcategory]}</h4>
                  <p className="text-tertiary italic">
                    ({item.category[0].toUpperCase() + item.category.slice(1)})
                  </p>
                  <Icon
                    className="text-secondary"
                    path={mdiTriangleDown}
                    size={0.35}
                    rotate={-90}
                  />
                  <p>{item.itemType}</p>
                </div>
              )}
            </div>
          )}
          {mode !== 'equipment' &&
            item.modifiers &&
            item.modifiers[0]?.duration && (
              <div className="flex items-center gap-4">
                <StopwatchIcon className="text-secondary size-8" />
                <p>{item.modifiers[0].duration?.value}</p>
                <p>
                  {item.modifiers[0].duration?.unit[0].toUpperCase() +
                    item.modifiers[0].duration?.unit.slice(1)}
                </p>
              </div>
            )}
        </div>
      </div>
      <div
        ref={cardRef}
        className={`${cardWidth < 500 ? 'gap-2 px-2' : 'gap-8 px-4'} grid h-full w-full grow grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2 border-x-2 border-gray-400 border-opacity-50`}
      >
        <StatBars stats={item.stats} cardWidth={cardWidth} />
      </div>

      <p className="self-start">{item.description}</p>
      {item.weapons && item.weapons?.length > 0 && (
        <>
          <Divider />
          <ArrowHeader2 className="self-start" title="Integrated Weapons" />
          <div className="flex w-full flex-col gap-8">
            {item.weapons?.map((weapon: WeaponWithKeywords, index: number) => {
              return (
                <SubweaponCard
                  key={index}
                  mode={mode}
                  weapon={weapon}
                  cardWidth={cardRef.current?.offsetWidth}
                />
              );
            })}
          </div>
        </>
      )}
      {item.armor && item.armor?.length > 0 && (
        <>
          <Divider />
          <ArrowHeader2 className="self-start" title="Integrated Armor" />
          <div className="flex w-full flex-col gap-8">
            {item.armor.map((armor: ArmorWithKeywords, index: number) => {
              return (
                <SubarmorCard
                  key={index}
                  mode={mode}
                  armor={armor}
                  cardWidth={cardRef.current?.offsetWidth}
                />
              );
            })}
          </div>
        </>
      )}
      {item.actions && item.actions?.length > 0 && (
        <>
          <Divider />
          <ArrowHeader2 className="self-start" title="Unique Actions" />
          <div className="flex w-full flex-col gap-8">
            {item.actions?.map((action: Action, index: number) => {
              return (
                <SubactionCard
                  key={index}
                  action={action}
                  cardWidth={cardRef.current?.offsetWidth}
                />
              );
            })}
          </div>
        </>
      )}
      {item.modifications?.length > 0 && (
        <ThemeContainer chamfer="small" borderColor={accentPrimary}>
          <p className="text-accent absolute -top-3 left-5 z-20 text-base">
            Modifications
          </p>
          <div className="flex flex-col gap-4 p-4">
            {item.modifications?.map(
              (modification: Modification, index: number) => {
                return (
                  <>
                    <SubmodificationCard
                      key={modification.id}
                      modification={modification}
                    />
                    {index < item.modifications.length - 1 && (
                      <hr className="w-full border-yellow-300 border-opacity-50" />
                    )}
                  </>
                );
              },
            )}
          </div>
        </ThemeContainer>
      )}
      {((mode === 'codex' && user?.role === 'ADMIN') ||
        (mode === 'codex' && user?.role === 'SUPERADMIN')) && (
        <Link
          className="w-1/3 self-end"
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
        <Link className="w-1/3 self-end" to={`modify`}>
          <BtnRect ariaLabel="Navigate to modify weapon form" type="button">
            {'Modify ' + item.name}
          </BtnRect>
        </Link>
      )}
    </div>
  );
};

export default ItemPage;
