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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route element={<AuthLayout />}>
        <Route index element={<Navigate to="signin" replace />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="signin" element={<SigninForm />} />
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route path="characters" element={<CharacterSheet />} />
        <Route path="characters/create" element={<CharacterForm />} />
        <Route
          path="characters/:characterId/update"
          element={<CharacterUpdateForm />}
        />
        <Route path="perks" element={<Perks />} />
        <Route path="perks/create" element={<PerkForm />} />
      </Route>
    </Route>,
  ),
);

export default router;
