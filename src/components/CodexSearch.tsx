import { useForm } from '@tanstack/react-form';
import ThemeContainer from './ThemeContainer';
import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import SelectField from './SelectField';
import InputField from './InputField';
import useWeapons from '../hooks/useWeapons';
import WeaponCard, { WeaponCardMobile } from './WeaponCard';
import { WeaponWithKeywords } from 'src/types/weapon';
import useArmor from '../hooks/useArmor';
import { Keyword } from 'src/types/keyword';
import useCybernetics from '../hooks/useCybernetics';
import Loading from './Loading';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import { ArmorWithKeywords } from 'src/types/armor';
import ArmorCard, { ArmorCardMobile } from './ArmorCard';
import CyberneticCard, { CyberneticCardMobile } from './CyberneticCard';
import useKeywords from '../hooks/useKeywords';
import KeywordCard from './KeywordCard';
import VehicleCard, { VehicleCardMobile } from './VehicleCard';
import useVehicles from '../hooks/useVehicles';
import { Modification, VehicleWithWeapons } from 'src/types/vehicle';
import PerkCard from './PerkCard';
import usePerks from '../hooks/usePerks';
import { Perk } from 'src/types/perk';
import useModifications from '../hooks/useModifications';
import useActions from '../hooks/useActions';
import useConditions from '../hooks/useConditions';
import { Condition } from 'src/types/condition';
import { Action } from 'src/types/action';
import ActionCard from './ActionCard';
import ConditionCard from './ConditionCard';
import ModCard from './ModCard';
import ArrowHeader2 from './ArrowHeader2';
import InputSelectField from './InputSelectField';
import Icon from '@mdi/react';
import { mdiCropSquare, mdiGrid, mdiSync } from '@mdi/js';
import { LayoutContext } from '../contexts/LayoutContext';

