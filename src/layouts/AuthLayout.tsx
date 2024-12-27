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
      className={`${theme} bg-secondary max-lg:auth-layout-small lg:auth-layout-large min-h-dvh w-dvw items-center bg-cover bg-center p-4 md:p-8`}
    >
      {/* <div className="absolute inset-0 bg-black opacity-70"></div> */}
      <LogoTitle className="col-start-2 row-start-1" />
      <Outlet />
      <div className="absolute left-2 top-2">
        <ThemeContainer chamfer="8" borderColor={accentPrimary}>
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
        </ThemeContainer>
      </div>
    </div>
  );
};

export default AuthLayout;
