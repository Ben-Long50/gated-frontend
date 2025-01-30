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
import Conditions from './components/Conditions';
import Cart from './components/Cart';
import Inventory from './components/Inventory';

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
          <Route path=":characterId/cart" element={<Cart />} />
          <Route
            path=":characterId/inventory/weapons"
            element={<Inventory category="weapons" />}
          />
          <Route
            path=":characterId/inventory/weapons/:weaponId/modify"
            element={<WeaponForm title="Modify" />}
          />
          <Route
            path=":characterId/inventory/armor"
            element={<Inventory category="armor" />}
          />
          <Route
            path=":characterId/inventory/armor/:armorId/modify"
            element={<ArmorForm title="Modify" />}
          />
          <Route
            path=":characterId/inventory/cybernetics"
            element={<Inventory category="cybernetics" />}
          />
          <Route
            path=":characterId/inventory/cybernetics/:cyberneticId/modify"
            element={<CyberneticForm title="Modify" />}
          />
          <Route
            path=":characterId/inventory/vehicles"
            element={<Inventory category="vehicles" />}
          />
          <Route
            path=":characterId/inventory/vehicles/weapons"
            element={<Inventory category="vehicle weapons" />}
          />
          <Route
            path=":characterId/inventory/vehicles/modifications"
            element={<Inventory category="vehicle modifications" />}
          />
          <Route
            path=":characterId/inventory/vehicles/:vehicleId/modify"
            element={<VehicleForm title="Modify" />}
          />
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
            <Route
              index
              element={
                <Weapons
                  title="All Weapons"
                  fetchOptions={{
                    excludedKeywords: ['Vehicle', 'Cybernetic'],
                  }}
                />
              }
            />
            <Route
              path="pistols"
              element={
                <Weapons
                  title="Pistols"
                  fetchOptions={{
                    includedKeywords: ['Pistol', 'Heavy Pistol'],
                    excludedKeywords: ['Vehicle', 'Cybernetic'],
                  }}
                />
              }
            />
            <Route
              path="shotguns"
              element={
                <Weapons
                  title="Shotguns"
                  fetchOptions={{
                    includedKeywords: ['Shotgun', 'Heavy Shotgun'],
                    excludedKeywords: ['Vehicle', 'Cybernetic'],
                  }}
                />
              }
            />
            <Route
              path="smgs"
              element={
                <Weapons
                  title="SMGs"
                  fetchOptions={{
                    includedKeywords: ['SMG', 'Heavy SMG'],
                    excludedKeywords: ['Vehicle', 'Cybernetic'],
                  }}
                />
              }
            />
            <Route
              path="rifles"
              element={
                <Weapons
                  title="Rifles"
                  fetchOptions={{
                    includedKeywords: ['Rifle', 'Heavy Rifle'],
                    excludedKeywords: ['Vehicle', 'Cybernetic'],
                  }}
                />
              }
            />
            <Route
              path="heavyWeapons"
              element={
                <Weapons
                  title="Heavy Weapons"
                  fetchOptions={{
                    includedKeywords: [
                      'HW',
                      'Heavy Pistol',
                      'Heavy Rifle',
                      'Heavy Shotgun',
                      'Heavy SMG',
                    ],
                    excludedKeywords: ['Vehicle', 'Cybernetic'],
                  }}
                />
              }
            />
            <Route
              path="melee"
              element={
                <Weapons
                  title="Melee Weapons"
                  fetchOptions={{
                    includedKeywords: ['Melee'],
                    excludedKeywords: ['Vehicle', 'Cybernetic'],
                  }}
                />
              }
            />
            <Route
              path="explosives"
              element={
                <Weapons
                  title="Launchers and Explosives"
                  fetchOptions={{
                    includedKeywords: ['Grenade', 'Mine', 'Launcher'],
                    excludedKeywords: ['Vehicle', 'Cybernetic'],
                  }}
                />
              }
            />
            <Route path="create" element={<WeaponForm title="Create" />} />
            <Route
              path=":weaponId/update"
              element={<WeaponForm title="Update" />}
            />
          </Route>

          <Route path="armor">
            <Route index element={<Armor title="All Armor" />} />
            <Route
              path="basic"
              element={
                <Armor
                  title="Basic Armor"
                  fetchOptions={{ includedKeywords: ['Armor'] }}
                />
              }
            />
            <Route
              path="power"
              element={
                <Armor
                  title="Power Armor"
                  fetchOptions={{ includedKeywords: ['Power'] }}
                />
              }
            />
            <Route path="create" element={<ArmorForm title="Create" />} />
            <Route
              path=":armorId/update"
              element={<ArmorForm title="Update" />}
            />
          </Route>

          <Route path="cybernetics">
            <Route index element={<Cybernetics title="Cybernetics" />} />
            <Route path="create" element={<CyberneticForm title="Create" />} />
            <Route
              path=":cyberneticId/update"
              element={<CyberneticForm title="Update" />}
            />
          </Route>

          <Route path="vehicles">
            <Route index element={<Vehicles title="Vehicles" />} />
            <Route
              path="weapons"
              element={
                <Weapons
                  title="Vehicle Weapons"
                  fetchOptions={{ includedKeywords: ['Vehicle'] }}
                />
              }
            />
            <Route
              path="weapons/:weaponId/update"
              element={<WeaponForm title="Update" />}
            />
            <Route
              path="modifications"
              element={<VehicleMods title="Vehicle Mods" />}
            />
            <Route path="create" element={<VehicleForm title="Create" />} />
            <Route
              path="modifications/create"
              element={<VehicleModForm title="Create" />}
            />
            <Route
              path=":vehicleId/update"
              element={<VehicleForm title="Update" />}
            />
            <Route
              path="modifications/:modId/update"
              element={<VehicleModForm title="Update" />}
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
            <Route index element={<Conditions />} />
            <Route path="create" element={<ConditionForm />} />
            <Route path=":conditionId/update" element={<ConditionForm />} />
          </Route>
        </Route>
      </Route>
    </Route>,
  ),
);

export default router;
