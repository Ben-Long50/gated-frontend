import { Route } from 'react-router-dom';
import AffiliationForm from 'src/components/AffiliationForm';
import Campaign from 'src/components/Campaign';
import CampaignCharacterList from 'src/components/CampaignCharacterList';
import CampaignForm from 'src/components/CampaignForm';
import Campaigns from 'src/components/Campaigns';
import CharacterSheet from 'src/components/CharacterSheet';
import CharacterUpdateForm from 'src/components/CharacterUpdateForm';
import Equipment from 'src/components/Equipment';
import Faction from 'src/components/Faction';
import FactionForm from 'src/components/FactionForm';
import Resume from 'src/components/Resume';
import RollSimulator from 'src/components/RollSimulator';
import SessionRoutes from './SessionRoutes';
import ItemPageWrapper from 'src/components/ItemPageWrapper';
import Deployments from 'src/components/Deployments';
import ResumeForm from 'src/components/ResumeForm';
import { CampaignSocketProvider } from 'src/contexts/CampaignSocketContext';
import CampaignAffiliations from 'src/components/CampaignAffiliations';
import RollModal from 'src/components/modals/RollModal';
import CharacterModalRoutes from './CharacterModalRoutes';
import PerkLinkModal from 'src/components/modals/PerkLinkModal';
import NpcPreferenceModal from 'src/components/modals/NpcPreferenceModal';
import Cart from 'src/components/Cart';
import InventoryModal from 'src/components/modals/InventoryModal';
import Inventory from 'src/components/Inventory';
import ItemUpgradeForm from 'src/components/ItemUpgradeForm';
import KeywordLinkModal from 'src/components/modals/KeywordLinkModal';
import ItemUpgradeTutorialModal from 'src/components/modals/tutorials/ItemUpgradeTutorialModal';

const CampaignRoutes = () => {
  return (
    <Route path="campaigns">
      <Route index element={<Campaigns />} />
      <Route path=":campaignId" element={<CampaignSocketProvider />}>
        <Route index element={<Campaign />} />
        <Route
          path="update"
          element={<CampaignForm title="Update" mode="update" />}
        />
        <Route path="factions/:factionId">
          <Route index element={<Faction />} />
          <Route
            path="update"
            element={<FactionForm title="Update" mode="update" />}
          />
        </Route>
        <Route path="characters">
          <Route index element={<CampaignCharacterList />} />
          <Route path=":characterId">
            <Route index element={<CharacterSheet />} />
            <Route path="update" element={<CharacterUpdateForm />}>
              <Route path="perks" element={<PerkLinkModal />} />
              <Route path="npcPreferences" element={<NpcPreferenceModal />} />
            </Route>
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
                  <Route
                    path="tutorial"
                    element={<ItemUpgradeTutorialModal />}
                  />
                </Route>
              </Route>
            </Route>
          </Route>
          {CharacterModalRoutes()}
        </Route>
        {SessionRoutes()}
        <Route path="affiliations" element={<CampaignAffiliations />} />
        <Route path="rollSimulator" element={<RollSimulator />}>
          <Route path="rollResults" element={<RollModal />} />
        </Route>
      </Route>
      <Route
        path="create"
        element={<CampaignForm title="Create" mode="create" />}
      />
      <Route path="rollSimulator" element={<RollSimulator />}>
        <Route path="rollResults" element={<RollModal />} />
      </Route>
    </Route>
  );
};

export default CampaignRoutes;
