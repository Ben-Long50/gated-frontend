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
import ErrorReport from './components/ErrorReport';
import BookManage from './components/BookManage';
import VehicleForm from './components/VehicleForm';
import Vehicles from './components/Vehicles';
import VehicleModForm from './components/VehicleModForm';
import VehicleMods from './components/VehicleMods';
import PatchNotes from './components/PatchNotes';
import PatchNoteForm from './components/PatchNotesForm';
import ErrorReports from './components/ErrorReports';
import ConditionForm from './components/ConditionForm';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<AuthLayout />}>
        <Route index element={<Navigate to="signin" replace />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="signin" element={<SigninForm />} />
      </Route>

      <Route path="error">
        <Route path="report" element={<ErrorReport />} />
      </Route>

      <Route path="glam" element={<MainLayout />} errorElement={<ErrorPage />}>
        <Route path="error">
          <Route index element={<ErrorReports />} />
        </Route>

        <Route path="characters">
          <Route index element={<CharacterList />} />
          <Route path="create" element={<CharacterForm />} />
          <Route path=":characterId" element={<CharacterSheet />} />
          <Route path=":characterId/update" element={<CharacterUpdateForm />} />
        </Route>

        <Route path="codex">
          <Route index element={<PatchNotes />} />
          <Route path="patchNotes">
            <Route path="create" element={<PatchNoteForm />} />
            <Route path=":patchNoteId/update" element={<PatchNoteForm />} />
          </Route>

          <Route path="book">
            <Route path=":bookEntryId" element={<BookEntry />} />
            <Route path=":bookEntryId/update" element={<BookEntryForm />} />
            <Route path="manage" element={<BookManage />} />
            <Route path="create" element={<BookEntryForm />} />
          </Route>
          <Route path="weapons">
            <Route index element={<Weapons title="All Weapons" />} />
            <Route
              path="pistols"
              element={
                <Weapons
                  title="Pistols"
                  keywordList={['Pistol', 'Heavy Pistol']}
                />
              }
            />
            <Route
              path="shotguns"
              element={
                <Weapons
                  title="Shotguns"
                  keywordList={['Shotgun', 'Heavy Shotgun']}
                />
              }
            />
            <Route
              path="smgs"
              element={
                <Weapons title="SMGs" keywordList={['SMG', 'Heavy SMG']} />
              }
            />
            <Route
              path="rifles"
              element={
                <Weapons
                  title="Rifles"
                  keywordList={['Rifle', 'Heavy Rifle']}
                />
              }
            />
            <Route
              path="heavyWeapons"
              element={
                <Weapons
                  title="Heavy Weapons"
                  keywordList={[
                    'HW',
                    'Heavy Pistol',
                    'Heavy Rifle',
                    'Heavy Shotgun',
                    'Heavy SMG',
                  ]}
                />
              }
            />
            <Route
              path="melee"
              element={
                <Weapons title="Melee Weapons" keywordList={['Melee']} />
              }
            />
            <Route
              path="explosives"
              element={
                <Weapons
                  title="Launchers and Explosives"
                  keywordList={['Grenade', 'Mine', 'Launcher']}
                />
              }
            />
            <Route path="create" element={<WeaponForm />} />
            <Route path=":weaponId/update" element={<WeaponForm />} />
          </Route>

          <Route path="armor">
            <Route index element={<Armor title="All Armor" />} />
            <Route
              path="basic"
              element={<Armor title="Basic Armor" keywordList={['Armor']} />}
            />
            <Route
              path="power"
              element={<Armor title="Power Armor" keywordList={['Power']} />}
            />
            <Route path="create" element={<ArmorForm />} />
            <Route path=":armorId/update" element={<ArmorForm />} />
          </Route>

          <Route path="cybernetics">
            <Route index element={<Cybernetics />} />
            <Route path="create" element={<CyberneticForm />} />
            <Route path=":cyberneticId/update" element={<CyberneticForm />} />
          </Route>

          <Route path="vehicles">
            <Route index element={<Vehicles />} />
            <Route
              path="weapons"
              element={
                <Weapons title="Vehicle Weapons" keywordList={['Vehicle']} />
              }
            />
            <Route path="weapons/:weaponId/update" element={<WeaponForm />} />
            <Route path="modifications" element={<VehicleMods />} />
            <Route path="create" element={<VehicleForm />} />
            <Route path="modifications/create" element={<VehicleModForm />} />
            <Route path=":vehicleId/update" element={<VehicleForm />} />
            <Route
              path="modifications/:modId/update"
              element={<VehicleModForm />}
            />
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

          <Route path="conditions">
            <Route index element={<Actions />} />
            <Route path="create" element={<ConditionForm />} />
            <Route path=":actionId/update" element={<ActionForm />} />
          </Route>
        </Route>
      </Route>
    </Route>,
  ),
);

export default router;
