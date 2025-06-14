import { ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Keyword } from 'src/types/keyword';
import ItemCardSmall from './ItemCardSmall';

const KeywordCard = ({
  keyword,
  mode,
  children,
}: {
  keyword: Keyword;
  mode?: string;
  children?: ReactNode;
}) => {
  const { user } = useContext(AuthContext);

  return (
    <ItemCardSmall
      heading={
        <div className="flex w-full shrink items-center justify-between gap-2 pr-2">
          <h3 className="break-words">{keyword.name}</h3>
          <div
            className="pointer-events-auto -my-2 flex items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {((mode === 'codex' && user?.role === 'ADMIN') ||
              (mode === 'codex' && user?.role === 'SUPERADMIN')) && (
              <Link to={`/glam/codex/keywords/${keyword.id}/update`}>
                <button className="text-accent hover:underline">Edit</button>
              </Link>
            )}
          </div>
          {children && (
            <div
              className="-my-2 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          )}
        </div>
      }
    >
      <p className="text-secondary">{keyword.description}</p>
    </ItemCardSmall>
  );
};

export default KeywordCard;
