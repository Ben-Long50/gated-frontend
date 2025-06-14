import App from '../App';
import ErrorPage from '../components/ErrorPage';
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import SigninForm from '../components/SigninForm';
import SignupForm from '../components/SignupForm';
import MainLayout from '../layouts/MainLayout';
import ErrorReport from '../components/ErrorReport';
import ErrorReports from '../components/ErrorReports';
import AccountTabRoutes from './AccountTabRoutes';
import CampaignTabRoutes from './CampaignTabRoutes';
import CharacterTabRoutes from './CharacterTabRoutes';
import CodexTabRoutes from './CodexTabRoutes';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route element={<AuthLayout />}>
          <Route index element={<Navigate to="signin" replace />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="signin" element={<SigninForm />} />
        </Route>
        <Route path="error">
          <Route path="report" element={<ErrorReport />} />
        </Route>
        <Route
          path="glam"
          element={<MainLayout />}
          errorElement={<ErrorPage />}
        >
          <Route path="error">
            <Route index element={<ErrorReports />} />
          </Route>
          {AccountTabRoutes()}
          {CampaignTabRoutes()}
          {CharacterTabRoutes()}
          {CodexTabRoutes()}
        </Route>
      </Route>
      ,
    </>,
  ),
);

export default router;
