import ItemCard from './ItemCard';
import { VehicleWithWeapons } from 'src/types/vehicle';

import ItemCardMobile from './ItemCardMobile';

const VehicleCard = ({
  vehicle,
  mode,
}: {
  vehicle: VehicleWithWeapons;
  mode: string;
}) => {
  return <ItemCard item={vehicle} category="vehicles" mode={mode} />;
};

export const VehicleCardMobile = ({
  vehicle,
  mode,
}: {
  vehicle: VehicleWithWeapons;
  mode: string;
}) => {
  return <ItemCardMobile item={vehicle} category="vehicles" mode={mode} />;
};

export default VehicleCard;
