const LogoTitle = (props) => {
  return (
    <div
      className={`${props.className} z-10 flex flex-col items-center justify-center text-center`}
    >
      <div className="-mb-1.5 flex gap-2">
        <h1 className="text-accent text-shadow self-start font-logo text-xl -text-shadow-x-4 text-shadow-blur-0 text-shadow-y-2 text-shadow-sky-500 md:text-2xl md:-text-shadow-x-2 md:text-shadow-y-1">
          Glam{' '}
        </h1>
        <p className="text-accent text-shadow self-end font-semibold italic -text-shadow-x-2 text-shadow-y-1 text-shadow-sky-500 md:text-lg md:-text-shadow-x-2 md:text-shadow-y-1">
          and the
        </p>
      </div>
      <h1 className="text-accent text-shadow -mt-1.5 text-center font-logo text-xl -text-shadow-x-4 text-shadow-blur-0 text-shadow-y-2 text-shadow-sky-500 md:text-2xl md:-text-shadow-x-2 md:text-shadow-y-1">
        Electric Death
      </h1>
    </div>
  );
};

export default LogoTitle;
