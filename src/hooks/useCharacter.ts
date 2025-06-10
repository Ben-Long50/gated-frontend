import { useContext, useMemo } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import { Character } from 'src/types/character';
import useStats from './useStats';
import useAttributeTree from './useAttributeTree';
import useInventory from './useInventory';
import useCharacterQuery from './useCharacterQuery/useCharacterQuery';

const useCharacter = (characterId: number) => {
  const { user } = useContext(AuthContext);

  const {
    data: character,
    isLoading: characterLoading,
    isPending: characterPending,
  } = useCharacterQuery(characterId);

  const { emptyAttributeTree } = useAttributeTree();

  const {
    inventory,
    equipment,
    actions,
    isLoading: inventoryLoading,
    isPending: inventoryPending,
  } = useInventory(character?.characterInventory);

  const { stats } = useStats(
    equipment,
    actions,
    character?.attributes,
    character?.perks,
  );

  const filterByPreferences = (character: Character) => {
    const characterOwner =
      character?.userId === user?.id ||
      character?.campaign?.ownerId === user?.id;
    const characterStats = { ...character?.stats, ...stats };

    return {
      ...character,
      firstName:
        characterOwner || character?.preferences?.firstName
          ? character?.firstName
          : '???',
      lastName:
        characterOwner || character?.preferences?.lastName
          ? character?.lastName
          : '???',
      level:
        characterOwner || character?.preferences?.level
          ? character?.level
          : '??',
      profits:
        characterOwner || character?.preferences?.profits
          ? character?.profits
          : '???',
      height:
        characterOwner || character?.preferences?.height
          ? character?.height
          : '???',
      weight:
        characterOwner || character?.preferences?.weight
          ? character?.weight
          : '???',
      age:
        characterOwner || character?.preferences?.age ? character?.age : '???',
      sex:
        characterOwner || character?.preferences?.sex ? character?.sex : '???',
      picture:
        characterOwner || character?.preferences?.picture
          ? character?.picture
          : false,
      backstory:
        characterOwner || character?.preferences.backstory
          ? character?.backstory
          : { html: '<h1>?????</h1>' },
      firstTaste:
        characterOwner || character?.preferences.backstory
          ? character?.firstTaste
          : { html: '<h1>?????</h1>' },
      badMedicine:
        characterOwner || character?.preferences.backstory
          ? character?.badMedicine
          : { html: '<h1>?????</h1>' },
      stats: Object.fromEntries(
        Object.entries(characterStats).map(([stat, value]) => {
          if (characterOwner || character?.preferences?.stats) {
            return [stat, value];
          } else {
            return [stat, '??'];
          }
        }),
      ),
      attributes:
        characterOwner || character?.preferences?.attributes
          ? character.attributes
          : emptyAttributeTree,
      perks:
        characterOwner || character?.preferences?.perks
          ? character?.perks
          : null,
      equipment:
        characterOwner || character?.preferences?.equipment ? equipment : null,
      actions:
        characterOwner || character?.preferences?.equipment ? actions : null,
      inventory,
    };
  };

  const filteredCharacter = useMemo(
    () => filterByPreferences(character),
    [equipment, inventory, character, stats],
  );

  return {
    filteredCharacter,
    isLoading: characterLoading || inventoryLoading,
    isPending: characterPending || inventoryPending,
  };
};

export default useCharacter;
