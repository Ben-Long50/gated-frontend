import { useContext, useState, useEffect, lazy, Suspense } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import Loading from './Loading';
import useItems from '../hooks/useItems';
import { Item } from 'src/types/item';
import ArrowHeader2 from './ArrowHeader2';
import { LayoutContext } from '../contexts/LayoutContext';
import Icon from '@mdi/react';
import { mdiCropSquare, mdiGrid, mdiSync } from '@mdi/js';
import { useLocation, useSearchParams } from 'react-router-dom';
import ItemCardMobile from './ItemCardMobile';
import InputSelectField from './InputSelectField';
import { capitalCase } from 'change-case';

const LazyItemCard = lazy(() => import('./ItemCard'));

const Items = ({
  title,
  itemList,
  forcedMode,
  forcedCategory,
  toggleFormLink,
}: {
  title?: string;
  itemList?: Item[];
  forcedMode?: string;
  forcedCategory?: string;
  toggleFormLink?: (item: Item) => void;
}) => {
  const { mobile } = useContext(LayoutContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const state = location.state;
  const parts = location.pathname.split('/').filter(Boolean);
  const category = forcedCategory || parts[parts.length - 1];
  const mode = forcedMode || parts[parts.length - 2];

  const heading = state ? state.title : title;

  const include = searchParams.getAll('include');
  const exclude = searchParams.getAll('exclude');
  const augmentType = searchParams.get('augmentType');

  const [cardType, setCardType] = useState<'small' | 'large'>(() =>
    mobile ? 'small' : 'large',
  );

  const items = useItems({
    category,
    itemList: itemList || undefined,
    includedKeywords: include.length > 0 ? include : undefined,
    excludedKeywords: exclude.length > 0 ? exclude : undefined,
    subcategory: augmentType,
  });

  const searchForm = useForm({
    defaultValues: {
      category: '',
      query: '',
      priceFilter: '',
      rarity: '',
    },
    onSubmit: () => {
      items.filterByCategory('');
      items.filterByPrice('');
      items.filterByRarity('');
      items.filterByQuery('');
    },
  });

  if (items.isLoading || items.isPending) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-6xl flex-col items-center gap-8">
      {heading && <h1 className="text-center">{heading}</h1>}
      <ThemeContainer
        className={`ml-auto w-full`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <div className="flex flex-col gap-4 p-4">
          <div className="grid w-full grid-cols-2 items-center justify-between gap-4">
            <ArrowHeader2 title="Filter Options" />
            <searchForm.Field name="category">
              {(field) => (
                <InputSelectField
                  field={field}
                  label="Trait"
                  options={items.filteredKeywords || []}
                  onChange={() => {
                    items.filterByCategory(field.state.value);
                  }}
                />
              )}
            </searchForm.Field>
            <searchForm.Field name="priceFilter">
              {(field) => (
                <InputSelectField
                  className="w-full"
                  label={`Filter By Price`}
                  field={field}
                  options={['lowToHigh', 'highToLow']}
                  onChange={() => {
                    items.filterByPrice(field.state.value);
                  }}
                />
              )}
            </searchForm.Field>
            <searchForm.Field name="rarity">
              {(field) => (
                <InputSelectField
                  className="w-full"
                  label={`Rarity`}
                  field={field}
                  options={[
                    'common',
                    'uncommon',
                    'rare',
                    'blackMarket',
                    'artifact',
                  ]}
                  onChange={() => {
                    items.filterByRarity(field.state.value);
                  }}
                />
              )}
            </searchForm.Field>
          </div>
          <div className="flex items-center gap-4">
            <searchForm.Field name="query">
              {(field) => (
                <InputField
                  className="w-full"
                  label={`Search ${capitalCase(category)}`}
                  field={field}
                  onChange={() => {
                    items.filterByQuery(field.state.value);
                  }}
                />
              )}
            </searchForm.Field>
            {!mobile && (
              <>
                <button
                  className="text-accent bg-tertiary group z-10 grid size-12 shrink-0 place-items-center rounded-md p-0.5 shadow-md shadow-black hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setCardType('large');
                  }}
                >
                  <Icon
                    path={mdiCropSquare}
                    className={`${cardType === 'large' && 'text-accent'} text-secondary group-hover:text-accent timing`}
                  />
                </button>
                <button
                  className="text-accent bg-tertiary group z-10 grid size-12 shrink-0 place-items-center rounded-md p-2 shadow-md shadow-black hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setCardType('small');
                  }}
                >
                  <Icon
                    path={mdiGrid}
                    className={`${cardType === 'small' && 'text-accent'} text-secondary group-hover:text-accent timing`}
                  />
                </button>
              </>
            )}
            <button
              className="text-accent bg-tertiary group z-10 grid size-12 shrink-0 place-items-center rounded-md p-1.5 shadow-md shadow-black hover:underline"
              onClick={(e) => {
                e.preventDefault();
                searchForm.reset();
                searchForm.handleSubmit();
              }}
            >
              <Icon
                path={mdiSync}
                className="text-secondary group-hover:text-accent timing"
              />
            </button>
          </div>
        </div>
      </ThemeContainer>
      {cardType === 'large' ? (
        items.filteredItems?.map((item: Item) => {
          return (
            <Suspense key={item.id} fallback={<Loading />}>
              <LazyItemCard
                item={item}
                mode={mode}
                toggleFormLink={toggleFormLink}
              />
            </Suspense>
          );
        })
      ) : (
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
          {items.filteredItems?.map((item: Item) => {
            return (
              <ItemCardMobile
                key={item.id}
                item={item}
                mode={mode}
                toggleFormLink={toggleFormLink}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Items;
