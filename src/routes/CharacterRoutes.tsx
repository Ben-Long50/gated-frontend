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
import ConditionModal from 'src/components/modals/ConditionModal';
import Inventory from 'src/components/Inventory';
import ItemModifyForm from 'src/components/ItemModifyForm';
import ItemPageWrapper from 'src/components/ItemPageWrapper';
import Items from 'src/components/Items';
import Resume from 'src/components/Resume';
import ResumeForm from 'src/components/ResumeForm';
import ShopModal from 'src/components/modals/ShopModal';
import InventoryModal from 'src/components/modals/InventoryModal';
import NpcPreferenceModal from 'src/components/modals/NpcPreferenceModal';
import PerkLinkModal from 'src/components/modals/PerkLinkModal';

const CharacterRoutes = () => {
  return (
    <Route path="characters">
      <Route path="" element={<CharacterList />}>
        <Route path=":characterId">
          <Route path="conditions" element={<ConditionModal />} />
          <Route path="shop">
            <Route path="global" element={<ShopModal />}>
              <Route path="cart" element={<Cart />} />
              <Route path=":category" element={<Items />} />
              <Route path=":category/:itemId" element={<ItemPageWrapper />} />
            </Route>
            <Route path=":shopId" element={<CharacterList />}>
              <Route path="cart" element={<Cart />} />
              <Route path=":category" element={<Items />} />
              <Route path=":category/:itemId" element={<ItemPageWrapper />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="playerCharacters" element={<CharacterList />} />
      <Route path="nonPlayerCharacters" element={<CharacterList />} />
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
        <Route
          path="equipment/:category/:itemId"
          element={<ItemPageWrapper />}
        />
        <Route path="deployments" element={<Deployments />}>
          <Route path="inventory" element={<InventoryModal />} />
        </Route>
        <Route
          path="deployments/:category/:itemId"
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
