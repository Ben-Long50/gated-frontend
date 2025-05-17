import { useForm } from '@tanstack/react-form';
import ThemeContainer from './ThemeContainer';
import { useContext, useRef, useState } from 'react';
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
import ItemCardMobile from './ItemCardMobile';
import useWeaponsQuery from 'src/hooks/useWeaponsQuery/useWeaponsQuery';
import { AuthContext } from 'src/contexts/AuthContext';
import useArmorQuery from 'src/hooks/useArmorQuery/useArmorQuery';
import useCyberneticsQuery from 'src/hooks/useCyberneticsQuery/useCyberneticsQuery';
import useVehiclesQuery from 'src/hooks/useVehiclsQuery/useVehiclesQuery';
import useDronesQuery from 'src/hooks/useDronesQuery/useDronesQuery';
import useItemsQuery from 'src/hooks/useItemsQuery/useItemsQuery';
import { Item } from 'src/types/item';
import { Action } from 'src/types/action';
import { Condition } from 'src/types/condition';

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

  const { data: weapons, isLoading: weaponsLoading } = useWeaponsQuery(apiUrl);
  const { data: armors, isLoading: armorLoading } = useArmorQuery(apiUrl);
  const { data: cybernetics, isLoading: cyberneticsLoading } =
    useCyberneticsQuery(apiUrl);
  const { data: vehicles, isLoading: vehiclesLoading } =
    useVehiclesQuery(apiUrl);
  const { data: drones, isLoading: dronesLoading } = useDronesQuery(apiUrl);
  const { data: items, isLoading: itemsLoading } = useItemsQuery(apiUrl);

  const { filteredKeywords: keywords, isLoading: keywordsLoading } =
    useKeywords();

  const { filteredPerkTree: perks, isLoading: perksLoading } = usePerks();

  const { filteredActions: actions, isLoading: actionsLoading } = useActions();

  const { filteredConditions: conditions, isLoading: conditionsLoading } =
    useConditions();

  const perkArray = Object.values(perks)
    .map((item) => Object.values(item).flat())
    .flat();

  const filterItems = (
    itemArray: Item[] | Keyword[] | Action[] | Condition[] | undefined,
  ) => {
    const nameFilter = nameQuery?.toLowerCase() ?? null;
    const descFilter = descriptionQuery?.toLowerCase() ?? null;
    const hasCategoryFilter = category !== '';

    return itemArray
      ? itemArray.filter((item) => {
          const nameMatch = item.name?.toLowerCase().includes(nameFilter);
          const descMatch = item.description
            ?.toLowerCase()
            .includes(descFilter);

          const categoryMatch = item.keywords
            ? !hasCategoryFilter ||
              item.keywords?.some(
                (keyword: { keyword: Keyword }) =>
                  category === keyword.keyword?.name,
              )
            : true;

          return nameMatch && descMatch && categoryMatch;
        })
      : [];
  };

  const filteredWeapons = filterItems(weapons);
  const filteredArmors = filterItems(armors);
  const filteredCybernetics = filterItems(cybernetics);
  const filteredVehicles = filterItems(vehicles);
  const filteredDrones = filterItems(drones);
  const filteredItems = filterItems(items);
  const filteredKeywords = filterItems(keywords);
  const filteredPerks = filterItems(perkArray);
  const filteredActions = filterItems(actions);
  const filteredConditions = filterItems(conditions);

  const keywordList = keywords.map((keyword) => keyword.name);

  const isLoading =
    weaponsLoading ||
    armorLoading ||
    cyberneticsLoading ||
    vehiclesLoading ||
    dronesLoading ||
    itemsLoading ||
    keywordsLoading ||
    perksLoading ||
    actionsLoading ||
    conditionsLoading;

  const filterByNameQuery = (query: string) => {
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
    }, 200);
  };

  const filterByDescriptionQuery = (query: string) => {
    if (descriptionTimerRef.current) {
      clearTimeout(descriptionTimerRef.current);
    }

    nameTimerRef.current = setTimeout(() => {
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
    }, 200);
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

  if (isLoading) return <Loading />;

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
                    setNameQuery('');
                    setDescriptionQuery('');
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
      {filteredWeapons.length > 0 && (
        <>
          <ArrowHeader2 className="self-start" title="Weapons" />
          <div
            className={`${cardType === 'small' ? 'grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8' : 'flex w-full flex-col gap-8'}`}
          >
            {filteredWeapons.map((item) =>
              cardType === 'large' ? (
                <ItemCard key={item.id} item={item} mode="search" />
              ) : (
                <ItemCardMobile key={item.id} item={item} mode="search" />
              ),
            )}
          </div>
        </>
      )}
      {filteredArmors.length > 0 && (
        <>
          <ArrowHeader2 className="self-start" title="Armors" />
          <div
            className={`${cardType === 'small' ? 'grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8' : 'flex w-full flex-col gap-8'}`}
          >
            {filteredArmors.map((item) =>
              cardType === 'large' ? (
                <ItemCard key={item.id} item={item} mode="search" />
              ) : (
                <ItemCardMobile key={item.id} item={item} mode="search" />
              ),
            )}
          </div>
        </>
      )}
      {filteredCybernetics.length > 0 && (
        <>
          <ArrowHeader2 className="self-start" title="Augmentations" />
          <div
            className={`${cardType === 'small' ? 'grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8' : 'flex w-full flex-col gap-8'}`}
          >
            {filteredCybernetics.map((item) =>
              cardType === 'large' ? (
                <ItemCard key={item.id} item={item} mode="search" />
              ) : (
                <ItemCardMobile key={item.id} item={item} mode="search" />
              ),
            )}
          </div>
        </>
      )}
      {filteredVehicles.length > 0 && (
        <>
          <ArrowHeader2 className="self-start" title="Vehicles" />
          <div
            className={`${cardType === 'small' ? 'grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8' : 'flex w-full flex-col gap-8'}`}
          >
            {filteredVehicles.map((item) =>
              cardType === 'large' ? (
                <ItemCard key={item.id} item={item} mode="search" />
              ) : (
                <ItemCardMobile key={item.id} item={item} mode="search" />
              ),
            )}
          </div>
        </>
      )}
      {filteredDrones.length > 0 && (
        <>
          <ArrowHeader2 className="self-start" title="Drones" />
          <div
            className={`${cardType === 'small' ? 'grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8' : 'flex w-full flex-col gap-8'}`}
          >
            {filteredDrones.map((item) =>
              cardType === 'large' ? (
                <ItemCard key={item.id} item={item} mode="search" />
              ) : (
                <ItemCardMobile key={item.id} item={item} mode="search" />
              ),
            )}
          </div>
        </>
      )}
      {filteredItems.length > 0 && (
        <>
          <ArrowHeader2 className="self-start" title="Items" />
          <div
            className={`${cardType === 'small' ? 'grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8' : 'flex w-full flex-col gap-8'}`}
          >
            {filteredItems.map((item) =>
              cardType === 'large' ? (
                <ItemCard key={item.id} item={item} mode="search" />
              ) : (
                <ItemCardMobile key={item.id} item={item} mode="search" />
              ),
            )}
          </div>
        </>
      )}
      {filteredKeywords.length > 0 && (
        <div className="flex w-full flex-col gap-4">
          <h2 className="pl-4">Keywords</h2>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
            {filteredKeywords.map((keyword, index) => {
              return <KeywordCard key={index} keyword={keyword} mode="codex" />;
            })}
          </div>
        </div>
      )}
      {filteredPerks.length > 0 && (
        <div className="flex w-full flex-col gap-4">
          <h2 className="pl-4">Perks</h2>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
            {filteredPerks.map((perk, index) => {
              return <PerkCard key={index} perk={perk} mode="codex" />;
            })}
          </div>
        </div>
      )}
      {filteredActions.length > 0 && (
        <div className="flex w-full flex-col gap-4">
          <h2 className="pl-4">Actions</h2>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
            {filteredActions.map((action, index) => {
              return <ActionCard key={index} action={action} mode="codex" />;
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
                <ConditionCard key={index} condition={condition} mode="codex" />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodexSearch;
