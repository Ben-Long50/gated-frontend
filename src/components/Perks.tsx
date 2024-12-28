import PerkList from './PerkList';
import { useContext, useState } from 'react';
import usePerks from '../hooks/usePerks';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import { useForm } from '@tanstack/react-form';
import InputField from './InputField';
import { LayoutContext } from '../contexts/LayoutContext';

const Perks = () => {
  const { accentPrimary } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);
  const [attributeFilter, setAttributefilter] = useState('');

  const perks = usePerks();

  const searchForm = useForm({
    defaultValues: {
      query: '',
    },
    onSubmit: ({ value }) => {
      console.log(value);

      if (value.query === '') {
        perks.filterPerks(attributeFilter, value.query);
      } else {
        perks.filterPerks(attributeFilter, value.query);
      }
    },
  });

  if (perks.isLoading || perks.isPending) {
    return <span></span>;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-3">
      <h1 className="text-center lg:mb-5">Perks</h1>
      <div className="flex w-full flex-col items-center justify-between gap-2 lg:flex-row lg:px-8">
        <p>Filter by attribute</p>

        <div className="grid grid-cols-6 gap-0.5">
          <button
            className="text-tertiary px-2 hover:underline"
            onClick={() => {
              perks.resetPerks();
              searchForm.setFieldValue('query', '');
              setAttributefilter('');
            }}
          >
            reset
          </button>
          <button
            className={`${attributeFilter === 'general' ? 'accent-primary' : 'bg-primary text-secondary'} timing w-full rounded-l-md text-lg font-semibold lg:pt-1`}
            onClick={() => {
              perks.filterPerks('general', searchForm.getFieldValue('query'));
              setAttributefilter('general');
            }}
          >
            G
          </button>
          <button
            className={`${attributeFilter === 'cybernetica' ? 'accent-primary' : 'bg-primary text-secondary'} timing w-full text-lg font-semibold lg:pt-1`}
            onClick={() => {
              perks.filterPerks(
                'cybernetica',
                searchForm.getFieldValue('query'),
              );
              setAttributefilter('cybernetica');
            }}
          >
            C
          </button>
          <button
            className={`${attributeFilter === 'esoterica' ? 'accent-primary' : 'bg-primary text-secondary'} timing w-full text-lg font-semibold lg:pt-1`}
            onClick={() => {
              perks.filterPerks('esoterica', searchForm.getFieldValue('query'));
              setAttributefilter('esoterica');
            }}
          >
            E
          </button>
          <button
            className={`${attributeFilter === 'peace' ? 'accent-primary' : 'bg-primary text-secondary'} timing w-full text-lg font-semibold lg:pt-1`}
            onClick={() => {
              perks.filterPerks('peace', searchForm.getFieldValue('query'));
              setAttributefilter('peace');
            }}
          >
            P
          </button>
          <button
            className={`${attributeFilter === 'violence' ? 'accent-primary' : 'bg-primary text-secondary'} timing w-full rounded-r-md text-lg font-semibold lg:pt-1`}
            onClick={() => {
              perks.filterPerks('violence', searchForm.getFieldValue('query'));
              setAttributefilter('violence');
            }}
          >
            V
          </button>
        </div>
      </div>
      <ThemeContainer
        chamfer={`${layoutSize === 'small' || layoutSize === 'xsmall' ? '24' : '32'}`}
        className="w-full"
        borderColor={accentPrimary}
      >
        <div
          className={`bg-primary flex w-full flex-col gap-4 px-3 py-4 ${layoutSize === 'small' || layoutSize === 'xsmall' ? 'clip-6' : 'clip-8'} sm:gap-6 sm:p-6 lg:gap-8 lg:p-8`}
        >
          <form>
            <searchForm.Field name="query">
              {(field) => (
                <InputField
                  label="Search perks"
                  field={field}
                  onChange={() => {
                    searchForm.handleSubmit();
                  }}
                />
              )}
            </searchForm.Field>
          </form>
          <PerkList perkTree={perks.filteredPerkTree} />
        </div>
      </ThemeContainer>
    </div>
  );
};

export default Perks;
