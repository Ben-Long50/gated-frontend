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
import Equipment from 'src/components/Equipment';
import Inventory from 'src/components/Inventory';
import ItemForm from 'src/components/ItemForm';
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
        <Route path="equipment" element={<Equipment mode="equipment" />} />
        <Route path="inventory">
          <Route path="weapons" element={<Inventory />}>
            <Route path=":weaponId/modify" element={<WeaponForm />} />
          </Route>
          <Route path="armor" element={<Inventory />}>
            <Route path=":armorId/modify" element={<ArmorForm />} />
          </Route>
          <Route path="cybernetics" element={<Inventory />}>
            <Route path=":cyberneticId/modify" element={<CyberneticForm />} />
          </Route>
          <Route path="items" element={<Inventory />}>
            <Route path=":itemId/modify" element={<ItemForm />} />
          </Route>
          <Route path="vehicles" element={<Inventory />}>
            <Route path=":vehicleId/modify" element={<VehicleForm />} />
            <Route path="weapons" element={<Inventory />}>
              <Route path=":weaponId/modify" element={<WeaponForm />} />
            </Route>
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
