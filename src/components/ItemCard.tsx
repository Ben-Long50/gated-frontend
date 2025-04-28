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
import ArrowHeader4 from './ArrowHeader4';

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
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full items-start justify-between">
              <div className="flex items-center gap-4">
                <ArrowHeader2 title={item.name} />
                {item.cyberneticType && (
                  <p className="text-tertiary">
                    (
                    {item.cyberneticType[0].toUpperCase() +
                      item.cyberneticType.slice(1)}
                    )
                  </p>
                )}
                {item?.category && (
                  <p className="text-tertiary">
                    ({item.category[0].toUpperCase() + item.category.slice(1)})
                  </p>
                )}
              </div>
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
            </div>
            <div
              className={`timing flex items-center justify-between gap-x-8 gap-y-2`}
            >
              {item.itemType && (
                <div className="flex gap-4">
                  <h4>
                    {item.itemType[0].toUpperCase() + item.itemType.slice(1)}
                  </h4>
                  <p className="text-tertiary">
                    {item.subcategory[0].toUpperCase() +
                      item.subcategory.slice(1)}
                  </p>
                </div>
              )}
              {item.body && (
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
              )}
              {item.keywords && (
                <div className={`flex flex-wrap items-center gap-1`}>
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
                </div>
              )}
              <ItemRarity
                className="ml-auto"
                rarity={item?.rarity}
                grade={item?.grade}
                cardWidth={cardWidth}
              />
            </div>
            <div
              ref={cardRef}
              className={`${cardWidth < 500 ? 'gap-2 px-2' : 'gap-4 px-4'} grid w-full grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2 border-x-2 border-gray-400 border-opacity-50`}
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
                {item.modifiers?.map((modifier: Modifier, index: number) => (
                  <ModifierTag key={index} modifier={modifier} />
                ))}
              </div>
            )}
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
