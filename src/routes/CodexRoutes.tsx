import { Route } from 'react-router-dom';
import ActionForm from 'src/components/ActionForm';
import Actions from 'src/components/Actions';
import Armor from 'src/components/Armor';
import ArmorForm from 'src/components/ArmorForm';
import BookEntry from 'src/components/BookEntry';
import BookEntryForm from 'src/components/BookEntryForm';
import BookManage from 'src/components/BookManage';
import CodexSearch from 'src/components/CodexSearch';
import ConditionForm from 'src/components/ConditionForm';
import Conditions from 'src/components/Conditions';
import CyberneticForm from 'src/components/CyberneticForm';
import DroneForm from 'src/components/DroneForm';
import ItemForm from 'src/components/ItemForm';
import ItemPageWrapper from 'src/components/ItemPageWrapper';
import Items from 'src/components/Items';
import KeywordForm from 'src/components/KeywordForm';
import Keywords from 'src/components/Keywords';
import ModificationForm from 'src/components/ModificationForm';
import PatchNotes from 'src/components/PatchNotes';
import PatchNoteForm from 'src/components/PatchNotesForm';
import PerkForm from 'src/components/PerkForm';
import Perks from 'src/components/Perks';
import VehicleForm from 'src/components/VehicleForm';
import WeaponForm from 'src/components/WeaponForm';

const CodexRoutes = () => {
  return (
    <Route path="codex">
      <Route path="search" element={<CodexSearch />} />
      <Route path="search/:category/:itemId" element={<ItemPageWrapper />} />
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
        <Route index element={<Items key="weapons" />} />
        <Route path=":weaponId" element={<ItemPageWrapper />} />
        <Route path="create" element={<WeaponForm key="create weapon" />} />
        <Route
          path=":weaponId/update"
          element={<WeaponForm key="update weapon" />}
        />
      </Route>
      <Route path="armors">
        <Route index element={<Items key="armors" />} />
        <Route path=":armorId" element={<ItemPageWrapper />} />
        <Route path="create" element={<ArmorForm key="create armor" />} />
        <Route
          path=":armorId/update"
          element={<ArmorForm key="update armor" />}
        />
      </Route>
      <Route path="augmentations">
        <Route index element={<Items key="augmentations" />} />
        <Route path=":cyberneticId" element={<ItemPageWrapper />} />
        <Route
          path="create"
          element={<CyberneticForm key="create cybernetics" />}
        />
        <Route
          path=":cyberneticId/update"
          element={<CyberneticForm key="update cybernetics" />}
        />
      </Route>
      <Route path="vehicles">
        <Route index element={<Items key="vehicles" />} />
        <Route path=":vehicleId" element={<ItemPageWrapper />} />
        <Route
          path="weapons/:weaponId/update"
          element={<WeaponForm key="update vehicle weapon" />}
        />
        <Route path="create" element={<VehicleForm key="create vehicle" />} />
        <Route
          path=":vehicleId/update"
          element={<VehicleForm key="update vehicle" />}
        />
      </Route>
      <Route path="drones">
        <Route index element={<Items key="drones" />} />
        <Route path=":droneId" element={<ItemPageWrapper />} />
        <Route
          path="weapons/:weaponId/update"
          element={<WeaponForm key="update drone weapon" />}
        />
        <Route path="create" element={<DroneForm key="create drone" />} />
        <Route
          path=":droneId/update"
          element={<DroneForm key="update drone" />}
        />
      </Route>
      <Route path="modifications">
        <Route index element={<Items key="modifications" />} />
        <Route
          path="create"
          element={<ModificationForm key="create modification" />}
        />
        <Route
          path=":modId/update"
          element={<ModificationForm key="update modification" />}
        />
      </Route>
      <Route path="reusables">
        <Route index element={<Items key="reusables" />} />
        <Route path="create" element={<ItemForm key="create reusable" />} />
        <Route
          path=":reusableId/update"
          element={<ItemForm key="update reusable" />}
        />
      </Route>
      <Route path="consumables">
        <Route index element={<Items key="consumables" />} />
        <Route path="create" element={<ItemForm key="create consumable" />} />
        <Route
          path=":consumableId/update"
          element={<ItemForm key="update consumable" />}
        />
      </Route>
      <Route path="perks">
        <Route index element={<Perks key="perks" />} />
        <Route path="create" element={<PerkForm key="create perk" />} />
        <Route path=":perkId/update" element={<PerkForm key="update perk" />} />
      </Route>
      <Route path="keywords">
        <Route index element={<Keywords key="keywords" />} />
        <Route path="create" element={<KeywordForm key="create keyword" />} />
        <Route
          path=":keywordId/update"
          element={<KeywordForm key="update keyword" />}
        />
      </Route>
      <Route path="actions">
        <Route index element={<Actions key="actions" />} />
        <Route path="create" element={<ActionForm key="create action" />} />
        <Route
          path=":actionId/update"
          element={<ActionForm key="update action" />}
        />
      </Route>
      <Route path="conditions">
        <Route index element={<Conditions key="conditions" />} />
        <Route
          path="create"
          element={<ConditionForm key="create condition" />}
        />
        <Route
          path=":conditionId/update"
          element={<ConditionForm key="update condition" />}
        />
      </Route>
    </Route>
  );
};

export default CodexRoutes;
