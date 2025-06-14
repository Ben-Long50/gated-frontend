import { Children, isValidElement, ReactNode } from 'react';
import useNavigationStore from 'src/stores/navbarStore';

const NavMenuMobile = ({ children }: { children: ReactNode }) => {
  const height =
    (Children.toArray(children).filter((child) => isValidElement(child))
      .length || 1) * 60;

  const navbar = useNavigationStore((state) => state.navbar);

  return (
    <div
      className={`${!navbar ? 'invisible opacity-0' : 'py-2 opacity-100'} timing bg-primary flex w-full flex-col items-start justify-items-end overflow-hidden px-2`}
      style={navbar ? { maxHeight: height } : { maxHeight: 0 }}
    >
      {children}
    </div>
  );
};

export default NavMenuMobile;
