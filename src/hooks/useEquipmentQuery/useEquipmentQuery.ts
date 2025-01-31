import { useQuery } from '@tanstack/react-query';
import getEquippedItems from './getEquippedItems';

const useEquipmentQuery = (apiUrl: string, characterId?: string) => {
  return useQuery({
    queryKey: ['activeCharacter', 'equipment', characterId],
    queryFn: async () => await getEquippedItems(apiUrl, characterId),
    // enabled: !!characterId,
  });
};

export default useEquipmentQuery;
