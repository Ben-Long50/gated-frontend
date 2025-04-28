import { useQuery } from '@tanstack/react-query';
import getArmorById from './getArmorById';

const useArmorPieceQuery = (
  apiUrl: string,
  armorId: number,
  options: object,
) => {
  return useQuery({
    queryKey: ['armorPiece', armorId],
    queryFn: async () => await getArmorById(apiUrl, armorId),
    ...options,
  });
};

export default useArmorPieceQuery;
