import BlockIcon from './icons/BlockIcon';
import ItemCard from './ItemCard';
import { ArmorStats, ArmorWithKeywords } from 'src/types/armor';
import LightningIcon from './icons/LightningIcon';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useEditArmorPowerMutation from '../hooks/armorStatHooks/useEditArmorPowerMutation/useEditArmorPowerMutation';
import useEditArmorBlockMutation from '../hooks/armorStatHooks/useEditArmorBlockMutation/useEditArmorBlockMutation';
import BtnControl from './buttons/BtnControl';
import HullIcon from './icons/HullIcon';
import PowerIcon from './icons/PowerIcon';
import { useParams } from 'react-router-dom';
import ItemCardMobile from './ItemCardMobile';
import { ItemObject } from 'src/types/global';

const ArmorControls = ({
  armorId,
  stats,
}: {
  armorId: number;
  stats: ArmorStats;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { characterId } = useParams();

  const editArmorPower = useEditArmorPowerMutation(
    apiUrl,
    armorId,
    Number(characterId),
  );
  const editArmorBlock = useEditArmorBlockMutation(
    apiUrl,
    armorId,
    Number(characterId),
  );

  return (
    <div className="col-span-2 grid grid-cols-1 items-center justify-start gap-4 sm:grid-cols-2">
      {stats.currentBlock !== undefined && (
        <BtnControl
          title="Block"
          icon={<BlockIcon className="size-8 text-inherit" />}
          mutation={stats.currentBlock > 0 ? editArmorBlock : null}
          value={-1}
        />
      )}
      {stats.currentBlock !== undefined && stats.block !== undefined && (
        <BtnControl
          title="Repair"
          icon={<HullIcon className="size-8 text-inherit" />}
          mutation={stats.currentBlock < stats.block ? editArmorBlock : null}
          value={stats.block - stats.currentBlock}
        />
      )}
      {stats.currentPower !== undefined && (
        <BtnControl
          title="Activate"
          icon={<LightningIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower > 0 ? editArmorPower : null}
          value={-1}
        />
      )}
      {stats.currentPower !== undefined && stats.power !== undefined && (
        <BtnControl
          title="Use Power Cell"
          icon={<PowerIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower < stats.power ? editArmorPower : null}
          value={
            stats.power - stats.currentPower < 3
              ? stats.power - stats.currentPower
              : 3
          }
        />
      )}
    </div>
  );
};

const ArmorCard = ({
  armor,
  mode,
  ownerId,
  toggleFormLink,
}: {
  armor: ArmorWithKeywords;
  mode: string;
  ownerId?: number;
  toggleFormLink?: (item: ItemObject) => void;
}) => {
  const { user } = useContext(AuthContext);

  return (
    <ItemCard
      item={armor}
      category="armor"
      mode={mode}
      controls={
        ownerId === user?.id ? (
          <ArmorControls armorId={armor.id} stats={armor.stats} />
        ) : null
      }
      toggleFormLink={toggleFormLink}
    />
  );
};

export const ArmorCardMobile = ({
  armor,
  mode,
  ownerId,
  toggleFormLink,
}: {
  armor: ArmorWithKeywords;
  mode: string;
  ownerId?: number;
  toggleFormLink?: (item: ItemObject) => void;
}) => {
  const { user } = useContext(AuthContext);

  return (
    <ItemCardMobile
      item={armor}
      category="armor"
      mode={mode}
      controls={
        ownerId === user?.id ? (
          <ArmorControls armorId={armor.id} stats={armor.stats} />
        ) : null
      }
      toggleFormLink={toggleFormLink}
    />
  );
};

export default ArmorCard;
