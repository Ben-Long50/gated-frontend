import { Route } from 'react-router-dom';
import AffiliationForm from 'src/components/AffiliationForm';
import Cart from 'src/components/Cart';
import CharacterAffiliations from 'src/components/CharacterAffiliations';
import CharacterForm from 'src/components/CharacterForm';
import CharacterList from 'src/components/CharacterList';
import CharacterSheet from 'src/components/CharacterSheet';
import CharacterUpdateForm from 'src/components/CharacterUpdateForm';
import Deployments from 'src/components/Deployments';
import Equipment from 'src/components/Equipment';
import Inventory from 'src/components/Inventory';
import ItemUpgradeForm from 'src/components/ItemUpgradeForm';
import ItemPageWrapper from 'src/components/ItemPageWrapper';
import Resume from 'src/components/Resume';
import ResumeForm from 'src/components/ResumeForm';
import InventoryModal from 'src/components/modals/InventoryModal';
import NpcPreferenceModal from 'src/components/modals/NpcPreferenceModal';
import PerkLinkModal from 'src/components/modals/PerkLinkModal';
import ItemUpgradeTutorialModal from 'src/components/modals/tutorials/ItemUpgradeTutorialModal';
import KeywordLinkModal from 'src/components/modals/KeywordLinkModal';
import CharacterModalRoutes from './CharacterModalRoutes';

const CharacterRoutes = () => {
  return (
    <Route path="characters">
      <Route path="" element={<CharacterList />}>
        {CharacterModalRoutes()}
      </Route>
      <Route path="create" element={<CharacterForm />}>
        <Route path="perks" element={<PerkLinkModal />} />
        <Route path="npcPreferences" element={<NpcPreferenceModal />} />
      </Route>
      <Route path=":characterId">
        <Route index element={<CharacterSheet />} />
        <Route path="update" element={<CharacterUpdateForm />}>
          <Route path="perks" element={<PerkLinkModal />} />
          <Route path="npcPreferences" element={<NpcPreferenceModal />} />
        </Route>
        <Route path="cart" element={<Cart />} />
        <Route path="resume" element={<Resume />} />
        <Route path="resume/update" element={<ResumeForm />} />
        <Route path="equipment" element={<Equipment />}>
          <Route path="inventory" element={<InventoryModal />} />
        </Route>
        <Route path="deployments" element={<Deployments />}>
          <Route path="inventory" element={<InventoryModal />} />
        </Route>
        <Route path="inventory">
          <Route path=":category">
            <Route index element={<Inventory />} />
            <Route path=":itemId" element={<ItemPageWrapper />} />
            <Route path=":itemId/upgrade" element={<ItemUpgradeForm />}>
              <Route path="traits" element={<KeywordLinkModal />} />
              <Route path="tutorial" element={<ItemUpgradeTutorialModal />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route
        path=":characterId/affiliations"
        element={<CharacterAffiliations />}
      />
      <Route
        path=":characterId/affiliations/create"
        element={<AffiliationForm title="Create" mode="create" />}
      />
      <Route
        path=":characterId/affiliations/:affiliationId/update"
        element={<AffiliationForm title="Update" mode="update" />}
      />
    </Route>
  );
};

export default CharacterRoutes;
