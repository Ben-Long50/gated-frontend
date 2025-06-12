import { Route } from 'react-router-dom';
import AffiliationForm from 'src/components/AffiliationForm';
import Cart from 'src/components/Cart';
import CharacterAffiliations from 'src/components/CharacterAffiliations';
import CharacterList from 'src/components/CharacterList';
import ConditionModal from 'src/components/modals/ConditionModal';
import ItemPageWrapper from 'src/components/ItemPageWrapper';
import Items from 'src/components/Items';
import ShopModal from 'src/components/modals/ShopModal';
import AffiliationModal from 'src/components/modals/AffiliationModal';

const CharacterModalRoutes = () => {
  return (
    <Route path=":characterId">
      <Route path="conditions" element={<ConditionModal />} />
      <Route path="affiliations" element={<AffiliationModal />}>
        <Route index element={<CharacterAffiliations />} />
        <Route path="create" element={<AffiliationForm />} />
      </Route>
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
  );
};

export default CharacterModalRoutes;
