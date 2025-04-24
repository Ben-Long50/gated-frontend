import { useForm } from '@tanstack/react-form';
import ThemeContainer from './ThemeContainer';
import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import SelectField from './SelectField';
import InputField from './InputField';
import useWeapons from '../hooks/useWeapons';
import WeaponCard from './WeaponCard';
import { WeaponWithKeywords } from 'src/types/weapon';
import useArmor from '../hooks/useArmor';
import { Keyword } from 'src/types/keyword';
import useCybernetics from '../hooks/useCybernetics';
import Loading from './Loading';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import { ArmorWithKeywords } from 'src/types/armor';
import ArmorCard from './ArmorCard';
import CyberneticCard from './CyberneticCard';
import useKeywords from '../hooks/useKeywords';
import KeywordCard from './KeywordCard';
import VehicleCard from './VehicleCard';
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

const CodexSearch = () => {
  const { accentPrimary } = useContext(ThemeContext);

  const [nameQuery, setNameQuery] = useState<string | null>(null);
  const [descriptionQuery, setDescriptionQuery] = useState<string | null>(null);
  const [category, setCategory] = useState('');

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
    <div className="flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8">
      <h1>Search Codex</h1>
      <ThemeContainer
        className={`ml-auto w-full`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <form className="flex w-full flex-col gap-4 p-4">
          <div className="flex w-full items-center justify-between">
            <ArrowHeader2 title="Filter Options" />
            <searchForm.Field name="keyword">
              {(field) => (
                <SelectField
                  field={field}
                  onChange={(e) => {
                    if (e.target.value === '') {
                      setCategory(field.state.value);
                      setNameQuery(null);
                      setDescriptionQuery(null);
                    } else {
                      setCategory(field.state.value);
                      setNameQuery('');
                      setDescriptionQuery('');
                    }
                  }}
                >
                  <option key="default" value="">
                    All keywords
                  </option>
                  {keywordList?.map((keyword) => {
                    return (
                      <option key={keyword} value={keyword}>
                        {keyword}
                      </option>
                    );
                  })}
                </SelectField>
              )}
            </searchForm.Field>
          </div>
          <searchForm.Field name="nameQuery">
            {(field) => (
              <InputField
                label="Search by name"
                field={field}
                onChange={() => {
                  filterByNameQuery(field.state.value);
                }}
              />
            )}
          </searchForm.Field>
          <searchForm.Field name="descriptionQuery">
            {(field) => (
              <InputField
                label="Search by description"
                field={field}
                onChange={() => {
                  filterByDescriptionQuery(field.state.value);
                }}
              />
            )}
          </searchForm.Field>
        </form>
      </ThemeContainer>

      {codex.map((item) => {
        return item.type === 'weapon' ? (
          <WeaponCard
            key={item.item.name + item.item.id}
            weapon={item.item}
            mode="codex"
          />
        ) : item.type === 'armor' ? (
          <ArmorCard
            key={item.item.name + item.item.id}
            armor={item.item}
            mode="codex"
          />
        ) : item.type === 'cybernetic' ? (
          <CyberneticCard
            key={item.item.name + item.item.id}
            cybernetic={item.item}
            mode="codex"
          />
        ) : (
          item.type === 'vehicle' && (
            <VehicleCard
              key={item.item.name + item.item.id}
              vehicle={item.item}
              mode="codex"
            />
          )
        );
      })}
      {codex.filter((item) => item.type === 'modification').length > 0 && (
        <div className="flex flex-col gap-4">
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
        <div className="flex flex-col gap-4">
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
        <div className="flex flex-col gap-4">
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
        <div className="flex flex-col gap-4">
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
        <div className="flex flex-col gap-4">
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
