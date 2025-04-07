const Divider = ({ className }: { className?: string }) => {
  return (
    <hr
      className={`${className} w-full border border-yellow-300 border-opacity-50`}
    />
  );
};

export default Divider;
