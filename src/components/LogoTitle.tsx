const LogoTitle = ({ className }: { className: string }) => {
  return (
    <div
      className={`${className} z-10 flex flex-col items-center justify-center text-center`}
    >
      <div className="mb-1.5 flex">
        <h1 className="dark:text-accent font-bonheur text-shadow text-center text-8xl -text-shadow-x-1 text-shadow-blur-5 text-shadow-y-1 text-shadow-sky-400 sm:-text-shadow-x-4 sm:text-shadow-y-3 md:text-9xl">
          Glam
        </h1>
        <p className="dark:text-accent text-shadow self-end pb-1 text-3xl font-semibold italic -text-shadow-x-1 text-shadow-blur-5 text-shadow-y-1 text-shadow-sky-400 sm:-text-shadow-x-3 sm:text-shadow-y-2 md:text-4xl md:-text-shadow-x-2 md:text-shadow-y-1">
          and the
        </p>
      </div>
      <h1 className="dark:text-accent text-shadow-sky text-shadow text-center font-zen text-6xl font-light italic -text-shadow-x-1 text-shadow-blur-5 text-shadow-y-1 text-shadow-sky-400 sm:-text-shadow-x-4 sm:text-shadow-y-3 md:text-8xl">
        Electric Death
      </h1>
    </div>
  );
};

export default LogoTitle;
