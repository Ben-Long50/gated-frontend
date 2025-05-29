import { Route } from 'react-router-dom';
import AffiliationForm from 'src/components/AffiliationForm';
import Affiliations from 'src/components/Affiliations';
import Cart from 'src/components/Cart';
import CharacterForm from 'src/components/CharacterForm';
import CharacterList from 'src/components/CharacterList';
import CharacterSheet from 'src/components/CharacterSheet';
import CharacterUpdateForm from 'src/components/CharacterUpdateForm';
import Deployments from 'src/components/Deployments';
import Equipment from 'src/components/Equipment';
import Inventory from 'src/components/Inventory';
import ItemModifyForm from 'src/components/ItemModifyForm';
import ItemPageWrapper from 'src/components/ItemPageWrapper';
import Resume from 'src/components/Resume';
import ResumeForm from 'src/components/ResumeForm';

const CharacterRoutes = () => {
  return (
    <Route path="characters">
      <Route index element={<CharacterList />} />
      <Route path="playerCharacters" element={<CharacterList />} />
      <Route path="nonPlayerCharacters" element={<CharacterList />} />
      <Route path="create" element={<CharacterForm />} />
      <Route path=":characterId">
        <Route index element={<CharacterSheet />} />
        <Route path="update" element={<CharacterUpdateForm />} />
        <Route path="cart" element={<Cart />} />
        <Route path="resume" element={<Resume />} />
        <Route path="resume/update" element={<ResumeForm />} />
        <Route path="equipment" element={<Equipment />} />
        <Route
          path="equipment/:category/:itemId"
          element={<ItemPageWrapper />}
        />
        <Route path="deployments" element={<Deployments />} />
        <Route
          path="deployments/:category/:itemId"
          element={<ItemPageWrapper />}
        />
        <Route
          path="deployments/drones/:droneId"
          element={<ItemPageWrapper />}
        />
        <Route path="inventory">
          <Route path="weapons">
            <Route index element={<Inventory />} />
            <Route path=":weaponId" element={<ItemPageWrapper />} />
            <Route path=":weaponId/modify" element={<ItemModifyForm />} />
          </Route>
          <Route path="armors">
            <Route index element={<Inventory />} />
            <Route path=":armorId" element={<ItemPageWrapper />} />
            <Route path=":armorId/modify" element={<ItemModifyForm />} />
          </Route>
          <Route path="augmentations">
            <Route index element={<Inventory />} />
            <Route path=":cyberneticId" element={<ItemPageWrapper />} />
            <Route path=":cyberneticId/modify" element={<ItemModifyForm />} />
          </Route>
          <Route path="reusables">
            <Route index element={<Inventory />} />
            <Route path=":itemId" element={<ItemPageWrapper />} />
            <Route path=":itemId/modify" element={<ItemModifyForm />} />
          </Route>
          <Route path="consumables">
            <Route index element={<Inventory />} />
            <Route path=":itemId" element={<ItemPageWrapper />} />
            <Route path=":itemId/modify" element={<ItemModifyForm />} />
          </Route>
          <Route path="vehicles">
            <Route index element={<Inventory />} />
            <Route path=":vehicleId" element={<ItemPageWrapper />} />
            <Route path=":vehicleId/modify" element={<ItemModifyForm />} />
            <Route path="weapons" element={<Inventory />} />
            <Route
              path="weapons/:weaponId/modify"
              element={<ItemModifyForm />}
            />
          </Route>
          <Route path="drones">
            <Route index element={<Inventory />} />
            <Route path=":droneId" element={<ItemPageWrapper />} />
            <Route path=":droneId/modify" element={<ItemModifyForm />} />
            <Route path="weapons" element={<Inventory />} />
            <Route
              path="weapons/:weaponId/modify"
              element={<ItemModifyForm />}
            />
          </Route>
          <Route path="modifications" element={<Inventory />} />
        </Route>
      </Route>
      <Route path=":characterId/affiliations" element={<Affiliations />} />
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
