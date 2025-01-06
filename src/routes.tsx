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
import BookEntry from './components/BookEntry';
import BookEntryForm from './components/BookEntryForm';
import Actions from './components/Actions';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route element={<AuthLayout />}>
        <Route index element={<Navigate to="signin" replace />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="signin" element={<SigninForm />} />
      </Route>

      <Route path="glam" element={<MainLayout />}>
        <Route path="characters">
          <Route index element={<CharacterList />} />
          <Route path="create" element={<CharacterForm />} />
          <Route path=":characterId" element={<CharacterSheet />} />
          <Route path=":characterId/update" element={<CharacterUpdateForm />} />
        </Route>

        <Route path="codex">
          <Route path="book">
            <Route path=":bookEntryTitle" element={<BookEntry />} />
            <Route path=":bookEntryTitle/update" element={<BookEntryForm />} />
            <Route path="create" element={<BookEntryForm />} />
          </Route>
          <Route path="weapons">
            <Route index element={<Weapons />} />
            <Route path="create" element={<WeaponForm />} />
            <Route path=":weaponId/update" element={<WeaponForm />} />
          </Route>

          <Route path="armor">
            <Route index element={<Armor />} />
            <Route path="create" element={<ArmorForm />} />
            <Route path=":armorId/update" element={<ArmorForm />} />
          </Route>

          <Route path="cybernetics">
            <Route index element={<Cybernetics />} />
            <Route path="create" element={<CyberneticForm />} />
            <Route path=":cyberneticId/update" element={<CyberneticForm />} />
          </Route>

          <Route path="perks">
            <Route index element={<Perks />} />
            <Route path="create" element={<PerkForm />} />
            <Route path=":perkId/update" element={<PerkForm />} />
          </Route>

          <Route path="keywords">
            <Route index element={<Keywords />} />
            <Route path="create" element={<KeywordForm />} />
            <Route path=":keywordId/update" element={<KeywordForm />} />
          </Route>
          <Route path="actions">
            <Route index element={<Actions />} />
            <Route path="create" element={<ActionForm />} />
            <Route path=":actionId/update" element={<ActionForm />} />
          </Route>
        </Route>
      </Route>
    </Route>,
  ),
);

export default router;
