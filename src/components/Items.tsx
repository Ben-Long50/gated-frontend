import { useContext, useState } from 'react';
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
import {
  useLocation,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import InputSelectField from './InputSelectField';
import { capitalCase } from 'change-case';
import ItemCard from './ItemCard';

const Items = ({
  title,
  itemList,
  forcedMode,
  forcedCategory,
  character,
  toggleFormLink,
}: {
  title?: string;
  itemList?: Item[];
  forcedMode?: string;
  forcedCategory?: string;
  character?: string;
  toggleFormLink?: (item: Item) => void;
}) => {
  const { mobile } = useContext(LayoutContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const state = location.state;
  const parts = location.pathname.split('/').filter(Boolean);
  const { category } = useParams();
  const mode = forcedMode || parts[parts.length - 2];

  const { categorizedShopItems } = useOutletContext() || {};

  const heading = state ? state.title : title;

  const include = searchParams.getAll('include');
  const exclude = searchParams.getAll('exclude');
  const augmentType = searchParams.get('augmentType');

  const [cardType, setCardType] = useState<'small' | 'large'>(() =>
    mobile ? 'small' : 'large',
  );

  const {
    filteredItems: items,
    filterByCategory,
    filterByPrice,
    filterByQuery,
    filterByRarity,
    filteredKeywords,
    isLoading,
  } = useItems({
    category: forcedCategory || category,
    itemList: categorizedShopItems || itemList || undefined,
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
      filterByCategory('');
      filterByPrice('');
      filterByRarity('');
      filterByQuery('');
    },
  });

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
                  options={filteredKeywords || []}
                  onChange={() => {
                    filterByCategory(field.state.value);
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
                    filterByPrice(field.state.value);
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
                    filterByRarity(field.state.value);
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
                  label={
                    category ? `Search ${capitalCase(category)}` : 'Search All'
                  }
                  field={field}
                  onChange={() => {
                    filterByQuery(field.state.value);
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
      <div
        className={`${cardType === 'small' ? 'grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-4' : 'grid-cols-1 gap-8'} grid w-full`}
      >
        {isLoading ? (
          <Loading />
        ) : (
          items?.map((item: Item) => (
            <ItemCard
              key={item.id}
              item={item}
              mode={mode}
              cardType={cardType}
              character={character}
              toggleFormLink={toggleFormLink}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Items;
