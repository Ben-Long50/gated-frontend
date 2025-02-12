import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { useContext, useState } from 'react';
import LogoTitle from '../components/LogoTitle';
import { motion } from 'motion/react';

const AuthLayout = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${theme} grid h-dvh w-dvw grid-cols-[2fr_1fr_2fr] items-center gap-8 max-sm:p-4 sm:gap-20`}
      style={{
        backgroundImage: `url('/glam_city_4.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        className="col-span-3 flex h-dvh flex-col items-center justify-center gap-12 border-yellow-300 border-opacity-50 sm:col-span-1 sm:border-r sm:bg-zinc-900 sm:bg-opacity-70 sm:p-4 lg:p-8"
        initial={{ translateX: '-100%', opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={{ duration: 2, ease: [0, 0.5, 0.2, 1.01] }}
      >
        <LogoTitle className="col-start-2 row-start-1" />
        <Outlet />
      </motion.div>
    </div>
  );
};

export default AuthLayout;
