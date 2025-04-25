import ItemCard from './ItemCard';
import { VehicleWithWeapons } from 'src/types/vehicle';

import StatBars from './StatBars';
import ItemCardMobile from './ItemCardMobile';

const VehicleCard = ({
  vehicle,
  mode,
}: {
  vehicle: VehicleWithWeapons;
  mode: string;
}) => {
  return (
    <ItemCard item={vehicle} category="vehicles" mode={mode}>
      <StatBars stats={vehicle.stats} mode={mode} />
    </ItemCard>
  );
};

export const VehicleCardMobile = ({
  vehicle,
  mode,
}: {
  vehicle: VehicleWithWeapons;
  mode: string;
}) => {
  return (
    <ItemCardMobile item={vehicle} category="vehicles" mode={mode}>
      <StatBars stats={vehicle.stats} mode={mode} />
    </ItemCardMobile>
  );
};

export default VehicleCard;
