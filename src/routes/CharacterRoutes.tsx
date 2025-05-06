import { Route } from 'react-router-dom';
import AffiliationForm from 'src/components/AffiliationForm';
import Affiliations from 'src/components/Affiliations';
import ArmorForm from 'src/components/ArmorForm';
import Cart from 'src/components/Cart';
import CharacterForm from 'src/components/CharacterForm';
import CharacterList from 'src/components/CharacterList';
import CharacterSheet from 'src/components/CharacterSheet';
import CharacterUpdateForm from 'src/components/CharacterUpdateForm';
import CyberneticForm from 'src/components/CyberneticForm';
import Deployments from 'src/components/Deployments';
import DroneForm from 'src/components/DroneForm';
import Drones from 'src/components/Drones';
import Equipment from 'src/components/Equipment';
import Inventory from 'src/components/Inventory';
import ItemForm from 'src/components/ItemForm';
import ItemPageWrapper from 'src/components/ItemPageWrapper';
import Resume from 'src/components/Resume';
import ResumeForm from 'src/components/ResumeForm';
import VehicleForm from 'src/components/VehicleForm';
import WeaponForm from 'src/components/WeaponForm';

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
        <Route path="equipment" element={<Equipment />}>
          <Route path="inventory" element={<Equipment />} />
        </Route>
        <Route path="deployments" element={<Deployments />}>
          <Route path="inventory" element={<Equipment />} />
        </Route>
        <Route path="inventory">
          <Route path="weapons">
            <Route index element={<Inventory />} />
            <Route path=":weaponId" element={<ItemPageWrapper />} />
            <Route path=":weaponId/modify" element={<WeaponForm />} />
          </Route>
          <Route path="armor">
            <Route index element={<Inventory />} />
            <Route path=":armorId" element={<ItemPageWrapper />} />
            <Route path=":armorId/modify" element={<ArmorForm />} />
          </Route>
          <Route path="cybernetics">
            <Route index element={<Inventory />} />
            <Route path=":cyberneticId" element={<ItemPageWrapper />} />
            <Route path=":cyberneticId/modify" element={<CyberneticForm />} />
          </Route>
          <Route path="items">
            <Route index element={<Inventory />} />
            <Route path=":itemId" element={<ItemPageWrapper />} />
            <Route path=":itemId/modify" element={<ItemForm />} />
          </Route>
          <Route path="vehicles">
            <Route index element={<Inventory />} />
            <Route path=":vehicleId" element={<ItemPageWrapper />} />
            <Route path=":vehicleId/modify" element={<VehicleForm />} />
            <Route path="weapons" element={<Inventory />} />
            <Route path="weapons/:weaponId/modify" element={<WeaponForm />} />
          </Route>
          <Route path="drones">
            <Route index element={<Inventory />} />
            <Route path=":droneId" element={<ItemPageWrapper />} />
            <Route path=":droneId/modify" element={<DroneForm />} />
            <Route path="weapons" element={<Inventory />} />
            <Route path="weapons/:weaponId/modify" element={<WeaponForm />} />
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
