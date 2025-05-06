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

const CampaignRoutes = () => {
  return (
    <Route path="campaigns">
      <Route index element={<Campaigns />} />
      <Route path=":campaignId">
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
          <Route
            path="affiliations/:affiliationId/update"
            element={<AffiliationForm title="Update" mode="update" />}
          />
        </Route>
        <Route path="characters">
          <Route index element={<CampaignCharacterList />} />
          <Route path=":characterId">
            <Route index element={<CharacterSheet />} />
            <Route path="equipment" element={<Equipment />} />
            <Route path="resume" element={<Resume />} />
            <Route path="update" element={<CharacterUpdateForm />} />
          </Route>
        </Route>
        {SessionRoutes()}
        <Route path="rollSimulator" element={<RollSimulator />} />
      </Route>

      <Route
        path="create"
        element={<CampaignForm title="Create" mode="create" />}
      />
      <Route path="rollSimulator" element={<RollSimulator />} />
    </Route>
  );
};

export default CampaignRoutes;
