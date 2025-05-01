import { useLocation } from 'react-router-dom';
import ItemPage from './ItemPage';

const ItemPageWrapper = () => {
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean); // split into pieces

  // find the last two parts (assuming category and id are last)

  const itemId = Number(parts.pop());
  const category = parts.pop();
  const mode = parts.pop();

  if (!category || !itemId) {
    return <div>Not Found</div>;
  }

  return <ItemPage itemId={itemId} mode={mode} category={category} />;
};

export default ItemPageWrapper;
