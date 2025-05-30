import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Modification } from 'src/types/vehicle';
import CartButton from './CartButton';
import ItemRarity from './ItemRarity';

import ItemCardSmall from './ItemCardSmall';

const ModCard = ({
  modification,
  mode,
}: {
  modification: Modification;
  mode?: string;
}) => {
  const { user } = useContext(AuthContext);

  return (
    <ItemCardSmall
      heading={
        <div className="flex w-full items-center justify-between gap-4 pr-2">
          <h3>{modification?.name}</h3>
          <div
            className="pointer-events-auto -my-2 flex items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4">
              <p>{modification?.price}p</p>
              {mode === 'codex' && (
                <CartButton
                  category="modifications"
                  itemId={modification?.id}
                />
              )}
            </div>
            {((mode === 'codex' && user?.role === 'ADMIN') ||
              (mode === 'codex' && user?.role === 'SUPERADMIN')) &&
              mode === 'codex' && (
                <Link
                  to={`/glam/codex/vehicles/modifications/${modification.id}/update`}
                >
                  <button className="text-accent hover:underline">Edit</button>
                </Link>
              )}
          </div>
        </div>
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-8">
        <p className="text-tertiary mr-auto">
          ({modification.modificationType})
        </p>
        <ItemRarity rarity={modification.rarity} grade={modification.grade} />
      </div>
      <p className="text-secondary">{modification.description}</p>
    </ItemCardSmall>
  );
};

export default ModCard;
