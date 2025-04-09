const ThemeBorder = ({
  className,
  borderColor,
  chamfer,
}: {
  className: string;
  borderColor: string;
  chamfer: string;
}) => {
  const chamferMap = { small: 'clip-3', medium: 'clip-5', large: 'clip-7' };

  return (
    <div
      className={`${className} ${chamferMap[chamfer]} absolute right-[2px] top-[2px] h-full w-full opacity-50`}
      style={{ backgroundColor: `${borderColor}` }}
    />
  );
};

export default ThemeBorder;
