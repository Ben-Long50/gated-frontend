import { useForm } from '@tanstack/react-form';
import ThemeContainer from './ThemeContainer';
import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { Keyword } from 'src/types/keyword';
import Loading from './Loading';
import useKeywords from '../hooks/useKeywords';
import KeywordCard from './KeywordCard';
import PerkCard from './PerkCard';
import usePerks from '../hooks/usePerks';
import useActions from '../hooks/useActions';
import useConditions from '../hooks/useConditions';
import ActionCard from './ActionCard';
import ConditionCard from './ConditionCard';
import ArrowHeader2 from './ArrowHeader2';
import InputSelectField from './InputSelectField';
import Icon from '@mdi/react';
import { mdiCropSquare, mdiGrid, mdiSync } from '@mdi/js';
import { LayoutContext } from '../contexts/LayoutContext';
import ItemCard from './ItemCard';
import { AuthContext } from 'src/contexts/AuthContext';
import { Item } from 'src/types/item';
import { Action } from 'src/types/action';
import { Condition } from 'src/types/condition';
import useAllItemsQuery from 'src/hooks/useAllItemsQuery/useAllItemsQuery';
import { camelCase } from 'change-case';

const CodexSearch = () => {
  const { accentPrimary } = useContext(ThemeContext);
  const { mobile } = useContext(LayoutContext);
  const { apiUrl } = useContext(AuthContext);

  const [nameQuery, setNameQuery] = useState<string | null>(null);
  const [descriptionQuery, setDescriptionQuery] = useState<string | null>(null);
  const [category, setCategory] = useState('');
  const [cardType, setCardType] = useState<'small' | 'large'>(() =>
    mobile ? 'small' : 'large',
  );

  const nameTimerRef = useRef<number | null>(null);
  const descriptionTimerRef = useRef<number | null>(null);

  const { data: items, isLoading, isPending } = useAllItemsQuery(apiUrl);

  const { filteredKeywords: keywords } = useKeywords();

  const { filteredPerkTree: perks } = usePerks();

  const { filteredActions: actions } = useActions();

  const { filteredConditions: conditions } = useConditions();

  const perkArray = Object.values(perks)
    .map((item) => Object.values(item).flat())
    .flat();

  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [filteredActions, setFilteredActions] = useState<Action[]>([]);
  const [filteredPerks, setFilteredPerks] = useState<Keyword[]>([]);
  const [filteredKeywords, setFilteredKeywords] = useState<Keyword[]>([]);
  const [filteredConditions, setFilteredConditions] = useState<Condition[]>([]);
  const [filtering, setFiltering] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const filter = (
      itemArray: Item[] | Keyword[] | Action[] | Condition[] | undefined,
    ) => {
      const nameFilter = nameQuery?.toLowerCase() ?? null;
      const descFilter = descriptionQuery?.toLowerCase() ?? null;
      const hasCategoryFilter = category !== '';

      const filteredItems = itemArray
        ? itemArray.filter((item) => {
            if (!item) return false;
            const nameMatch = item.name?.toLowerCase().includes(nameFilter);
            const descMatch = item.description
              ?.toLowerCase()
              .includes(descFilter);

            const categoryMatch = item.keywords
              ? !hasCategoryFilter ||
                item.keywords?.some(
                  (keyword: { keyword: Keyword }) =>
                    category === camelCase(keyword.keyword?.name),
                )
              : true;

            return nameMatch && descMatch && categoryMatch;
          })
        : [];

      return filteredItems;
    };

    const filtered = {
      items: filter(items),
      actions: category ? [] : filter(actions),
      perks: category ? [] : filter(perkArray),
      keywords: category ? [] : filter(keywords),
      conditions: category ? [] : filter(conditions),
    };

    if (!cancelled) {
      setFilteredItems(filtered.items);
      setFilteredActions(filtered.actions);
      setFilteredPerks(filtered.perks);
      setFilteredKeywords(filtered.keywords);
      setFilteredConditions(filtered.conditions);
      setFiltering(false);
    }

    return () => {
      cancelled = true;
    };
  }, [category, nameQuery, descriptionQuery]);

  const keywordList = keywords?.map((keyword) => keyword.name);

  const filterByNameQuery = (query: string) => {
    setFiltering(true);

    if (nameTimerRef.current) {
      clearTimeout(nameTimerRef.current);
    }

    nameTimerRef.current = setTimeout(() => {
      setNameQuery(query || (!descriptionQuery && !category ? null : query));

      if ((query && !descriptionQuery) || (category && !descriptionQuery)) {
        setDescriptionQuery('');
      } else if (!descriptionQuery) {
        setDescriptionQuery(null);
      }
    }, 1000);
  };

  const filterByDescriptionQuery = (query: string) => {
    setFiltering(true);

    if (descriptionTimerRef.current) {
      clearTimeout(descriptionTimerRef.current);
    }

    descriptionTimerRef.current = setTimeout(() => {
      if (!nameQuery && !query && !category) {
        setDescriptionQuery(null);
      } else {
        setDescriptionQuery(query);
      }
      if ((query && !nameQuery) || (category && !nameQuery)) {
        setNameQuery('');
      } else if (!nameQuery) {
        setNameQuery(null);
      }
    }, 1000);
  };

  const searchForm = useForm({
    defaultValues: {
      keyword: '',
      nameQuery: '',
      descriptionQuery: '',
    },
    onSubmit: ({ value }) => {
      filterByNameQuery(value.nameQuery);
      filterByDescriptionQuery(value.descriptionQuery);
    },
  });

  return (
    <div className="flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8">
      <h1>Search Codex</h1>
      <ThemeContainer
        className={`ml-auto w-full`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <form className="flex w-full flex-col gap-4 p-4">
          <div className="grid w-full grid-cols-2 gap-4 sm:gap-8">
            <ArrowHeader2 title="Filter Options" />
            <searchForm.Field name="keyword">
              {(field) => (
                <InputSelectField
                  field={field}
                  label="Trait"
                  options={keywordList}
                  onChange={() => {
                    setCategory(field.state.value);
                  }}
                />
              )}
            </searchForm.Field>
          </div>
          <searchForm.Field name="nameQuery">
            {(field) => (
              <InputField
                label="Search by Name"
                field={field}
                onChange={() => {
                  filterByNameQuery(field.state.value);
                }}
              />
            )}
          </searchForm.Field>
          <div className="flex items-end gap-4">
            <searchForm.Field name="descriptionQuery">
              {(field) => (
                <InputField
                  className="w-full"
                  label="Search by Description"
                  field={field}
                  onChange={() => {
                    filterByDescriptionQuery(field.state.value);
                  }}
                />
              )}
            </searchForm.Field>
            {!mobile && (
              <>
                <button
                  className="text-accent bg-tertiary shadow-color group z-10 grid size-12 shrink-0 place-items-center rounded-md p-0.5 shadow-md hover:underline"
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
                  className="text-accent bg-tertiary shadow-color group z-10 grid size-12 shrink-0 place-items-center rounded-md p-2 shadow-md hover:underline"
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
              className="text-accent bg-tertiary shadow-color group z-10 grid size-12 shrink-0 place-items-center rounded-md p-1.5 shadow-md hover:underline"
              onClick={(e) => {
                e.preventDefault();
                searchForm.reset();
                setCategory('');
                setNameQuery(null);
                setDescriptionQuery(null);
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
      {isLoading || isPending || filtering ? (
        <Loading />
      ) : [
          ...filteredItems,
          ...filteredKeywords,
          ...filteredPerks,
          ...filteredActions,
          ...filteredConditions,
        ].length === 0 ? (
        <h1>No Codex Items Found</h1>
      ) : (
        <>
          {filteredItems.length > 0 && (
            <>
              <ArrowHeader2 className="self-start" title="Items" />
              <div
                className={`${cardType === 'small' ? 'grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8' : 'flex w-full flex-col gap-8'}`}
              >
                {filteredItems.map((item) => (
                  <ItemCard key={item.id} item={item} mode="search" />
                ))}
              </div>
            </>
          )}
          {filteredKeywords.length > 0 && (
            <div className="flex w-full flex-col gap-4">
              <h2 className="pl-4">Keywords</h2>
              <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                {filteredKeywords.map((keyword, index) => {
                  return (
                    <KeywordCard
                      key={'triat' + index}
                      keyword={keyword}
                      mode="codex"
                    />
                  );
                })}
              </div>
            </div>
          )}
          {filteredPerks.length > 0 && (
            <div className="flex w-full flex-col gap-4">
              <h2 className="pl-4">Perks</h2>
              <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                {filteredPerks.map((perk, index) => {
                  return (
                    <PerkCard key={'perk' + index} perk={perk} mode="codex" />
                  );
                })}
              </div>
            </div>
          )}
          {filteredActions.length > 0 && (
            <div className="flex w-full flex-col gap-4">
              <h2 className="pl-4">Actions</h2>
              <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                {filteredActions.map((action, index) => {
                  return (
                    <ActionCard
                      key={'action' + index}
                      action={action}
                      mode="codex"
                    />
                  );
                })}
              </div>
            </div>
          )}
          {filteredConditions.length > 0 && (
            <div className="flex w-full flex-col gap-4">
              <h2 className="pl-4">Conditions</h2>
              <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                {filteredConditions.map((condition, index) => {
                  return (
                    <ConditionCard
                      key={'condition' + index}
                      condition={condition}
                      mode="codex"
                    />
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CodexSearch;
