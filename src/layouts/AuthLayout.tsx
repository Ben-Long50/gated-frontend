import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { useContext } from 'react';
import LogoTitle from '../components/LogoTitle';
import { motion } from 'motion/react';

const AuthLayout = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${theme} scrollbar-primary-2 relative flex h-full min-h-dvh w-dvw items-center justify-center overflow-y-auto p-4 sm:p-8`}
      style={{
        backgroundImage: `url('/nova_viridian.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#141417] to-transparent" />
      <LogoTitle className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8" />
      <motion.div
        className="z-20 flex h-full w-full max-w-[500px] flex-col items-center justify-center gap-6 overflow-visible border-yellow-300 border-opacity-50 bg-fixed sm:col-span-1"
        initial={{ translateY: '50%', opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0, 0.5, 0.2, 1.01] }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default AuthLayout;
