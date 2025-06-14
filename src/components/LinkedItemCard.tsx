import { KeywordReference } from 'src/types/keyword';
import StatBars from './StatBars';
import ArrowHeader3 from './ArrowHeader3';
import { Fragment, useContext, useRef } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import ItemPicture from './ItemPicture';
import { Item } from 'src/types/item';
import ItemRadialMenu from './radialMenus/itemRadialMenu/ItemRadialMenu';
import { Link, Outlet, useParams } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiLinkBoxVariantOutline } from '@mdi/js';
import KeywordTag from './KeywordTag';
import ConditionTag from './ConditionTag';
import useRadialMenuStore from 'src/stores/radialMenuStore';

const LinkedItemCard = ({
  item,
  mode,
  cardWidth,
}: {
  item: Item;
  mode?: string;
  cardWidth: number;
}) => {
  const { traitId, conditionId } = useParams();
  const { accentPrimary } = useContext(ThemeContext);

  const containerRef = useRef(null);

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

  return (
    <ThemeContainer borderColor={accentPrimary} chamfer="medium">
      <div
        ref={containerRef}
        className="flex cursor-pointer p-4"
        onClick={(e) => {
          e.stopPropagation();
          handleMenu(e);
        }}
      >
        <ItemRadialMenu item={item} containerRef={containerRef} />
        <div className="my-auto flex max-h-[250px] w-full gap-8">
          {item.picture?.imageUrl && (
            <ItemPicture
              key={item.id}
              className={`timing aspect-square h-[250px]`}
              item={item}
            />
          )}
          <div className="flex grow flex-col items-start justify-start gap-4">
            <div className="flex w-full items-center gap-4">
              <div className="flex w-full items-center justify-between">
                <ArrowHeader3 title={item?.name} />
                {item.baseItemId && (
                  <Link
                    className="timing group z-20 ml-auto flex items-center gap-4 py-2"
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
                    <ConditionTag key={condition.id} condition={condition} />
                    {Number(conditionId) === condition.id && (
                      <Outlet context={{ condition }} />
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {item.keywords?.map((keyword: KeywordReference) => {
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
            <div
              className={`${cardWidth < 500 ? 'gap-2 px-2' : 'gap-4 px-4'} scrollbar-primary-2 grid w-full grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2 overflow-y-auto border-x-2 border-gray-400 border-opacity-50`}
            >
              <StatBars stats={item.stats} mode={mode} cardWidth={cardWidth} />
            </div>
          </div>
        </div>
      </div>
    </ThemeContainer>
  );
};

export default LinkedItemCard;
