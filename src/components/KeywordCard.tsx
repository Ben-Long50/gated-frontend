import { ReactNode, useContext } from 'react';
import Tag from './Tag';
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
        <div className="flex w-full items-center justify-between gap-4 pr-2">
          <h3> {keyword.name}</h3>
          <div
            className="pointer-events-auto -my-2 flex items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {mode === 'codex' &&
              ((mode === 'codex' && user?.role === 'ADMIN') ||
                (mode === 'codex' && user?.role === 'SUPERADMIN')) && (
                <Link to={`/glam/codex/keywords/${keyword.id}/update`}>
                  <button className="text-accent hover:underline">Edit</button>
                </Link>
              )}
          </div>
          <div className="-my-2" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      }
    >
      <div className="flex">
        <Tag className="mr-auto" label={keyword.keywordType} />
      </div>
      <p className="text-secondary">{keyword.description}</p>
    </ItemCardSmall>
  );
};

export default KeywordCard;
