import { useContext } from 'react';
import BtnNav from './BtnNav';
import { AuthContext } from '../contexts/AuthContext';
import LogoTitle from './LogoTitle';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="col-span-2 grid grid-cols-6 items-center gap-4 border-b border-yellow-300 px-4 py-2">
      <LogoTitle className="justify-self-start" />
      <BtnNav>Profile</BtnNav>
      <BtnNav>Account</BtnNav>
      <BtnNav>Codex</BtnNav>
      <BtnNav>Settings</BtnNav>
      <img
        className="size-12 justify-self-end rounded-full"
        src={user.profilePicture}
        alt="Account picture"
      />
    </nav>
  );
};

export default Navbar;
