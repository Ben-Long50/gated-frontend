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
import Tag from './Tag';

const LinkedActionCard = ({
  action,
  cardWidth,
}: {
  action: Action;
  cardWidth: number;
}) => {
  const { accentPrimary } = useContext(ThemeContext);

  const costLength = action?.costs ? Object.keys(action.costs).length : 0;

  const modifiers = action.modifiers
    ? Object.entries(action.modifiers).map(
        ([stat, value]) => `${value} ${capitalCase(stat)}`,
      )
    : null;

  const description = action.description.split(/\[stats\]/);

  const description1 = description[0];
  const description2 = description[1];

  return (
    <ThemeContainer borderColor={accentPrimary} chamfer="medium">
      <div className="flex h-full grow flex-col items-start justify-start gap-4 p-4">
        <div className="flex w-full items-center justify-start gap-4">
          <ArrowHeader3 title={action?.name} />
          <p className="text-tertiary">
            ({action.actionType[0].toUpperCase() + action.actionType.slice(1)})
          </p>
          {action.duration?.unit && (
            <div className="ml-auto flex items-center gap-4">
              <StopwatchIcon className="text-secondary size-8" />
              <p>{action.duration?.value}</p>
              <p>
                {action.duration?.unit[0].toUpperCase() +
                  action.duration?.unit.slice(1)}
              </p>
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
                <p className="font-semibold">
                  {roll.attribute[0].toUpperCase() + roll.attribute.slice(1)}
                </p>
                <Icon
                  className="text-secondary"
                  path={mdiTriangleDown}
                  size={0.35}
                  rotate={-90}
                />
                <p>{roll.skill[0].toUpperCase() + roll.skill.slice(1)}</p>
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
        <p className="w-full">
          {description1}
          <span>
            {modifiers &&
              modifiers?.length > 0 &&
              modifiers.map((modifier, index) => (
                <p
                  className={`${index !== 0 && 'ml-1'} text-accent mr-1 inline-block font-semibold`}
                >
                  {modifier}
                </p>
              ))}
            {action.keywordModifiers.length > 0 &&
              action.keywordModifiers.map((keyword, index) => (
                <Tag
                  className={`${index !== action.keywordModifiers.length - 1 && 'mr-1'} ml-1 inline-block`}
                  keyword={keyword}
                />
              ))}
          </span>
          {description2}
        </p>
      </div>
    </ThemeContainer>
  );
};

export default LinkedActionCard;
