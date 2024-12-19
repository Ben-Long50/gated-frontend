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
import Test from './components/Test';
import CharacterSheet from './components/CharacterSheet';
import PerkForm from './components/PerkForm';
import PerkList from './components/PerkList';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route element={<AuthLayout />}>
        <Route index element={<Navigate to="signin" replace />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="signin" element={<SigninForm />} />
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route path="home" element={<Test />} />
        <Route path="character" element={<CharacterSheet />} />
        <Route path="perks/create" element={<PerkForm />} />
        <Route path="perks" element={<PerkList />} />
      </Route>
    </Route>,
  ),
);

export default router;
