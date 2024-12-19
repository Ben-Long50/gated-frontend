import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { useContext } from 'react';
import Icon from '@mdi/react';
import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js';
import BtnRect from '../components/BtnRect';

const AuthLayout = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${theme} bg-secondary max-lg:auth-layout-small lg:auth-layout-large min-h-dvh w-dvw items-center justify-center bg-cover bg-center p-4 md:p-8`}
    >
      {/* <div className="absolute inset-0 bg-black opacity-70"></div> */}
      <div className="z-10 row-start-1 flex flex-col items-center justify-center text-center lg:col-start-2">
        <div className="flex gap-2">
          <h1 className="text-accent text-shadow font-logo text-7xl -text-shadow-x-4 text-shadow-blur-0 text-shadow-y-2 text-shadow-sky-500 md:text-9xl md:-text-shadow-x-6 md:text-shadow-y-4">
            Glam{' '}
          </h1>
          <p className="text-accent text-shadow self-end text-3xl font-semibold italic -text-shadow-x-2 text-shadow-y-1 text-shadow-sky-500 md:text-5xl md:-text-shadow-x-4 md:text-shadow-y-3">
            and the
          </p>
        </div>
        <h1 className="text-accent text-shadow text-center font-logo text-7xl -text-shadow-x-4 text-shadow-blur-0 text-shadow-y-2 text-shadow-sky-500 md:text-9xl md:-text-shadow-x-6 md:text-shadow-y-4">
          Electric Death
        </h1>
      </div>
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
