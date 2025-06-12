import Icon from '@mdi/react';
import DieIcon from './icons/DieIcon';
import { mdiLinkBoxVariantOutline, mdiTriangleDown } from '@mdi/js';
import { Action } from 'src/types/action';
import StopwatchIcon from './icons/StopwatchIcon';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import ArrowHeader3 from './ArrowHeader3';
import ThemeContainer from './ThemeContainer';
import ActionStatBars from './ActionStatBars';
import { capitalCase } from 'change-case';
import { Link } from 'react-router-dom';
import ActionRadialMenu from './ActionRadialMenu';
import ItemCardSmall from './ItemCardSmall';

const LinkedActionCard = ({
  action,
  cardWidth,
}: {
  action: Action;
  cardWidth: number;
}) => {
  const { accentPrimary } = useContext(ThemeContext);

  const costLength = action?.costs ? Object.keys(action.costs).length : 0;

  const description = action.description.split(/\[stats\]/);

  const description1 = description[0];
  const description2 = description[1];

  return (
    <ThemeContainer borderColor={accentPrimary} chamfer="medium">
      {action.characterInventoryId && (
        <ActionRadialMenu action={action} itemId={action.itemLink.itemId} />
      )}
      <div
        className={`${action.characterInventoryId ? (action.active ? 'opacity-100' : 'opacity-30') : ''} flex flex-col items-start justify-start gap-4 p-4`}
      >
        <div className={`flex w-full items-center justify-start gap-4`}>
          <ArrowHeader3 title={action?.name} />
          <p className="text-tertiary">({capitalCase(action.actionType)})</p>
          {action.duration?.unit && (
            <div className="ml-auto flex items-center gap-4">
              <StopwatchIcon className="text-secondary size-8" />
              <p>{action.duration?.value}</p>
              <p>{capitalCase(action.duration.unit)}</p>
            </div>
          )}
          {action.baseActionId && (
            <Link
              className="timing group ml-auto flex items-center gap-4 py-2"
              to={`/glam/codex/actions`}
            >
              <Icon
                path={mdiLinkBoxVariantOutline}
                className="group-hover:text-accent timing text-tertiary size-8 shrink-0"
              />
            </Link>
          )}
        </div>
        {action?.roll && action?.roll.length > 0 && (
          <div className="flex flex-col gap-2">
            {action.roll.map((roll, index) => (
              <div key={index} className="flex items-center gap-4">
                <DieIcon className="text-secondary size-8" />
                <p className="font-semibold">{capitalCase(roll.attribute)}</p>
                <Icon
                  className="text-secondary"
                  path={mdiTriangleDown}
                  size={0.35}
                  rotate={-90}
                />
                <p>{capitalCase(roll.skill)}</p>
              </div>
            ))}
          </div>
        )}
        {costLength > 0 && (
          <div className="flex w-full flex-col justify-start gap-2">
            <p className="text-accent text-base tracking-widest">Costs</p>
            <div
              className={`${cardWidth < 500 ? 'gap-2 px-2' : 'gap-4 px-4'} grid h-full w-full grow grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2 border-x-2 border-gray-400 border-opacity-50`}
            >
              <ActionStatBars stats={action.costs} cardWidth={cardWidth} />
            </div>
          </div>
        )}
        <p>{description1}</p>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {action.modifiers &&
            Object.entries(action.modifiers).map(([stat, value], index) => (
              <ThemeContainer
                key={index}
                className="mb-auto"
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
          {action.keywordModifiers.length > 0 &&
            action.keywordModifiers.map((keyword, index) => (
              <ItemCardSmall
                key={index}
                className={`${index !== action.keywordModifiers.length - 1 && 'mr-1'} bg-tertiary p-3 px-4`}
                heading={<h4>{keyword.keyword.name}</h4>}
              >
                <p>{keyword.keyword.description}</p>
              </ItemCardSmall>
            ))}
        </div>
        {description2 && <p>{description2}</p>}
      </div>
    </ThemeContainer>
  );
};

export default LinkedActionCard;
