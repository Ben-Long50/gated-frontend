import { Link } from 'react-router-dom';
import BtnNav from './BtnNav';

const Sidebar = () => {
  return (
    <nav className="flex min-w-96 flex-col gap-4 border-r border-yellow-300 px-4 py-8">
      <Link to="/character">
        <BtnNav>Characters</BtnNav>
      </Link>
      <Link to="/perks">
        <BtnNav>Perks</BtnNav>
      </Link>
    </nav>
  );
};

export default Sidebar;
