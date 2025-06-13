const LogoTitle = ({ className }: { className: string }) => {
  return (
    <div
      className={`${className} z-10 flex flex-col items-start justify-center text-center`}
    >
      <div className="mb-2 flex gap-4">
        <h1 className="text-accent text-shadow-color text-shadow text-center font-bonheur text-5xl text-shadow-x-1 text-shadow-y-1 lg:text-6xl">
          Glam
        </h1>
        <p className="text-accent text-shadow-color text-shadow self-end text-xl font-semibold italic text-shadow-x-1 text-shadow-y-1 lg:text-2xl">
          and the
        </p>
      </div>
      <h3 className="text-accent text-shadow-sky text-shadow-color text-shadow text-center font-zen text-3xl font-light italic text-shadow-x-1 text-shadow-y-1 lg:text-4xl">
        Electric Death
      </h3>
    </div>
  );
};

export default LogoTitle;
