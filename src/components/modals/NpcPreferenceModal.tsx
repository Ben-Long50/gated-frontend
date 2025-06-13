import { capitalCase } from 'change-case';
import BtnRect from '../buttons/BtnRect';
import Divider from '../Divider';
import Modal from './Modal';
import { useNavigate, useOutletContext } from 'react-router-dom';
import useModalStore from 'src/stores/modalStore';
import ThemeContainer from '../ThemeContainer';
import { useContext } from 'react';
import { ThemeContext } from 'src/contexts/ThemeContext';
import ArrowHeader2 from '../ArrowHeader2';

const NpcPreferenceModal = () => {
  const { accentPrimary } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { form } = useOutletContext() || {};

  const backgroundPath = useModalStore((state) => state.backgroundPath);

  return (
    <Modal>
      <div className="grid h-full grid-rows-[1fr_auto] gap-8">
        <div
          className="relative flex w-full flex-col items-center gap-8"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h1>NPC Preferences</h1>
          <p className="text-tertiary border-l-2 border-gray-400 border-opacity-50 pl-4">
            Set your visibility preferences for this NPC. These options will
            determine how much of this NPC's information is viewable by players
            when interacting with them. If a box is checked, that means players
            can see that information.
          </p>
          <ThemeContainer
            className="w-full"
            borderColor={accentPrimary}
            chamfer="medium"
          >
            <div className="flex w-full flex-col gap-8 p-4 sm:p-8">
              <ArrowHeader2 title="Preferences" />
              <div className="flex w-full justify-between">
                <button
                  className="text-accent text-base hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.setFieldValue('preferences', () => {
                      const currentValues = form.getFieldValue('preferences');
                      return Object.fromEntries(
                        Object.entries(currentValues).map(([key, value]) => [
                          key,
                          true,
                        ]),
                      );
                    });
                  }}
                >
                  Check All
                </button>
                <button
                  className="text-accent text-base hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.setFieldValue('preferences', () => {
                      const currentValues = form.getFieldValue('preferences');
                      return Object.fromEntries(
                        Object.entries(currentValues).map(([key, value]) => [
                          key,
                          false,
                        ]),
                      );
                    });
                  }}
                >
                  Uncheck All
                </button>
              </div>
              <div className="flex w-full flex-col">
                <form.Subscribe selector={(state) => state.values.preferences}>
                  {(preferences) =>
                    Object.keys(preferences).map((key, index) => (
                      <form.Field key={key} name={`preferences.${key}`}>
                        {(field) => (
                          <>
                            <label
                              className="flex w-full items-center justify-between"
                              htmlFor={key}
                            >
                              <h3
                                className={`${field.state.value ? 'text-accent' : 'text-secondary'}`}
                              >
                                {capitalCase(key)}
                              </h3>
                              <input
                                id={key}
                                className="size-6"
                                name={key}
                                type="checkbox"
                                checked={field.state.value}
                                onChange={() => {
                                  field.handleChange(!field.state.value);
                                }}
                              />
                            </label>
                            {index < Object.keys(preferences).length - 1 && (
                              <Divider />
                            )}
                          </>
                        )}
                      </form.Field>
                    ))
                  }
                </form.Subscribe>
              </div>
            </div>
          </ThemeContainer>
        </div>
        <BtnRect
          type="button"
          ariaLabel="Confirm preferences"
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!backgroundPath) {
              navigate('..', { replace: true });
            } else {
              navigate(backgroundPath, { replace: true });
              navigate(-1);
            }
          }}
        >
          Close
        </BtnRect>
      </div>
    </Modal>
  );
};
export default NpcPreferenceModal;
