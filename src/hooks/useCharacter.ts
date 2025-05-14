import { useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import { Character } from 'src/types/character';
import useStats from './useStats';
import useAttributeTree from './useAttributeTree';
import useEquipment from './useEquipment';

const useCharacter = (character: Character) => {
  const { user } = useContext(AuthContext);

  const { stats } = useStats(
    character?.characterInventory,
    character?.attributes,
    character?.perks,
  );

  const { tree, emptyAttributeTree } = useAttributeTree(character?.attributes);

  const equipment = useEquipment(character?.characterInventory);

  const filterByPreferences = (character: Character) => {
    const characterOwner = character?.userId === user?.id;
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
        characterOwner || character?.preferences?.sex
          ? character?.sex.charAt(0).toUpperCase() + character?.sex.slice(1)
          : '???',
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
          ? tree
          : emptyAttributeTree,
      perks:
        characterOwner || character?.preferences?.perks
          ? character?.perks
          : null,
      equipment:
        characterOwner || character?.preferences?.equipment ? equipment : null,
    };
  };

  return filterByPreferences(character);
};

export default useCharacter;
