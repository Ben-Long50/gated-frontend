import { Route } from 'react-router-dom';
import CharacterForm from 'src/components/CharacterForm';
import CharacterList from 'src/components/CharacterList';
import NpcPreferenceModal from 'src/components/modals/NpcPreferenceModal';
import PerkLinkModal from 'src/components/modals/PerkLinkModal';
import CharacterRoutes from './CharacterRoutes';
import DescriptionModal from 'src/components/modals/DescriptionModal';

const CharacterTabRoutes = () => {
  return (
    <Route path="characters">
      <Route path="" element={<CharacterList />}>
        <Route path="conditions/:conditionId" element={<DescriptionModal />} />
      </Route>
      <Route path="create" element={<CharacterForm />}>
        <Route path="perks" element={<PerkLinkModal />} />
        <Route path="npcPreferences" element={<NpcPreferenceModal />} />
      </Route>
      {CharacterRoutes()}
    </Route>
  );
};

export default CharacterTabRoutes;
