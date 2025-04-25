const NavMenuMobile = (props) => {
  const height = (props.children.length || 1) * 60;

  return (
    <div
      className={`${!props.menuVisibility ? 'invisible opacity-0' : 'py-2 opacity-100'} timing bg-primary flex w-full flex-col items-start justify-items-end overflow-hidden px-2`}
      style={props.menuVisibility ? { maxHeight: height } : { maxHeight: 0 }}
    >
      {props.children}
    </div>
  );
};

export default NavMenuMobile;
