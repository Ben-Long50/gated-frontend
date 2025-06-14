import { Route } from 'react-router-dom';
import ActionForm from 'src/components/ActionForm';
import Actions from 'src/components/Actions';
import BookEntry from 'src/components/BookEntry';
import BookEntryForm from 'src/components/BookEntryForm';
import BookManage from 'src/components/BookManage';
import CodexSearch from 'src/components/CodexSearch';
import ConditionForm from 'src/components/ConditionForm';
import Conditions from 'src/components/Conditions';
import ItemLinkModal from 'src/components/modals/ItemLinkModal';
import ItemForm from 'src/components/ItemForm';
import ItemPageWrapper from 'src/components/ItemPageWrapper';
import Items from 'src/components/Items';
import KeywordForm from 'src/components/KeywordForm';
import Keywords from 'src/components/Keywords';
import KeywordLinkModal from 'src/components/modals/KeywordLinkModal';
import ModifierModal from 'src/components/modals/ModifierModal';
import PatchNotes from 'src/components/PatchNotes';
import PatchNoteForm from 'src/components/PatchNotesForm';
import PerkForm from 'src/components/PerkForm';
import Perks from 'src/components/Perks';
import ActionLinkModal from 'src/components/modals/ActionLinkModal';
import DescriptionModal from 'src/components/modals/DescriptionModal';

const CodexTabRoutes = () => {
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
      <Route path="items">
        <Route path=":category">
          <Route path="" element={<Items />}>
            <Route
              path="conditions/:conditionId"
              element={<DescriptionModal />}
            />
            <Route path="traits/:traitId" element={<DescriptionModal />} />
          </Route>
          <Route path=":itemId" element={<ItemPageWrapper />}>
            <Route
              path="conditions/:conditionId"
              element={<DescriptionModal />}
            />
            <Route path="traits/:traitId" element={<DescriptionModal />} />
          </Route>
          <Route path="create" element={<ItemForm />}>
            <Route path="traits" element={<KeywordLinkModal />} />
            <Route path=":linkCategory" element={<ItemLinkModal />} />
            <Route path="actions" element={<ActionLinkModal />} />
          </Route>
          <Route path=":itemId/update" element={<ItemForm />}>
            <Route path="traits" element={<KeywordLinkModal />} />
            <Route path=":linkCategory" element={<ItemLinkModal />} />
            <Route path="actions" element={<ActionLinkModal />} />
          </Route>
        </Route>
      </Route>
      <Route path="perks">
        <Route index element={<Perks key="perks" />} />
        <Route path="create" element={<PerkForm key="create perk" />}>
          <Route path="modifiers" element={<ModifierModal />} />
        </Route>
        <Route path=":perkId/update" element={<PerkForm key="update perk" />}>
          <Route path="modifiers" element={<ModifierModal />} />
        </Route>
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
        <Route path="create" element={<ActionForm key="create action" />}>
          <Route path="traits" element={<KeywordLinkModal />} />
          <Route path="modifiers" element={<ModifierModal />} />
        </Route>
        <Route
          path=":actionId/update"
          element={<ActionForm key="update action" />}
        >
          <Route path="traits" element={<KeywordLinkModal />} />
          <Route path="modifiers" element={<ModifierModal />} />
        </Route>
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

export default CodexTabRoutes;
