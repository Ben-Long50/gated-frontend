import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import { Link } from 'react-router-dom';
import ItemRarity from './ItemRarity';
import CartButton from './CartButton';
import Icon from '@mdi/react';
import { mdiTriangleDown } from '@mdi/js';
import { WeaponWithKeywords } from 'src/types/weapon';
import { ArmorWithKeywords } from 'src/types/armor';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import { Modification, VehicleWithWeapons } from 'src/types/vehicle';
import { Keyword } from 'src/types/keyword';
import Tag from './Tag';

import SubmodificationCard from './SubmodificationCard';
import BodyIcon from './icons/BodyIcon';
import BtnRect from './buttons/BtnRect';

import { Item } from 'src/types/item';

import { subcategoryMap } from '../types/maps';
import ModifierTag from './ModifierTag';
import { Modifier } from 'src/types/modifier';
import ItemPicture from './ItemPicture';
import ArrowHeader2 from './ArrowHeader2';

const ItemCard = ({
  item,
  category,
  mode,
  controls,
  children,
}: {
  item:
    | WeaponWithKeywords
    | ArmorWithKeywords
    | CyberneticWithKeywords
    | VehicleWithWeapons
    | Item;
  category: string;
  mode: string;
  controls?: ReactNode;
  children: ReactNode;
}) => {
  const { accentPrimary } = useContext(ThemeContext);
  const [cardWidth, setCardWidth] = useState(0);

  useLayoutEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth);
    }
  }, []);

  const cardRef = useRef(null);

  return (
    <ThemeContainer
      chamfer="medium"
      className="w-full"
      borderColor={accentPrimary}
      overflowHidden={true}
    >
      <Link
        to={`${category}/${item.id}`}
        className="timing hover:bg-secondary relative flex cursor-pointer flex-col gap-8 p-4"
      >
        <div className="relative flex h-full gap-8">
          {item.picture && (
            <ItemPicture className={`timing w-[280px]`} item={item} />
          )}
          <div className="w-full">
            <div className="grid w-full grow grid-cols-[2fr-1fr] items-start gap-x-8 gap-y-4">
              <div>
                <div className="flex items-center gap-4">
                  <ArrowHeader2 title={item.name} />
                  {category === 'weapons' && item.vehicleId && (
                    <h4 className="text-error italic">(Currently equipped)</h4>
                  )}
                </div>
                {item.cyberneticType && (
                  <p className="text-tertiary italic">
                    (
                    {item.cyberneticType[0].toUpperCase() +
                      item.cyberneticType.slice(1)}
                    )
                  </p>
                )}
              </div>

              <div
                className={`${mode === 'codex' && 'row-span-2'} timing col-start-2 row-start-1 flex flex-col items-end justify-end gap-x-8 gap-y-2`}
              >
                <div className="flex items-start gap-4">
                  <p>{item?.price ? item.price + 'p' : 'N/A'}</p>
                  {mode === 'codex' && (
                    <CartButton
                      price={item?.price}
                      category={category}
                      itemId={item?.id}
                    />
                  )}
                </div>
                <ItemRarity
                  className="place-self-end"
                  rarity={item?.rarity}
                  grade={item?.grade}
                  cardWidth={cardWidth}
                />
              </div>
              {(item.body || item.keywords || item.category) && (
                <div
                  className={` ${mode !== 'codex' && 'col-span-2'} col-start-1 row-start-2 flex flex-wrap items-center gap-1`}
                >
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
                  {item?.keywords &&
                    item.keywords.length > 0 &&
                    item.keywords?.map(
                      (
                        item: { keyword: Keyword; value?: number },
                        index: number,
                      ) => {
                        return (
                          <Tag
                            id={item.keyword?.id + index}
                            key={item.keyword?.id}
                            label={
                              item.value
                                ? item.keyword?.name + ' ' + item.value
                                : item.keyword?.name
                            }
                            description={item.keyword?.description}
                          />
                        );
                      },
                    )}
                  {item?.category && (
                    <div className="flex items-center gap-4">
                      <h4>{subcategoryMap[item.subcategory]}</h4>
                      <p className="text-tertiary italic">
                        (
                        {item.category[0].toUpperCase() +
                          item.category.slice(1)}
                        )
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
              <div className="col-span-2 flex w-full flex-col flex-wrap items-center gap-4 pr-2">
                <div
                  ref={cardRef}
                  className={`${cardWidth < 500 ? 'gap-2 px-2' : 'gap-4 px-4'} grid h-full w-full grow grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2 border-x-2 border-gray-400 border-opacity-50`}
                >
                  {Children.map(children, (child) => {
                    if (isValidElement(child)) {
                      return cloneElement(child, {
                        cardWidth,
                      });
                    }
                    return child;
                  })}
                </div>

                {item.modifiers && item.modifiers?.length > 0 && (
                  <div className="flex w-full items-center justify-start gap-2 sm:gap-4">
                    {item.modifiers?.map(
                      (modifier: Modifier, index: number) => (
                        <ModifierTag key={index} modifier={modifier} />
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {mode === 'equipment' && controls}
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
        {mode === 'inventory' && (
          <Link className="w-1/3 self-end" to={`${item.id}/modify`}>
            <BtnRect ariaLabel="Navigate to modify weapon form" type="button">
              Modify
            </BtnRect>
          </Link>
        )}
      </Link>
    </ThemeContainer>
  );
};

export default ItemCard;
