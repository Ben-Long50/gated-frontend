const NavMenuDesktop = (props) => {
  const height = (props.children.length || 1) * 60;

  return (
    <div
      className={`${!props.menuVisibility ? 'invisible opacity-0' : 'py-2 opacity-100'} timing bg-primary absolute right-0 top-0 flex w-full translate-y-[60px] flex-col items-start justify-items-end gap-2 overflow-hidden rounded px-2 shadow-md shadow-zinc-950`}
      style={props.menuVisibility ? { maxHeight: height } : { maxHeight: 0 }}
    >
      {props.children}
    </div>
  );
};

export default NavMenuDesktop;
