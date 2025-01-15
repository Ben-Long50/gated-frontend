import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import {
  mdiCircle,
  mdiCircleOutline,
  mdiSquare,
  mdiSquareOutline,
  mdiTriangleSmallUp,
} from '@mdi/js';
import Icon from '@mdi/react';
import { LayoutContext } from '../contexts/LayoutContext';

const AttributeCard = (props) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);

  return (
    <>
      <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-2 sm:gap-4">
        <h2 className="text-2xl font-semibold tracking-widest">
          {props.attribute.charAt(0).toUpperCase() + props.attribute.slice(1)}{' '}
        </h2>
        <div className="flex gap-2 sm:gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                props.updatePoints(props.attribute, index + 1);
              }}
            >
              {layoutSize === 'small' || layoutSize === 'xsmall' ? (
                index < props.points ? (
                  <Icon key={index} path={mdiCircle} size={0.7} color="gold" />
                ) : (
                  <Icon
                    key={index}
                    path={mdiCircleOutline}
                    size={0.7}
                    color={accentPrimary}
                  />
                )
              ) : index < props.points ? (
                <Icon key={index} path={mdiSquare} size={1} color="gold" />
              ) : (
                <Icon
                  key={index}
                  path={mdiSquareOutline}
                  size={1}
                  color={accentPrimary}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {Object.entries(props.skills).map(([skill, { points }]) => (
          <li
            className="flex w-full flex-wrap items-center gap-1 pl-3"
            key={skill}
          >
            <Icon
              className="text-primary"
              path={mdiTriangleSmallUp}
              rotate={90}
              size={1}
            />
            <h3 className="grow pl-2 text-xl">
              {skill.charAt(0).toUpperCase() + skill.slice(1)}
            </h3>
            <div className="flex gap-2 sm:gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    props.updatePoints(props.attribute, index + 1, skill);
                  }}
                >
                  {layoutSize === 'small' || layoutSize === 'xsmall' ? (
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
                </button>
              ))}
            </div>
          </li>
        ))}
      </div>
    </>
  );
};

export default AttributeCard;
