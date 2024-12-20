import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { useContext } from 'react';
import Icon from '@mdi/react';
import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js';
import BtnRect from '../components/BtnRect';
import LogoTitle from '../components/LogoTitle';

const AuthLayout = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${theme} bg-secondary max-lg:auth-layout-small lg:auth-layout-large min-h-dvh w-dvw items-center justify-center bg-cover bg-center p-4 md:p-8`}
    >
      {/* <div className="absolute inset-0 bg-black opacity-70"></div> */}
      <LogoTitle />
      <Outlet />
      <BtnRect
        className="z-10 flex items-center"
        hoverBg="bg-secondary"
        position="absolute left-2 top-2"
        aria-label="Change theme"
        onClick={changeTheme}
      >
        <Icon
          path={theme === 'light' ? mdiWeatherSunny : mdiWeatherNight}
          size={1.2}
        />
      </BtnRect>
    </div>
  );
};

export default AuthLayout;
