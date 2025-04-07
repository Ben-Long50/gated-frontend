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
import Equipment from './components/Equipment';
import CodexSearch from './components/CodexSearch';
import ItemForm from './components/ItemForm';
import Items from './components/Items';
import Campaigns from './components/Campaigns';
import CampaignForm from './components/CampaignForm';
import Campaign from './components/Campaign';
import Session from './components/Session';
import Faction from './components/Faction';

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

        <Route path="campaigns">
          <Route path=":campaignId">
            <Route index element={<Campaign />} />
            <Route path="factions/:factionId" element={<Faction />} />
          </Route>
          <Route path=":campaignId/sessions/:sessionId" element={<Session />} />
          <Route path="participant" element={<Campaigns title="Player" />} />
          <Route path="owner" element={<Campaigns title="Owner" />} />
          <Route
            path="create"
            element={<CampaignForm title="Create" mode="create" />}
          />
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
            path=":characterId/equipment"
            element={<Equipment mode="equipment" />}
          />
          <Route
            path=":characterId/inventory/weapons/:weaponId/modify"
            element={<WeaponForm title="Modify" mode="modify" />}
          />
          <Route
            path=":characterId/inventory/armor"
            element={<Inventory category="armor" />}
          />
          <Route
            path=":characterId/inventory/armor/:armorId/modify"
            element={<ArmorForm title="Modify" mode="modify" />}
          />
          <Route
            path=":characterId/inventory/cybernetics"
            element={<Inventory category="cybernetics" />}
          />
          <Route
            path=":characterId/inventory/cybernetics/:cyberneticId/modify"
            element={<CyberneticForm title="Modify" mode="modify" />}
          />
          <Route
            path=":characterId/inventory/items"
            element={<Inventory category="items" />}
          />
          <Route
            path=":characterId/inventory/items/reusables/gadgets"
            element={<Inventory category="gadgets" />}
          />
          <Route
            path=":characterId/inventory/items/reusables/anomalies"
            element={<Inventory category="anomalies" />}
          />
          <Route
            path=":characterId/inventory/items/consumables/chemicalTherapy"
            element={<Inventory category="chemicalTherapy" />}
          />
          <Route
            path=":characterId/inventory/items/consumables/chemicalAssistance"
            element={<Inventory category="chemicalAssistance" />}
          />
          <Route
            path=":characterId/inventory/items/consumables/misc"
            element={<Inventory category="misc" />}
          />
          <Route
            path=":characterId/inventory/items/:itemId/modify"
            element={<ItemForm title="Modify" mode="modify" />}
          />
          <Route
            path=":characterId/inventory/items/:category/:subcategory/:itemId/modify"
            element={<ItemForm title="Modify" mode="modify" />}
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
            path=":characterId/inventory/vehicles/weapons/:weaponId/modify"
            element={<WeaponForm title="Modify" mode="modify" />}
          />
          <Route
            path=":characterId/inventory/vehicles/modifications"
            element={<Inventory category="vehicle modifications" />}
          />
          <Route
            path=":characterId/inventory/vehicles/:vehicleId/modify"
            element={<VehicleForm title="Modify" mode="modify" />}
          />
        </Route>

        <Route path="codex">
          <Route path="search" element={<CodexSearch />} />
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
                  mode="codex"
                  key="weapons"
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
                  mode="codex"
                  key="pistols"
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
                  mode="codex"
                  key="shotguns"
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
                  mode="codex"
                  key="smgs"
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
                  mode="codex"
                  key="rifles"
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
                  mode="codex"
                  key="heavy weapons"
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
                  mode="codex"
                  key="melee"
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
                  mode="codex"
                  key="explosives"
                />
              }
            />
            <Route
              path="create"
              element={
                <WeaponForm title="Create" mode="create" key="create weapon" />
              }
            />
            <Route
              path=":weaponId/update"
              element={
                <WeaponForm title="Update" mode="update" key="update weapon" />
              }
            />
          </Route>

          <Route path="armor">
            <Route
              index
              element={
                <Armor
                  title="All Armor"
                  fetchOptions={{ excludedKeywords: ['Cybernetic'] }}
                  mode="codex"
                  key="armor"
                />
              }
            />
            <Route
              path="basic"
              element={
                <Armor
                  title="Basic Armor"
                  fetchOptions={{
                    includedKeywords: ['Armor'],
                    excludedKeywords: ['Cybernetic'],
                  }}
                  mode="codex"
                  key="basic armor"
                />
              }
            />
            <Route
              path="power"
              element={
                <Armor
                  title="Power Armor"
                  fetchOptions={{
                    includedKeywords: ['Power'],
                    excludedKeywords: ['Cybernetic'],
                  }}
                  mode="codex"
                  key="power armor"
                />
              }
            />
            <Route
              path="create"
              element={
                <ArmorForm title="Create" mode="create" key="create armor" />
              }
            />
            <Route
              path=":armorId/update"
              element={
                <ArmorForm title="Update" mode="update" key="update armor" />
              }
            />
          </Route>

          <Route path="cybernetics">
            <Route
              index
              element={
                <Cybernetics
                  title="Cybernetics"
                  mode="codex"
                  key="cybernetics"
                />
              }
            />
            <Route
              path="create"
              element={
                <CyberneticForm
                  title="Create"
                  mode="create"
                  key="create cybernetics"
                />
              }
            />
            <Route
              path=":cyberneticId/update"
              element={
                <CyberneticForm
                  title="Update"
                  mode="update"
                  key="update cybernetics"
                />
              }
            />
          </Route>

          <Route path="vehicles">
            <Route
              index
              element={
                <Vehicles title="Vehicles" mode="codex" key="vehicles" />
              }
            />
            <Route
              path="weapons"
              element={
                <Weapons
                  title="Vehicle Weapons"
                  fetchOptions={{ includedKeywords: ['Vehicle'] }}
                  mode="codex"
                  key="vehicle weapons"
                />
              }
            />
            <Route
              path="weapons/:weaponId/update"
              element={
                <WeaponForm
                  title="Update"
                  mode="update"
                  key="update vehicle weapon"
                />
              }
            />
            <Route
              path="modifications"
              element={
                <VehicleMods
                  title="Vehicle Mods"
                  mode="codex"
                  key="modifications"
                />
              }
            />
            <Route
              path="create"
              element={
                <VehicleForm
                  title="Create"
                  mode="create"
                  key="create vehicle"
                />
              }
            />
            <Route
              path="modifications/create"
              element={
                <VehicleModForm
                  title="Create"
                  mode="create"
                  key="create modification"
                />
              }
            />
            <Route
              path=":vehicleId/update"
              element={
                <VehicleForm
                  title="Update"
                  mode="update"
                  key="update vehicle"
                />
              }
            />
            <Route
              path="modifications/:modId/update"
              element={
                <VehicleModForm
                  title="Update"
                  mode="update"
                  key="update modification"
                />
              }
            />
          </Route>
          <Route path="items">
            <Route
              index
              element={<Items title="All Items" mode="codex" key="items" />}
            />
            <Route
              path="reusables/gadgets"
              element={
                <Items
                  title="Gadgets"
                  mode="codex"
                  key="gadgets"
                  fetchOptions={{ includedKeywords: ['gadget'] }}
                />
              }
            />
            <Route
              path="reusables/anomalies"
              element={
                <Items
                  title="Anomalies"
                  mode="codex"
                  key="anomalies"
                  fetchOptions={{ includedKeywords: ['anomaly'] }}
                />
              }
            />
            <Route
              path="consumables/chemicalTherapy"
              element={
                <Items
                  title="Chemical Therapy"
                  mode="codex"
                  key="chemicalTherapy"
                  fetchOptions={{ includedKeywords: ['chemicalTherapy'] }}
                />
              }
            />
            <Route
              path="consumables/chemicalAssistance"
              element={
                <Items
                  title="Chemical Assistance"
                  mode="codex"
                  key="chemicalAssistance"
                  fetchOptions={{ includedKeywords: ['chemicalAssistance'] }}
                />
              }
            />
            <Route
              path="consumables/misc"
              element={
                <Items
                  title="Misc. Consumables"
                  mode="codex"
                  key="misc"
                  fetchOptions={{ includedKeywords: ['misc'] }}
                />
              }
            />
            <Route
              path="create"
              element={
                <ItemForm title="Create" mode="create" key="create item" />
              }
            />
            <Route
              path=":itemId/update"
              element={
                <ItemForm title="Update" mode="update" key="update item" />
              }
            />
          </Route>
          <Route path="perks">
            <Route index element={<Perks mode="codex" key="perks" />} />
            <Route
              path="create"
              element={<PerkForm mode="create" key="create perk" />}
            />
            <Route
              path=":perkId/update"
              element={<PerkForm mode="update" key="update perk" />}
            />
          </Route>

          <Route path="keywords">
            <Route index element={<Keywords mode="codex" key="keywords" />} />
            <Route
              path="create"
              element={<KeywordForm mode="create" key="create keyword" />}
            />
            <Route
              path=":keywordId/update"
              element={<KeywordForm mode="update" key="update keyword" />}
            />
          </Route>

          <Route path="actions">
            <Route index element={<Actions mode="codex" key="actions" />} />
            <Route
              path="create"
              element={<ActionForm mode="create" key="create action" />}
            />
            <Route
              path=":actionId/update"
              element={<ActionForm mode="update" key="update action" />}
            />
          </Route>

          <Route path="conditions">
            <Route
              index
              element={<Conditions mode="codex" key="conditions" />}
            />
            <Route
              path="create"
              element={<ConditionForm mode="create" key="create condition" />}
            />
            <Route
              path=":conditionId/update"
              element={<ConditionForm mode="update" key="update condition" />}
            />
          </Route>
        </Route>
      </Route>
    </Route>,
  ),
);

export default router;
