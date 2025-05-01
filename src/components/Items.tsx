import { useContext, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import Loading from './Loading';
import { FetchOptions } from 'src/types/fetchOptions';
import useItems from '../hooks/useItems';
import { Item } from 'src/types/item';
import MiscItemCard, { MiscItemCardMobile } from './MiscItemCard';
import ArrowHeader2 from './ArrowHeader2';
import { LayoutContext } from '../contexts/LayoutContext';
import Icon from '@mdi/react';
import { mdiCropSquare, mdiGrid, mdiSync } from '@mdi/js';
import { useLocation, useSearchParams } from 'react-router-dom';

const Items = ({ title, mode }: { title: string; mode: string }) => {
  const { mobile } = useContext(LayoutContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const state = location.state;

  const include = searchParams.getAll('include');
  const exclude = searchParams.getAll('exclude');

  const [cardType, setCardType] = useState<'small' | 'large'>(() =>
    mobile ? 'small' : 'large',
  );

  const items = useItems({
    includedKeywords: include.length > 0 ? include : undefined,
    excludedKeywords: exclude.length > 0 ? exclude : undefined,
  });

  const searchForm = useForm({
    defaultValues: {
      query: '',
    },
    onSubmit: ({ value }) => {
      if (value.query === '') {
        items.resetList();
      } else {
        items.filterByQuery(value.query);
      }
    },
  });

  if (items.isLoading || items.isPending) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-6xl flex-col items-center gap-8">
      <h1 className="text-center">{state.title || title}</h1>
      <ThemeContainer
        className={`ml-auto w-full`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <form className="flex w-full flex-col gap-4 p-4">
          <div className="grid w-full grid-cols-2 items-center justify-between gap-4 sm:grid-cols-3 sm:gap-8">
            <ArrowHeader2 title="Filter Options" />
          </div>
          <div className="flex w-full items-center gap-4">
            <searchForm.Field name="query">
              {(field) => (
                <InputField
                  className="w-full"
                  label="Search items"
                  field={field}
                  onChange={() => {
                    searchForm.handleSubmit();
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
        </form>
      </ThemeContainer>
      {cardType === 'large' ? (
        items.filteredItems?.map((item: Item) => {
          return <MiscItemCard key={item.id} item={item} mode={mode} />;
        })
      ) : (
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
          {items.filteredItems?.map((item: Item) => {
            return <MiscItemCardMobile key={item.id} item={item} mode={mode} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Items;
