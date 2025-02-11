import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import Loading from './Loading';
import { FetchOptions } from 'src/types/fetchOptions';
import useItems from '../hooks/useItems';
import { Item } from 'src/types/item';
import ItemCard from './ItemCard';
import StatCard from './StatCard';
import LightningIcon from './icons/LightningIcon';
import EquipIcon from './icons/EquipIcon';
import { Modifier } from 'src/types/modifier';
import ModifierTag from './ModifierTag';
import MiscItemCard from './MiscItemCard';

const Items = ({
  title,
  fetchOptions,
  mode,
}: {
  title: string;
  fetchOptions?: FetchOptions;
  mode: string;
}) => {
  const { accentPrimary } = useContext(ThemeContext);

  const items = useItems(fetchOptions);

  const searchForm = useForm({
    defaultValues: {
      query: '',
    },
    onSubmit: ({ value }) => {
      if (value.query === '') {
        items.resetList();
      } else {
        items.filterByQuery(value.query);
      }
    },
  });

  if (items.isLoading || items.isPending) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-8">
      <h1 className="text-center">{title}</h1>
      <ThemeContainer
        className={`ml-auto w-full rounded-br-5xl rounded-tl-5xl shadow-lg shadow-zinc-950`}
        chamfer="24"
        borderColor={accentPrimary}
      >
        <form className="bg-primary flex w-full flex-col gap-4 p-4 clip-6">
          <div className="grid w-full grid-cols-2 items-center justify-between gap-4 sm:grid-cols-3 sm:gap-8">
            <h3 className="pl-4">Filter options</h3>
          </div>
          <searchForm.Field name="query">
            {(field) => (
              <InputField
                label="Search items"
                field={field}
                onChange={() => {
                  searchForm.handleSubmit();
                }}
              />
            )}
          </searchForm.Field>
        </form>
      </ThemeContainer>
      {items.filteredItems?.length > 0 && (
        <div className="flex flex-col gap-8">
          {items.filteredItems?.map((item: Item) => {
            return <MiscItemCard key={item.id} item={item} mode={mode} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Items;
