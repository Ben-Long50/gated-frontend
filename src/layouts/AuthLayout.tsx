import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { useContext } from 'react';
import Icon from '@mdi/react';
import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js';
import LogoTitle from '../components/LogoTitle';
import ThemeContainer from '../components/ThemeContainer';

const AuthLayout = () => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const { accentPrimary } = useContext(ThemeContext);

  return (
    <div
      className={`${theme} auth-layout-small min-h-dvh w-dvw items-center gap-8 p-4 sm:gap-20 md:p-8`}
    >
      <LogoTitle className="col-start-2 row-start-1" />
      <Outlet />
      <div className="absolute left-2 top-2">
        {/* <ThemeContainer chamfer="8" borderColor={accentPrimary}>
          <button
            className="bg-secondary text-secondary hover:text-accent timing z-10 flex items-center p-2 clip-2"
            aria-label="Change theme"
            onClick={changeTheme}
          >
            <Icon
              path={theme === 'light' ? mdiWeatherSunny : mdiWeatherNight}
              size={1.2}
            />
          </button>
        </ThemeContainer> */}
      </div>
    </div>
  );
};

export default AuthLayout;
