import { useContext, useRef } from 'react';
import Tag from './Tag';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import DieIcon from './icons/DieIcon';
import { Action } from 'src/types/action';
import ItemCardSmall from './ItemCardSmall';
import Icon from '@mdi/react';
import { mdiTriangleDown } from '@mdi/js';
import ActionStatBars from './ActionStatBars';
import { capitalCase } from 'change-case';
import ThemeContainer from './ThemeContainer';

const ActionCard = ({ action, mode }: { action: Action; mode?: string }) => {
  const { user } = useContext(AuthContext);

  const cardRef = useRef(null);

  const costLength = action?.costs ? Object.keys(action.costs).length : 0;

  const description = action.description.split(/\[stats\]/);

  const description1 = description[0];
  const description2 = description[1];

  return (
    <ItemCardSmall
      cardRef={cardRef}
      heading={
        <div
          className={`${action.characterInventoryId ? (action.active ? 'opacity-100' : 'opacity-30') : ''} flex w-full items-center justify-between gap-4 pr-2`}
        >
          <h3> {action?.name}</h3>
          {((mode === 'codex' && user?.role === 'ADMIN') ||
            (mode === 'codex' && user?.role === 'SUPERADMIN')) && (
            <Link to={`/glam/codex/actions/${action.id}/update`}>
              <button className="text-accent hover:underline">Edit</button>
            </Link>
          )}
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        {action?.roll && action?.roll.length > 0 && (
          <div className="flex flex-col gap-2">
            {action.roll.map((roll, index) => (
              <div key={index} className="flex items-center gap-4">
                <DieIcon className="text-secondary size-8" />
                <p className="font-semibold">
                  {roll.attribute ? capitalCase(roll.attribute) : undefined}
                </p>
                {roll.skill && (
                  <>
                    <Icon
                      className="text-secondary"
                      path={mdiTriangleDown}
                      size={0.35}
                      rotate={-90}
                    />
                    <p>{roll.skill ? capitalCase(roll.skill) : undefined}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        {costLength > 0 && (
          <div className="flex w-full flex-col justify-start gap-2">
            <p className="text-accent text-base tracking-widest">Costs</p>
            <div
              className={`${cardRef.current?.offsetWidth < 500 ? 'gap-2 px-2' : 'gap-4 px-4'} grid h-full w-full grow grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2 border-x-2 border-gray-400 border-opacity-50`}
            >
              <ActionStatBars
                stats={action.costs}
                cardWidth={cardRef.current?.offsetWidth}
              />
            </div>
          </div>
        )}
        <p>{description1}</p>
        {action.modifiers && (
          <div className="flex flex-col gap-4">
            {Object.entries(action.modifiers).map(([stat, value], index) => (
              <ThemeContainer
                key={index}
                borderColor="transparent"
                chamfer="small"
              >
                <div className="bg-tertiary flex w-full items-center justify-between p-3 px-4 clip-4">
                  <h4>{capitalCase(stat)}</h4>
                  <p
                    className={`${index !== 0 && 'ml-1'} ${value > 0 || typeof value === 'string' ? 'text-accent' : 'text-error'} mr-1 inline-block font-semibold`}
                  >
                    {value}
                  </p>
                </div>
              </ThemeContainer>
            ))}
          </div>
        )}
        {action.keywordModifiers.length > 0 &&
          action.keywordModifiers.map((keyword, index) => (
            <ItemCardSmall
              key={index}
              className={`${index !== action.keywordModifiers.length - 1 && 'mr-1'} bg-tertiary`}
              heading={<h4>{keyword.keyword.name}</h4>}
            >
              <p>{keyword.keyword.description}</p>
            </ItemCardSmall>
          ))}
        {description2 && <p>{description2}</p>}
      </div>
    </ItemCardSmall>
  );
};

export default ActionCard;
