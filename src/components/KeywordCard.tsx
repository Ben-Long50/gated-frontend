import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import Tag from './Tag';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Keyword } from 'src/types/keyword';

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
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailHeight, setDetailHeight] = useState(1000);

  const detailRef = useRef(null);

  useEffect(() => {
    if (detailRef.current) {
      setDetailHeight(detailRef.current.offsetHeight);
    }
  }, [detailRef.current]);

  return (
    <div className="w-full rounded-br-4xl rounded-tl-4xl shadow-md shadow-zinc-950">
      <div
        className={`bg-secondary mb-auto w-full cursor-pointer p-4 clip-4`}
        onClick={async (e) => {
          e.preventDefault();
          setDetailsOpen(!detailsOpen);
        }}
      >
        <summary
          className={`text-primary flex w-full items-center justify-between`}
        >
          <div className="flex w-full items-center justify-between gap-4 pr-2">
            <h3> {keyword.name}</h3>
            <div
              className="pointer-events-auto -my-2 flex items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {children}
              {mode === 'codex' &&
                ((mode === 'codex' && user?.role === 'ADMIN') ||
                  (mode === 'codex' && user?.role === 'SUPERADMIN')) && (
                  <Link to={`/glam/codex/keywords/${keyword.id}/update`}>
                    <button className="text-accent hover:underline">
                      Edit
                    </button>
                  </Link>
                )}
            </div>
          </div>
          <span className={`timing shrink-0 ${detailsOpen && '-rotate-180'}`}>
            <Icon
              path={mdiChevronDown}
              size={1.1}
              className={`text-secondary`}
            ></Icon>
          </span>
        </summary>
        <div className="overflow-hidden">
          <div
            ref={detailRef}
            className="timing"
            style={
              detailsOpen
                ? {
                    marginTop: 0,
                  }
                : {
                    marginTop: -detailHeight - 4,
                  }
            }
          >
            <div className="flex py-4">
              <Tag className="mr-auto" label={keyword.keywordType} />
            </div>
            <p className="text-secondary">{keyword.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordCard;
