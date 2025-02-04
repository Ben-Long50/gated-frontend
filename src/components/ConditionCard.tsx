import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Condition } from 'src/types/condition';
import ItemCardSmall from './ItemCardSmall';

const ConditionCard = ({
  condition,
  mode,
}: {
  condition: Condition;
  mode?: string;
}) => {
  const { user } = useContext(AuthContext);

  return (
    <ItemCardSmall
      heading={
        <div className="flex w-full items-center justify-between gap-4 pr-2">
          <h3> {condition.name}</h3>
          {((mode === 'codex' && user?.role === 'ADMIN') ||
            (mode === 'codex' && user?.role === 'SUPERADMIN')) && (
            <Link to={`/glam/codex/conditions/${condition.id}/update`}>
              <button className="text-accent hover:underline">Edit</button>
            </Link>
          )}
        </div>
      }
    >
      <p className="text-secondary">{condition.description}</p>
    </ItemCardSmall>
  );
};

export default ConditionCard;
