const Tag = (props) => {
  return (
    <>
      <div
        className={`${props.className} bg-primary relative rounded border border-yellow-300 border-opacity-50 px-2 text-base`}
        onClick={(e) => {
          e.stopPropagation();
          props.setToolTip(props.label);
        }}
      >
        <p className="text-base">{props.label}</p>
      </div>

      <div
        className={`${props.toolTip === props.label ? 'visible opacity-100' : 'invisible opacity-0'} bg-secondary timing scrollbar-secondary absolute right-0 top-0 z-10 max-h-full w-1/2 min-w-72 overflow-y-auto rounded-md p-3 shadow-md shadow-zinc-950`}
      >
        <p className="text-secondary text-base">{props.description}</p>
      </div>
    </>
  );
};

export default Tag;
