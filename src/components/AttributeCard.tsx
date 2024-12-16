import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import { mdiSquare, mdiSquareOutline, mdiTriangleSmallUp } from '@mdi/js';
import Icon from '@mdi/react';

const AttributeCard = (props) => {
  const { accentPrimary } = useContext(ThemeContext);

  return (
    <ThemeContainer
      chamfer="32"
      className="bg-primary p-6 clip-8"
      borderColor={accentPrimary}
    >
      <div className="mb-4 flex w-full items-center justify-between gap-4 pl-4">
        <h2 className="text-2xl font-semibold tracking-widest">
          {props.category.charAt(0).toUpperCase() + props.category.slice(1)}{' '}
        </h2>
        <div className="flex gap-4">
          {Array.from({ length: props.points }).map((_, index) => (
            <button
              key={index}
              onClick={() => props.handleAttributeDecrement(props.category)}
            >
              <Icon path={mdiSquare} size={1} color="gold" />
            </button>
          ))}
          {Array.from({ length: 4 - props.points }).map((_, index) => (
            <button
              key={index}
              onClick={() => props.handleAttributeIncrement(props.category)}
            >
              <Icon path={mdiSquareOutline} size={1} color="gold" />
            </button>
          ))}
        </div>
      </div>
      <ul className="flex flex-col gap-3">
        {Object.entries(props.skills).map(([skill, value]) => (
          <>
            <li className="flex w-full items-center pl-3" key={skill}>
              <Icon
                className="text-primary"
                path={mdiTriangleSmallUp}
                rotate={90}
                size={1}
              />
              <h3 className="mr-4 grow pl-2 text-xl">
                {skill.charAt(0).toUpperCase() + skill.slice(1)}
              </h3>{' '}
              <div className="flex gap-4">
                {Array.from({ length: value }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      props.handleSkillDecrement(props.category, skill)
                    }
                  >
                    <Icon path={mdiSquare} size={1} className="text-primary" />
                  </button>
                ))}
                {Array.from({ length: 4 - value }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      props.handleSkillIncrement(props.category, skill)
                    }
                  >
                    <Icon
                      path={mdiSquareOutline}
                      size={1}
                      className="text-tertiary"
                    />
                  </button>
                ))}
              </div>
            </li>
          </>
        ))}
      </ul>
    </ThemeContainer>
  );
};

export default AttributeCard;
