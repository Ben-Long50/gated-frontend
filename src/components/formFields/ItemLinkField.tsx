import { FormApi, FormState } from '@tanstack/react-form';
import BtnRect from '../buttons/BtnRect';
import ArrowHeader2 from '../ArrowHeader2';
import { Item } from 'src/types/item';
import ItemCard from '../ItemCard';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import useModalStore from 'src/stores/modalStore';
import { capitalCase } from 'change-case';

const ItemLinkField = ({
  form,
  category,
}: {
  form: FormApi;
  category: string;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { linkCategory } = useParams();

  const setBackgroundPath = useModalStore((state) => state.setBackgroundPath);

  const openItemModal = () => {
    setBackgroundPath(location.pathname);
    navigate(category);
  };

  return (
    <>
      <form.Subscribe selector={(state: FormState) => state.values[category]}>
        {(items: Item[]) => (
          <>
            {items.length > 0 && (
              <ArrowHeader2 title={'Linked ' + capitalCase(category)} />
            )}
            <form.Field name={category}>
              {(field) => (
                <>
                  {linkCategory && <Outlet context={{ field, category }} />}
                  {items.map((item: Item) => {
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          field.handleChange(
                            field.state.value.filter(
                              (item: Item) => item.id !== item.id,
                            ),
                          );
                        }}
                      >
                        <ItemCard item={item} mode="form" />
                      </button>
                    );
                  })}
                </>
              )}
            </form.Field>
          </>
        )}
      </form.Subscribe>
      <BtnRect
        className="w-1/3 min-w-48 self-end"
        ariaLabel="Open link item modal"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          openItemModal();
        }}
      >
        {'Link ' + capitalCase(category)}
      </BtnRect>
    </>
  );
};

export default ItemLinkField;
