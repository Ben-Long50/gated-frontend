import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import {
  mdiCircle,
  mdiCircleOutline,
  mdiSquare,
  mdiSquareOutline,
} from '@mdi/js';
import Icon from '@mdi/react';
import { LayoutContext } from '../contexts/LayoutContext';
import ArrowHeader3 from './ArrowHeader3';
import { capitalCase } from 'change-case';

const AttributeCard = ({
  attribute,
  points,
  skills,
}: {
  attribute: string;
  points: number;
  skills: object;
}) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { mobile } = useContext(LayoutContext);

  return (
    <>
      <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-2 sm:gap-4">
        <ArrowHeader3 title={capitalCase(attribute)} />
        <div className="flex gap-2 sm:gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              {mobile ? (
                index < points ? (
                  <Icon key={index} path={mdiCircle} size={0.7} color="gold" />
                ) : (
                  <Icon
                    key={index}
                    path={mdiCircleOutline}
                    size={0.7}
                    color={accentPrimary}
                  />
                )
              ) : index < points ? (
                <Icon key={index} path={mdiSquare} size={1} color="gold" />
              ) : (
                <Icon
                  key={index}
                  path={mdiSquareOutline}
                  size={1}
                  color={accentPrimary}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 border-l-2 border-gray-400 border-opacity-50 pl-4">
        {Object.entries(skills).map(([skill, { points }]) => (
          <li
            className="flex w-full flex-wrap items-center justify-between gap-1"
            key={skill}
          >
            <h4>{capitalCase(skill)}</h4>
            <div className="flex gap-2 sm:gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  {mobile ? (
                    index < points ? (
                      <Icon
                        key={index}
                        className="text-primary"
                        path={mdiCircle}
                        size={0.7}
                      />
                    ) : (
                      <Icon
                        key={index}
                        className="text-tertiary"
                        path={mdiCircleOutline}
                        size={0.7}
                      />
                    )
                  ) : index < points ? (
                    <Icon
                      key={index}
                      path={mdiSquare}
                      size={1}
                      className="text-primary"
                    />
                  ) : (
                    <Icon
                      key={index}
                      path={mdiSquareOutline}
                      size={1}
                      className="text-tertiary"
                    />
                  )}
                </div>
              ))}
            </div>
          </li>
        ))}
      </div>
    </>
  );
};

export default AttributeCard;
