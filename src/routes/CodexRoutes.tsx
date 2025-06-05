import { Route } from 'react-router-dom';
import ActionForm from 'src/components/ActionForm';
import Actions from 'src/components/Actions';
import BookEntry from 'src/components/BookEntry';
import BookEntryForm from 'src/components/BookEntryForm';
import BookManage from 'src/components/BookManage';
import CodexSearch from 'src/components/CodexSearch';
import ConditionForm from 'src/components/ConditionForm';
import Conditions from 'src/components/Conditions';
import ItemForm from 'src/components/ItemForm';
import ItemPageWrapper from 'src/components/ItemPageWrapper';
import Items from 'src/components/Items';
import KeywordForm from 'src/components/KeywordForm';
import Keywords from 'src/components/Keywords';
import PatchNotes from 'src/components/PatchNotes';
import PatchNoteForm from 'src/components/PatchNotesForm';
import PerkForm from 'src/components/PerkForm';
import Perks from 'src/components/Perks';

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
        <Route path=":itemId" element={<ItemPageWrapper />} />
        <Route path="create" element={<ItemForm key="create weapon" />} />
        <Route
          path=":itemId/update"
          element={<ItemForm key="update weapon" />}
        />
      </Route>
      <Route path="armors">
        <Route index element={<Items key="armors" />} />
        <Route path=":itemId" element={<ItemPageWrapper />} />
        <Route path="create" element={<ItemForm key="create armor" />} />
        <Route
          path=":itemId/update"
          element={<ItemForm key="update armor" />}
        />
      </Route>
      <Route path="augmentations">
        <Route index element={<Items key={window.location.search} />} />
        <Route path=":itemId" element={<ItemPageWrapper />} />
        <Route path="create" element={<ItemForm key="create cybernetics" />} />
        <Route
          path=":itemId/update"
          element={<ItemForm key="update cybernetics" />}
        />
      </Route>
      <Route path="vehicles">
        <Route index element={<Items key="vehicles" />} />
        <Route path=":itemId" element={<ItemPageWrapper />} />
        <Route
          path="weapons/:itemId/update"
          element={<ItemForm key="update vehicle weapon" />}
        />
        <Route path="create" element={<ItemForm key="create vehicle" />} />
        <Route
          path=":itemId/update"
          element={<ItemForm key="update vehicle" />}
        />
      </Route>
      <Route path="drones">
        <Route index element={<Items key="drones" />} />
        <Route path=":itemId" element={<ItemPageWrapper />} />
        <Route
          path="weapons/:itemId/update"
          element={<ItemForm key="update drone weapon" />}
        />
        <Route path="create" element={<ItemForm key="create drone" />} />
        <Route
          path=":itemId/update"
          element={<ItemForm key="update drone" />}
        />
      </Route>
      <Route path="modifications">
        <Route index element={<Items key="modifications" />} />
        <Route path=":itemId" element={<ItemPageWrapper />} />
        <Route path="create" element={<ItemForm key="create modification" />} />
        <Route
          path=":itemId/update"
          element={<ItemForm key="update modification" />}
        />
      </Route>
      <Route path="reusables">
        <Route index element={<Items key="reusables" />} />
        <Route path=":itemId" element={<ItemPageWrapper />} />
        <Route path="create" element={<ItemForm key="create reusable" />} />
        <Route
          path=":itemId/update"
          element={<ItemForm key="update reusable" />}
        />
      </Route>
      <Route path="consumables">
        <Route index element={<Items key="consumables" />} />
        <Route path=":itemId" element={<ItemPageWrapper />} />
        <Route path="create" element={<ItemForm key="create consumable" />} />
        <Route
          path=":itemId/update"
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
