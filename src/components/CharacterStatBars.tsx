import { useContext } from 'react';
import EquipIcon from './icons/EquipIcon';
import StatBar from './StatBar';
import { ThemeContext } from '../contexts/ThemeContext';
import HealthIcon from './icons/HealthIcon';
import SanityIcon from './icons/SanityIcon';
import CyberIcon from './icons/CyberIcon';
import useCurrentHealthMutation from '../hooks/useCurrentHealthMutation/useCurrentHealthMutation';
import { AuthContext } from '../contexts/AuthContext';
import useCurrentSanityMutation from '../hooks/useCurrentSanityMutation/useCurrentSanityMutation';
import useCharacterQuery from '../hooks/useCharacterQuery/useCharacterQuery';
import { CharacterStats } from 'src/types/character';

const CharacterStatBars = ({
  stats,
  cardWidth,
  characterId,
}: {
  stats: CharacterStats;
  cardWidth: number;
  characterId: number;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { statColorMap } = useContext(ThemeContext);

  const { data: character } = useCharacterQuery(apiUrl, Number(characterId));

  const editCurrentHealth = useCurrentHealthMutation(
    apiUrl,
    Number(characterId),
  );

  const editCurrentSanity = useCurrentSanityMutation(
    apiUrl,
    Number(characterId),
  );

  const handleCurrentHealth = (value: number) => {
    if (
      (value < 0 && character?.stats.currentHealth <= 0) ||
      (value > 0 && character?.stats.currentHealth === stats.maxHealth)
    )
      return;
    editCurrentHealth.mutate(value);
  };

  const handleCurrentSanity = (value: number) => {
    if (
      (value < 0 && character?.stats.currentSanity <= 0) ||
      (value > 0 && character?.stats.currentSanity === stats.maxSanity)
    )
      return;
    editCurrentSanity.mutate(value);
  };

  return (
    <>
      {stats.currentHealth !== undefined && (
        <StatBar
          title="Health"
          current={stats.currentHealth}
          total={stats.maxHealth}
          color={statColorMap['Health']}
          cardWidth={cardWidth}
          mutation={handleCurrentHealth}
          mode="adjustable"
        >
          <HealthIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.currentSanity !== undefined && (
        <StatBar
          title="Sanity"
          current={stats.currentSanity}
          total={stats.maxSanity}
          color={statColorMap['Sanity']}
          cardWidth={cardWidth}
          mutation={handleCurrentSanity}
          mode="adjustable"
        >
          <SanityIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.maxCyber !== undefined && (
        <StatBar
          title="Cyber"
          current={stats.cyber}
          total={stats.maxCyber}
          color={statColorMap['Cyber']}
          cardWidth={cardWidth}
        >
          <CyberIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.maxWeight !== undefined && (
        <StatBar
          title="Equip"
          current={stats.weight}
          total={stats.maxWeight}
          color={statColorMap['Equip']}
          cardWidth={cardWidth}
        >
          <EquipIcon className="text-secondary size-8" />
        </StatBar>
      )}
    </>
  );
};

export default CharacterStatBars;
