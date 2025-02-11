import { useContext, useMemo, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useCyberneticsQuery from './useCyberneticsQuery/useCyberneticsQuery';
import { Cybernetic, CyberneticWithKeywords } from 'src/types/cybernetic';
import { Weapon } from 'src/types/weapon';
import useKeywords from './useKeywords';
import { Keyword } from 'src/types/keyword';
import { Armor } from 'src/types/armor';
import useActions from './useActions';
import { Modifier } from 'src/types/modifier';
import { Action } from 'src/types/action';
import { FetchOptions } from 'src/types/fetchOptions';

const useCybernetics = (fetchOptions?: FetchOptions) => {
  const { apiUrl } = useContext(AuthContext);

  const keywords = useKeywords();

  const actions = useActions();

  const {
    data: cybernetics,
    isLoading,
    isPending,
  } = useCyberneticsQuery(apiUrl);

  const getWeaponsKeywords = (weapons: Weapon[]) => {
    if (!weapons || weapons.length === 0) return;
    return weapons?.map((weapon: Weapon) => {
      const keywordDetails = weapon.keywords.map((keyword) => {
        const details = keywords.filteredKeywords.find(
          (item: Keyword) => item.id === keyword.keywordId,
        );
        return { keyword: details, value: keyword.value };
      });
      return { ...weapon, keywords: keywordDetails };
    });
  };

  const getArmorKeywords = (armor: Armor[]) => {
    if (!armor || armor.length === 0) return;
    return armor?.map((armorSet: Armor) => {
      const keywordDetails = armorSet.keywords.map((keyword) => {
        const details = keywords.filteredKeywords.find(
          (item: Keyword) => item.id === keyword.keywordId,
        );
        return { keyword: details, value: keyword.value };
      });
      return { ...armorSet, keywords: keywordDetails };
    });
  };

  const getModifierActions = (modifiers: Modifier[]) => {
    if (!modifiers || modifiers.length === 0) return;
    return modifiers?.map((modifier: Modifier) => {
      if (modifier.type === 'Stat') return modifier;
      const actionDetails = actions.filteredActions.find(
        (item: Action) => item.id === Number(modifier.action),
      );
      return { ...modifier, action: actionDetails };
    });
  };

  const cyberneticsWithKeywords = useMemo(() => {
    if (!cybernetics || !keywords) return null;

    const list = fetchOptions?.itemList || cybernetics;

    if (list.length === 0) return [];

    return list?.map((cybernetic: Cybernetic) => {
      const keywordDetails = cybernetic.keywords?.map((keyword) => {
        const details = keywords.filteredKeywords.find(
          (item: Keyword) => item.id === keyword.keywordId,
        );
        return { keyword: details, value: keyword.value };
      });
      const integratedWeaopns = getWeaponsKeywords(cybernetic.weapons);
      const integratedArmor = getArmorKeywords(cybernetic.armor);
      const modifiers = getModifierActions(cybernetic.modifiers);

      return {
        ...cybernetic,
        keywords: keywordDetails,
        weapons: integratedWeaopns,
        armor: integratedArmor,
        modifiers,
      };
    });
  }, [fetchOptions, cybernetics, keywords]);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const filteredCybernetics = category
    ? cyberneticsWithKeywords
        ?.filter(
          (cybernetic: CyberneticWithKeywords) =>
            cybernetic.cyberneticType === category,
        )
        .filter((cybernetic: CyberneticWithKeywords) =>
          cybernetic.name.toLowerCase().includes(query.toLowerCase()),
        )
    : (cyberneticsWithKeywords?.filter((cybernetic: CyberneticWithKeywords) =>
        cybernetic.name.toLowerCase().includes(query.toLowerCase()),
      ) ?? []);

  const filterByQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  const filterByCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  const resetList = () => {
    setQuery('');
  };

  return {
    filteredCybernetics,
    filterByQuery,
    filterByCategory,
    resetList,
    isLoading,
    isPending,
    keywordsLoading: keywords.isLoading,
    keywordsPending: keywords.isPending,
  };
};

export default useCybernetics;
