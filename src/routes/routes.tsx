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
import ItemPageWrapper from '../components/ItemPageWrapper';
import AccountRoutes from './AccountRoutes';
import CampaignRoutes from './CampaignRoutes';
import CharacterRoutes from './CharacterRoutes';
import CodexRoutes from './CodexRoutes';

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
          <Route path="*" element={<ItemPageWrapper />} />
          <Route path="error">
            <Route index element={<ErrorReports />} />
          </Route>
          {AccountRoutes()}
          {CampaignRoutes()}
          {CharacterRoutes()}
          {CodexRoutes()}
        </Route>
      </Route>
      ,
    </>,
  ),
);

export default router;
