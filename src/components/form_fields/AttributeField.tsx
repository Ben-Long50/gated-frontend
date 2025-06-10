import { capitalCase } from 'change-case';
import ArrowHeader3 from '../ArrowHeader3';
import Icon from '@mdi/react';
import {
  mdiCircle,
  mdiCircleOutline,
  mdiSquare,
  mdiSquareOutline,
} from '@mdi/js';
import { useContext } from 'react';
import { LayoutContext } from 'src/contexts/LayoutContext';
import { ThemeContext } from 'src/contexts/ThemeContext';
import { FormApi } from '@tanstack/react-form';

const AttributeField = ({ form }: { form: FormApi }) => {
  const { mobile } = useContext(LayoutContext);
  const { accentPrimary } = useContext(ThemeContext);

  return (
    <form.Field name="attributes">
      {(field) => (
        <div className="flex w-full grow flex-col gap-6 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-10">
          {Object.keys(field.state.value)
            .sort((a, b) => a.localeCompare(b))
            .map((attribute) => (
              <form.Field key={attribute} name={`attributes[${attribute}]`}>
                {(subfield) => (
                  <div className="flex flex-col gap-4">
                    <div className="flex w-full items-center justify-between gap-8">
                      <ArrowHeader3 title={capitalCase(attribute)} />
                      <div className="flex gap-2 sm:gap-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.preventDefault();
                              subfield.handleChange({
                                ...subfield.state.value,
                                points:
                                  index === 0 &&
                                  subfield.state.value.points === 1
                                    ? 0
                                    : index + 1,
                              });
                            }}
                          >
                            {mobile ? (
                              index < subfield.state.value.points ? (
                                <Icon
                                  key={index}
                                  path={mdiCircle}
                                  size={0.7}
                                  color={accentPrimary}
                                />
                              ) : (
                                <Icon
                                  key={index}
                                  path={mdiCircleOutline}
                                  size={0.7}
                                  color={accentPrimary}
                                />
                              )
                            ) : index < subfield.state.value.points ? (
                              <Icon
                                key={index}
                                path={mdiSquare}
                                size={1}
                                color={accentPrimary}
                              />
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
                    <div>
                      <div className="flex flex-col gap-2 border-l-2 border-gray-400 border-opacity-50 pl-4">
                        {Object.keys(subfield.state.value.skills)
                          .sort((a, b) => a.localeCompare(b))
                          .map((skill) => (
                            <div
                              key={skill}
                              className="flex items-center justify-between gap-4"
                            >
                              <h4>{capitalCase(skill)}</h4>
                              <form.Field
                                name={`attributes[${attribute}].skills[${skill}].points`}
                              >
                                {(subSubfield) => (
                                  <div className="flex gap-2 sm:gap-4">
                                    {Array.from({ length: 4 }).map(
                                      (_, index) => (
                                        <button
                                          key={index}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            subSubfield.handleChange(
                                              index === 0 &&
                                                subSubfield.state.value === 1
                                                ? 0
                                                : index + 1,
                                            );
                                          }}
                                        >
                                          {mobile ? (
                                            index < subSubfield.state.value ? (
                                              <Icon
                                                className="text-primary"
                                                key={index}
                                                path={mdiCircle}
                                                size={0.7}
                                              />
                                            ) : (
                                              <Icon
                                                className="text-tertiary"
                                                key={index}
                                                path={mdiCircleOutline}
                                                size={0.7}
                                              />
                                            )
                                          ) : index <
                                            subSubfield.state.value ? (
                                            <Icon
                                              className="text-primary"
                                              key={index}
                                              path={mdiSquare}
                                              size={1}
                                            />
                                          ) : (
                                            <Icon
                                              className="text-tertiary"
                                              key={index}
                                              path={mdiSquareOutline}
                                              size={1}
                                            />
                                          )}
                                        </button>
                                      ),
                                    )}
                                  </div>
                                )}
                              </form.Field>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </form.Field>
            ))}
        </div>
      )}
    </form.Field>
  );
};

export default AttributeField;
