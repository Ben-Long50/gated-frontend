import { useContext, useRef } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from 'src/contexts/ThemeContext';
import { capitalCase } from 'change-case';
import BtnIcon from './buttons/BtnIcon';
import { mdiSync } from '@mdi/js';
import Divider from './Divider';

const AccountPreferences = () => {
  const { accentPrimary, changeTheme, theme, changeAccent } =
    useContext(ThemeContext);

  const accentRef = useRef();

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-8">
      <h1>Account Preferences</h1>
      <ThemeContainer
        className="w-full"
        borderColor={accentPrimary}
        chamfer="medium"
      >
        <div className="flex flex-col p-8">
          <div className="flex w-full items-center justify-between">
            <h3>Theme</h3>
            <div className="flex items-center gap-4">
              <h4 className="text-tertiary">({capitalCase(theme)})</h4>
              <BtnIcon
                active={true}
                path={mdiSync}
                onClick={() => changeTheme(0)}
              />
            </div>
          </div>
          <Divider />
          <div className="flex w-full items-center justify-between">
            <h3>Theme Color</h3>
            <div className="flex items-center gap-4">
              <h4 className="text-tertiary">({accentPrimary})</h4>
              <label
                className="shadow-color size-10 cursor-pointer rounded-full shadow-md"
                style={{ backgroundColor: accentPrimary }}
                htmlFor="accentPicker"
                onClick={() => accentRef.current?.focus()}
              >
                <input
                  ref={accentRef}
                  className="size-0"
                  id="accentPicker"
                  name="accentPicker"
                  type="color"
                  value={accentPrimary}
                  onChange={(e) => changeAccent(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>
      </ThemeContainer>
    </div>
  );
};

export default AccountPreferences;
