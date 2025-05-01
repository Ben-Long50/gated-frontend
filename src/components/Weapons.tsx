import { useContext, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import WeaponCard, { WeaponCardMobile } from './WeaponCard';
import useWeapons from '../hooks/useWeapons';
import Loading from './Loading';
import { WeaponWithKeywords } from 'src/types/weapon';
import { FetchOptions } from 'src/types/fetchOptions';
import ArrowHeader2 from './ArrowHeader2';
import InputSelectField from './InputSelectField';
import Icon from '@mdi/react';
import { mdiCropSquare, mdiGrid, mdiSync } from '@mdi/js';
import { LayoutContext } from '../contexts/LayoutContext';

const Weapons = ({
  className,
  title,
  fetchOptions,
  mode,
  toggleFormLink,
}: {
  className?: string;
  title: string;
  fetchOptions?: FetchOptions;
  mode: string;
  toggleFormLink?: (weaponId: WeaponWithKeywords) => void;
}) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { mobile } = useContext(LayoutContext);

  const [cardType, setCardType] = useState<'small' | 'large'>(() =>
    mobile ? 'small' : 'large',
  );

  const weapons = useWeapons(fetchOptions);

  const searchForm = useForm({
    defaultValues: {
      category: '',
      query: '',
    },
    onSubmit: () => {
      weapons.filterByCategory('');
      weapons.filterByQuery('');
    },
  });

  if (weapons.isLoading || weapons.isPending) {
    return <Loading />;
  }

  return (
    <div
      className={`${className} flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8`}
    >
      <h1 className="text-center">{title}</h1>
      <ThemeContainer
        className={`ml-auto w-full`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <div className="flex flex-col gap-4 p-4">
          <div className="grid w-full grid-cols-2 items-center justify-between">
            <ArrowHeader2 title="Filter Options" />
            <searchForm.Field name="category">
              {(field) => (
                <InputSelectField
                  field={field}
                  className=""
                  label="Keyword"
                  options={weapons.filteredKeywords || []}
                  onChange={() => {
                    weapons.filterByCategory(field.state.value);
                  }}
                ></InputSelectField>
              )}
            </searchForm.Field>
          </div>
          <div className="flex items-center gap-4">
            <searchForm.Field name="query">
              {(field) => (
                <InputField
                  className="w-full"
                  label="Search weapons"
                  field={field}
                  onChange={() => {
                    weapons.filterByQuery(field.state.value);
                  }}
                />
              )}
            </searchForm.Field>
            {!mobile && (
              <>
                <button
                  className="text-accent bg-tertiary group z-10 grid size-12 shrink-0 place-items-center rounded-md p-0.5 shadow-md shadow-black hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setCardType('large');
                  }}
                >
                  <Icon
                    path={mdiCropSquare}
                    className={`${cardType === 'large' && 'text-accent'} text-secondary group-hover:text-accent timing`}
                  />
                </button>
                <button
                  className="text-accent bg-tertiary group z-10 grid size-12 shrink-0 place-items-center rounded-md p-2 shadow-md shadow-black hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setCardType('small');
                  }}
                >
                  <Icon
                    path={mdiGrid}
                    className={`${cardType === 'small' && 'text-accent'} text-secondary group-hover:text-accent timing`}
                  />
                </button>
              </>
            )}
            <button
              className="text-accent bg-tertiary group z-10 grid size-12 shrink-0 place-items-center rounded-md p-1.5 shadow-md shadow-black hover:underline"
              onClick={(e) => {
                e.preventDefault();
                searchForm.reset();
                searchForm.handleSubmit();
              }}
            >
              <Icon
                path={mdiSync}
                className="text-secondary group-hover:text-accent timing"
              />
            </button>
          </div>
        </div>
      </ThemeContainer>
      {cardType === 'large' ? (
        weapons.filteredWeapons?.map((weapon: WeaponWithKeywords) => {
          return (
            <WeaponCard
              key={weapon.id}
              weapon={weapon}
              mode={mode}
              toggleFormLink={toggleFormLink}
            />
          );
        })
      ) : (
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
          {weapons.filteredWeapons?.map((weapon: WeaponWithKeywords) => {
            return (
              <WeaponCardMobile
                key={weapon.id}
                weapon={weapon}
                mode={mode}
                toggleFormLink={toggleFormLink}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Weapons;
