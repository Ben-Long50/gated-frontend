const LogoTitle = (props) => {
  return (
    <div
      className={`${props.className} z-10 flex flex-col items-center justify-center text-center`}
    >
      <div className="-mb-1.5 flex gap-2">
        <h1 className="dark:text-accent text-shadow text-center font-logo text-6xl -text-shadow-x-1 text-shadow-blur-0 text-shadow-y-1 text-shadow-sky-400 sm:-text-shadow-x-4 sm:text-shadow-y-3 md:text-8xl">
          Glam
        </h1>
        <p className="dark:text-accent text-shadow self-end pb-1 text-2xl font-semibold italic -text-shadow-x-1 text-shadow-blur-0 text-shadow-y-1 text-shadow-sky-400 sm:-text-shadow-x-3 sm:text-shadow-y-2 md:pb-2 md:text-4xl md:-text-shadow-x-2 md:text-shadow-y-1">
          and the
        </p>
      </div>
      <h1 className="dark:text-accent text-shadow-sky text-shadow text-center font-logo text-6xl -text-shadow-x-1 text-shadow-blur-0 text-shadow-y-1 text-shadow-sky-400 sm:-text-shadow-x-4 sm:text-shadow-y-3 md:text-8xl">
        Electric Death
      </h1>
    </div>
  );
};

export default LogoTitle;
