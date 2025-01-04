import { useQuery } from '@tanstack/react-query';
import getArmorById from './getArmorById';

const useArmorPieceQuery = (apiUrl, authToken, armorId) => {
  return useQuery({
    queryKey: ['armorPiece', armorId],
    queryFn: async () => await getArmorById(apiUrl, authToken, armorId),
    throwOnError: false,
  });
};

export default useArmorPieceQuery;
