import { useLocation, useParams } from 'react-router-dom';
import ItemPage from './ItemPage';

const ItemPageWrapper = () => {
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const { itemId, category } = useParams();

  const mode = parts.pop();

  if (!category || !itemId) {
    return <div>Not Found</div>;
  }

  return <ItemPage itemId={Number(itemId)} mode={mode} category={category} />;
};

export default ItemPageWrapper;