const CodexSearch = () => {
  const { accentPrimary } = useContext(ThemeContext);
  const { mobile } = useContext(LayoutContext);

  const [nameQuery, setNameQuery] = useState<string | null>(null);
  const [descriptionQuery, setDescriptionQuery] = useState<string | null>(null);
  const [category, setCategory] = useState('');
  const [cardType, setCardType] = useState<'small' | 'large'>(() =>
    mobile ? 'small' : 'large',
  );

  const nameTimerRef = useRef<number | null>(null);
  const descriptionTimerRef = useRef<number | null>(null);

  const {
    filteredWeapons: weapons,
    filteredKeywords: weaponKeywords,
    isLoading: weaponsLoading,
    isPending: weaponsPending,
  } = useWeapons();

  const {
    filteredArmor: armor,
    filteredKeywords: armorKeywords,
    isLoading: armorLoading,
    isPending: armorPending,
  } = useArmor();

  const {
    filteredCybernetics: cybernetics,
    isLoading: cyberneticsLoading,
    isPending: cyberneticsPending,
  } = useCybernetics();

  const {
    filteredVehicles: vehicles,
    isLoading: vehiclesLoading,
    isPending: vehiclesPending,
  } = useVehicles();

  const {
    filteredMods: modifications,
    isLoading: modificationsLoading,
    isPending: modificationsPending,
  } = useModifications();

  const {
    filteredKeywords: keywords,
    isLoading: keywordsLoading,
    isPending: keywordsPending,
  } = useKeywords();

  const {
    filteredPerkTree: perks,
    isLoading: perksLoading,
    isPending: perksPending,
  } = usePerks();

  const {
    filteredActions: actions,
    isLoading: actionsLoading,
    isPending: actionsPending,
  } = useActions();

  const {
    filteredConditions: conditions,
    isLoading: conditionsLoading,
    isPending: conditionsPending,
  } = useConditions();

  const perkArray = Object.values(perks)
    .map((item) => Object.values(item).flat())
    .flat();

  const codex = useMemo(() => {
    const allItems = [
      ...weapons.map((weapon: WeaponWithKeywords) => ({
        type: 'weapon',
        item: weapon,
      })),
      ...armor.map((armor: ArmorWithKeywords) => ({
        type: 'armor',
        item: armor,
      })),
      ...cybernetics.map((cybernetic: CyberneticWithKeywords) => ({
        type: 'cybernetic',
        item: cybernetic,
      })),
      ...vehicles.map((vehicle: VehicleWithWeapons) => ({
        type: 'vehicle',
        item: vehicle,
      })),
      ...modifications.map((mod: Modification) => ({
        type: 'modification',
        item: mod,
      })),
      ...keywords.map((keyword: Keyword) => ({
        type: 'keyword',
        item: keyword,
      })),
      ...perkArray.map((perk: Perk) => ({
        type: 'perk',
        item: perk,
      })),
      ...actions.map((action: Action) => ({ type: 'action', item: action })),
      ...conditions.map((condition: Condition) => ({
        type: 'condition',
        item: condition,
      })),
    ];

    const nameFilter = nameQuery?.toLowerCase() ?? null;
    const descFilter = descriptionQuery?.toLowerCase() ?? null;
    const hasCategoryFilter = category !== '';

    return allItems.filter(({ item }) => {
      const nameMatch = item.name?.toLowerCase().includes(nameFilter);
      const descMatch = item.description?.toLowerCase().includes(descFilter);

      const categoryMatch =
        !hasCategoryFilter ||
        item.keywords?.some(
          (keyword: { keyword: Keyword }) => category === keyword.keyword?.name,
        );

      return nameMatch && descMatch && categoryMatch;
    });
  }, [
    weapons,
    armor,
    cybernetics,
    vehicles,
    modifications,
    keywords,
    perkArray,
    actions,
    conditions,
    nameQuery,
    descriptionQuery,
    category,
  ]);

  const keywordList = [weaponKeywords, armorKeywords].flat();

  const isLoading =
    weaponsLoading ||
    armorLoading ||
    cyberneticsLoading ||
    keywordsLoading ||
    vehiclesLoading ||
    modificationsLoading ||
    perksLoading ||
    actionsLoading ||
    conditionsLoading;
  const isPending =
    weaponsPending ||
    armorPending ||
    cyberneticsPending ||
    keywordsPending ||
    vehiclesPending ||
    modificationsPending ||
    perksPending ||
    actionsPending ||
    conditionsPending;

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

  if (isLoading || isPending) return <Loading />;

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
      <div
        className={`${cardType === 'small' ? 'grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8' : 'flex w-full flex-col gap-8'}`}
      >
        {codex.map((item) => {
          return item.type === 'weapon' ? (
            cardType === 'large' ? (
              <WeaponCard
                key={item.item.name + item.item.id}
                weapon={item.item}
                mode="codex"
              />
            ) : (
              <WeaponCardMobile
                key={item.item.name + item.item.id}
                weapon={item.item}
                mode="codex"
              />
            )
          ) : item.type === 'armor' ? (
            cardType === 'large' ? (
              <ArmorCard
                key={item.item.name + item.item.id}
                armor={item.item}
                mode={'codex'}
              />
            ) : (
              <ArmorCardMobile
                key={item.item.name + item.item.id}
                armor={item.item}
                mode={'codex'}
              />
            )
          ) : item.type === 'cybernetic' ? (
            cardType === 'large' ? (
              <CyberneticCard
                key={item.item.name + item.item.id}
                cybernetic={item.item}
                mode="codex"
              />
            ) : (
              <CyberneticCardMobile
                key={item.item.name + item.item.id}
                cybernetic={item.item}
                mode="codex"
              />
            )
          ) : (
            item.type === 'vehicle' &&
            (cardType === 'large' ? (
              <VehicleCard
                key={item.item.name + item.item.id}
                vehicle={item.item}
                mode="codex"
              />
            ) : (
              <VehicleCardMobile
                key={item.item.name + item.item.id}
                vehicle={item.item}
                mode="codex"
              />
            ))
          );
        })}
      </div>
      {codex.filter((item) => item.type === 'modification').length > 0 && (
        <div className="flex w-full flex-col gap-4">
          <h2 className="pl-4">Modifications</h2>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
            {codex.map((item, index) => {
              return (
                item.type === 'modification' && (
                  <ModCard key={index} modification={item.item} mode="codex" />
                )
              );
            })}
          </div>
        </div>
      )}
      {codex.filter((item) => item.type === 'keyword').length > 0 && (
        <div className="flex w-full flex-col gap-4">
          <h2 className="pl-4">Keywords</h2>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
            {codex.map((item, index) => {
              return (
                item.type === 'keyword' && (
                  <KeywordCard key={index} keyword={item.item} mode="codex" />
                )
              );
            })}
          </div>
        </div>
      )}
      {codex.filter((item) => item.type === 'perk').length > 0 && (
        <div className="flex w-full flex-col gap-4">
          <h2 className="pl-4">Perks</h2>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
            {codex.map((item, index) => {
              return (
                item.type === 'perk' && (
                  <PerkCard key={index} perk={item.item} mode="codex" />
                )
              );
            })}
          </div>
        </div>
      )}
      {codex.filter((item) => item.type === 'action').length > 0 && (
        <div className="flex w-full flex-col gap-4">
          <h2 className="pl-4">Actions</h2>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
            {codex.map((item, index) => {
              return (
                item.type === 'action' && (
                  <ActionCard key={index} action={item.item} mode="codex" />
                )
              );
            })}
          </div>
        </div>
      )}
      {codex.filter((item) => item.type === 'condition').length > 0 && (
        <div className="flex w-full flex-col gap-4">
          <h2 className="pl-4">Conditions</h2>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
            {codex.map((item, index) => {
              return (
                item.type === 'condition' && (
                  <ConditionCard
                    key={index}
                    condition={item.item}
                    mode="codex"
                  />
                )
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodexSearch;
