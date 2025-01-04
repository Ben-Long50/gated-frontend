import App from './App';
import ErrorPage from './components/ErrorPage';
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import SigninForm from './components/SigninForm';
import SignupForm from './components/SignupForm';
import MainLayout from './layouts/MainLayout';
import CharacterSheet from './components/CharacterSheet';
import PerkForm from './components/PerkForm';
import CharacterForm from './components/CharacterForm';
import Perks from './components/Perks';
import CharacterUpdateForm from './components/CharacterUpdateForm';
import CharacterList from './components/CharacterList';
import KeywordForm from './components/KeywordForm';
import Keywords from './components/Keywords';
import WeaponForm from './components/WeaponForm';
import Weapons from './components/Weapons';
import ArmorForm from './components/ArmorForm';
import Armor from './components/Armor';
import CyberneticForm from './components/CyberneticForm';
import Cybernetics from './components/Cybernetics';
import ActionForm from './components/ActionForm';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route element={<AuthLayout />}>
        <Route index element={<Navigate to="signin" replace />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="signin" element={<SigninForm />} />
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route path="characters" element={<CharacterList />} />
        <Route path="characters/:characterId" element={<CharacterSheet />} />
        <Route path="characters/create" element={<CharacterForm />} />
        <Route
          path="characters/:characterId/update"
          element={<CharacterUpdateForm />}
        />
        <Route path="weapons" element={<Weapons />} />
        <Route path="weapons/create" element={<WeaponForm />} />
        <Route path="weapons/:weaponId/update" element={<WeaponForm />} />
        <Route path="armor" element={<Armor />} />
        <Route path="armor/create" element={<ArmorForm />} />
        <Route path="armor/:armorId/update" element={<ArmorForm />} />
        <Route path="cybernetics" element={<Cybernetics />} />
        <Route path="cybernetics/create" element={<CyberneticForm />} />
        <Route
          path="cybernetics/:cyberneticId/update"
          element={<CyberneticForm />}
        />
        <Route path="perks" element={<Perks />} />
        <Route path="perks/create" element={<PerkForm />} />
        <Route path="perks/:perkId/update" element={<PerkForm />} />
        <Route path="keywords" element={<Keywords />} />
        <Route path="keywords/create" element={<KeywordForm />} />
        <Route path="keywords/:keywordId/update" element={<KeywordForm />} />
        <Route path="actions/create" element={<ActionForm />} />
      </Route>
    </Route>,
  ),
);

export default router;
