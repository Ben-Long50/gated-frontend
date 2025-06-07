import { useContext, useState, useEffect } from 'react';
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
import ItemCard from './ItemCard';
import ItemCardMobile from './ItemCardMobile';
import InputSelectField from './InputSelectField';

const Items = ({
  title,
  itemList,
  forcedMode,
  toggleFormLink,
}: {
  title?: string;
  itemList?: Item[];
  forcedMode?: string;
  toggleFormLink?: (item: Item) => void;
}) => {
  const { mobile } = useContext(LayoutContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const state = location.state;
  const parts = location.pathname.split('/').filter(Boolean);
  const category = parts[parts.length - 1];
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
    },
    onSubmit: () => {
      items.filterByCategory('');
      items.filterByQuery('');
    },
  });

  if (items.isLoading || items.isPending) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-6xl flex-col items-center gap-8">
      <h1 className="text-center">{heading}</h1>
      <ThemeContainer
        className={`ml-auto w-full`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <div className="flex flex-col gap-4 p-4">
          <div className="grid w-full grid-cols-2 items-center justify-between">
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
            <ItemCard
              key={item.id}
              item={item}
              mode={mode}
              toggleFormLink={toggleFormLink}
            />
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
