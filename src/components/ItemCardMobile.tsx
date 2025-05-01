import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
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
import Icon from '@mdi/react';
import { mdiTriangleDown } from '@mdi/js';
import { WeaponWithKeywords } from 'src/types/weapon';
import { ArmorWithKeywords } from 'src/types/armor';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import { VehicleWithWeapons } from 'src/types/vehicle';
import { Keyword } from 'src/types/keyword';
import Tag from './Tag';
import BodyIcon from './icons/BodyIcon';
import { motion } from 'motion/react';
import { Item } from 'src/types/item';
import StopwatchIcon from './icons/StopwatchIcon';
import { subcategoryMap } from '../types/maps';
import ModifierTag from './ModifierTag';
import { Modifier } from 'src/types/modifier';
import ItemPicture from './ItemPicture';
import ArrowHeader2 from './ArrowHeader2';
import { ItemObject } from 'src/types/global';
import StatBars from './StatBars';

const ItemCardMobile = ({
  item,
  category,
  mode,
  controls,
  toggleFormLink,
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
  toggleFormLink?: (id: ItemObject) => void;
}) => {
  const { accentPrimary } = useContext(ThemeContext);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);
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
  const imageRef = useRef(null);
  const detailRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (imageRef.current) {
        setImageHeight(Math.floor(imageRef.current.offsetHeight));
      }
    };

    const observer = new ResizeObserver(updateDimensions);

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (detailRef.current) {
      const rect = detailRef.current.offsetHeight;
      setDetailHeight(rect);
    }
  }, [detailRef.current]);

  return (
    <div ref={cardRef} className="w-full">
      <ThemeContainer
        chamfer="medium"
        className="w-full"
        borderColor={accentPrimary}
        overflowHidden={true}
      >
        <Link
          to={mode === 'form' ? '' : `${category}/${item.id}`}
          className="timing hover:bg-secondary relative flex cursor-pointer flex-col gap-8"
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
            <div className="flex h-full flex-col gap-2">
              <div className="flex items-start justify-between gap-4">
                <ArrowHeader2 title={item.name} />
                {category === 'weapons' && item.vehicleId && (
                  <h4 className="text-error italic">(Currently equipped)</h4>
                )}
                <div className="flex flex-wrap items-start justify-end gap-4 gap-y-2">
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
              <div className="col-span-2 flex w-full items-center justify-between gap-4">
                {item.cyberneticType && (
                  <p>
                    {item.cyberneticType[0].toUpperCase() +
                      item.cyberneticType.slice(1)}{' '}
                    Augment
                  </p>
                )}
                {item.body && (
                  <div className="flex items-center justify-end gap-2">
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
              </div>
            </div>
            <div className="flex w-full items-center justify-between">
              {item?.keywords && item.keywords.length > 0 && (
                <div className="col-span-2 flex w-full flex-wrap items-center gap-1 justify-self-start">
                  {item.keywords.map(
                    (
                      item: { keyword: Keyword; value?: number },
                      index: number,
                    ) => {
                      return (
                        <Tag
                          id={item.keyword.id + index}
                          key={item.keyword.id}
                          label={
                            item.value
                              ? item.keyword?.name.replace(
                                  /X/g,
                                  item.value.toString(),
                                )
                              : item.keyword?.name
                          }
                          description={item.keyword.description}
                          toolTip={toolTip}
                          setToolTip={setToolTip}
                        />
                      );
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

            {item?.category && (
              <div className="flex items-center gap-4">
                <h4>{subcategoryMap[item.subcategory]}</h4>
                <p className="text-tertiary italic">
                  ({item.category[0].toUpperCase() + item.category.slice(1)})
                </p>
                <Icon
                  className="text-secondary shrink-0"
                  path={mdiTriangleDown}
                  size={0.35}
                  rotate={-90}
                />
                <p>{item.itemType}</p>
              </div>
            )}

            {item.picture && (
              <ItemPicture className={`timing mx-8 shrink-0`} item={item} />
            )}

            <div className="flex w-full flex-col items-center gap-4 pr-1">
              <div
                className={`${cardWidth && cardWidth < 500 ? 'gap-2 px-2' : 'gap-4 px-4'} grid h-full w-full grow grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2 border-x-2 border-gray-400 border-opacity-50`}
              >
                <StatBars
                  cardWidth={cardWidth}
                  stats={item.stats}
                  mode={mode}
                />
              </div>
              {item.modifiers && item.modifiers?.length > 0 && (
                <div className="flex w-full items-center gap-2">
                  {item.modifiers?.map((modifier: Modifier, index: number) => (
                    <ModifierTag key={index} modifier={modifier} />
                  ))}
                </div>
              )}
            </div>
            {item.modifiers && item.modifiers[0]?.duration && (
              <div className="flex items-center gap-4">
                <StopwatchIcon className="text-secondary size-8" />
                <p>{item.modifiers[0].duration?.value}</p>
                <p>
                  {item.modifiers[0].duration?.unit[0].toUpperCase() +
                    item.modifiers[0].duration?.unit.slice(1)}
                </p>
              </div>
            )}
            {mode === 'equipment' && controls}
          </div>
        </Link>
      </ThemeContainer>
    </div>
  );
};

export default ItemCardMobile;
