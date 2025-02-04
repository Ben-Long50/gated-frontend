import { MouseEventHandler, ReactNode } from 'react';
import { motion } from 'motion/react';

const BtnControl = ({
  title,
  icon,
  onClick,
}: {
  title: string;
  icon: ReactNode;
  onClick: MouseEventHandler;
}) => {
  return (
    <motion.button
      whileHover={{
        backgroundColor: 'rgb(39 39 42)',
        color: 'rgb(253 224 71)',
      }}
      className="flex items-center gap-4 rounded-md border border-yellow-300 border-opacity-50 px-2 py-1"
      onClick={onClick}
    >
      {icon}
      <p className="text-inherit">{title}</p>
    </motion.button>
  );
};

export default BtnControl;
