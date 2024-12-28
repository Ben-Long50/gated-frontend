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
  const [activeFilter, setActivefilter] = useState('');

  const perks = usePerks();

  const searchForm = useForm({
    defaultValues: {
      query: '',
    },
    onSubmit: ({ value }) => {
      console.log(value);

      if (value.query === '') {
        perks.handleFilter(activeFilter, value.query);
      } else {
        perks.handleFilter(activeFilter, value.query);
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
              setActivefilter('');
            }}
          >
            reset
          </button>
          <button
            className={`${activeFilter === 'generalPerks' ? 'accent-primary' : 'bg-primary text-secondary'} timing w-full rounded-l-md text-lg font-semibold lg:pt-1`}
            onClick={() => {
              perks.handleFilter(
                'generalPerks',
                searchForm.getFieldValue('query'),
              );
              setActivefilter('generalPerks');
            }}
          >
            G
          </button>
          <button
            className={`${activeFilter === 'cyberneticaPerks' ? 'accent-primary' : 'bg-primary text-secondary'} timing w-full text-lg font-semibold lg:pt-1`}
            onClick={() => {
              perks.handleFilter(
                'cyberneticaPerks',
                searchForm.getFieldValue('query'),
              );
              setActivefilter('cyberneticaPerks');
            }}
          >
            C
          </button>
          <button
            className={`${activeFilter === 'esotericaPerks' ? 'accent-primary' : 'bg-primary text-secondary'} timing w-full text-lg font-semibold lg:pt-1`}
            onClick={() => {
              perks.handleFilter(
                'esotericaPerks',
                searchForm.getFieldValue('query'),
              );
              setActivefilter('esotericaPerks');
            }}
          >
            E
          </button>
          <button
            className={`${activeFilter === 'peacePerks' ? 'accent-primary' : 'bg-primary text-secondary'} timing w-full text-lg font-semibold lg:pt-1`}
            onClick={() => {
              perks.handleFilter(
                'peacePerks',
                searchForm.getFieldValue('query'),
              );
              setActivefilter('peacePerks');
            }}
          >
            P
          </button>
          <button
            className={`${activeFilter === 'violencePerks' ? 'accent-primary' : 'bg-primary text-secondary'} timing w-full rounded-r-md text-lg font-semibold lg:pt-1`}
            onClick={() => {
              perks.handleFilter(
                'violencePerks',
                searchForm.getFieldValue('query'),
              );
              setActivefilter('violencePerks');
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
          <PerkList perkTree={perks.filteredTree} />
        </div>
      </ThemeContainer>
    </div>
  );
};

export default Perks;
