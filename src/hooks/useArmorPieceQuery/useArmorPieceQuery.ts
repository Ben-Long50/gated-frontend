import { useQuery } from '@tanstack/react-query';
import getArmorById from './getArmorById';

const useArmorPieceQuery = (apiUrl: string, armorId?: string) => {
  return useQuery({
    queryKey: ['armorPiece', armorId],
    queryFn: async () => await getArmorById(apiUrl, armorId),
    throwOnError: false,
    enabled: !!armorId,
  });
};

export default useArmorPieceQuery;
