import { useContext, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import CyberneticCard, { CyberneticCardMobile } from './CyberneticCard';
import useCybernetics from '../hooks/useCybernetics';
import Loading from './Loading';
import { FetchOptions } from 'src/types/fetchOptions';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import ArrowHeader2 from './ArrowHeader2';
import InputSelectField from './InputSelectField';
import { LayoutContext } from '../contexts/LayoutContext';
import Icon from '@mdi/react';
import { mdiCropSquare, mdiGrid, mdiSync } from '@mdi/js';

const Cybernetics = ({
  title,
  fetchOptions,
  mode,
}: {
  title: string;
  fetchOptions?: FetchOptions;
  mode: string;
}) => {
  const { mobile } = useContext(LayoutContext);
  const { accentPrimary } = useContext(ThemeContext);

  const [cardType, setCardType] = useState<'small' | 'large'>(() =>
    mobile ? 'small' : 'large',
  );

  const cybernetics = useCybernetics(fetchOptions);

  const searchForm = useForm({
    defaultValues: {
      category: '',
      query: '',
    },
    onSubmit: () => {
      cybernetics.filterByQuery('');
      cybernetics.filterByCategory('');
    },
  });

  if (
    cybernetics.isLoading ||
    cybernetics.isPending ||
    cybernetics.keywordsLoading ||
    cybernetics.keywordsPending
  ) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8">
      <h1 className="text-center">{title}</h1>
      <ThemeContainer
        className={`ml-auto w-full`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <form className="flex w-full flex-col gap-4 p-4">
          <div className="grid w-full grid-cols-2">
            <ArrowHeader2 title="Filter Options" />
            <searchForm.Field name="category">
              {(field) => (
                <InputSelectField
                  field={field}
                  options={[
                    '',
                    'stat',
                    'roll',
                    'offensive',
                    'defensive',
                    'function',
                  ]}
                  initialValue=""
                  label="Augment Type"
                  onChange={() => {
                    cybernetics.filterByCategory(field.state.value);
                  }}
                />
              )}
            </searchForm.Field>
          </div>
          <div className="flex items-center gap-4">
            <searchForm.Field name="query">
              {(field) => (
                <InputField
                  className="w-full"
                  label="Search cybernetics"
                  field={field}
                  onChange={() => {
                    cybernetics.filterByQuery(field.state.value);
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
        </form>
      </ThemeContainer>

      {cardType === 'large' ? (
        cybernetics.filteredCybernetics.map(
          (cybernetic: CyberneticWithKeywords) => {
            return (
              <CyberneticCard
                key={cybernetic.id}
                cybernetic={cybernetic}
                mode={mode}
              />
            );
          },
        )
      ) : (
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
          {cybernetics.filteredCybernetics.map(
            (cybernetic: CyberneticWithKeywords) => {
              return (
                <CyberneticCardMobile
                  key={cybernetic.id}
                  cybernetic={cybernetic}
                  mode={mode}
                />
              );
            },
          )}
        </div>
      )}
    </div>
  );
};

export default Cybernetics;
