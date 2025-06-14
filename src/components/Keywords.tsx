import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import KeywordCard from './KeywordCard';
import useKeywords from '../hooks/useKeywords';
import InputField from './InputField';
import { FieldApi, useForm } from '@tanstack/react-form';
import Loading from './Loading';
import ArrowHeader2 from './ArrowHeader2';
import InputSelectField from './InputSelectField';
import Icon from '@mdi/react';
import { mdiSync } from '@mdi/js';
import { Keyword, KeywordReference } from 'src/types/keyword';
import InputFieldBasic from './InputFieldBasic';
import { useLocation } from 'react-router-dom';
import { capitalCase } from 'change-case';
import ExpandingList from './ExpandingList';

const Keywords = ({
  title,
  forcedMode,
  field,
}: {
  title?: string;
  forcedMode?: string;
  field?: FieldApi;
}) => {
  const { accentPrimary } = useContext(ThemeContext);
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const mode = forcedMode || parts[parts.length - 2];

  const {
    filteredKeywords: keywords,
    filterByQuery,
    filterByCategory,
    isLoading,
  } = useKeywords();

  const searchForm = useForm({
    defaultValues: {
      query: '',
      category: '',
    },
    onSubmit: () => {
      filterByQuery('');
      filterByCategory('');
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8">
      <h1 className="text-center">{title || 'Traits'}</h1>
      <ThemeContainer
        className={`ml-auto w-full`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <div className="flex w-full flex-col gap-4 p-4">
          <div className="grid w-full grid-cols-2 gap-4 sm:gap-8">
            <ArrowHeader2 title="Filter Options" />
            <searchForm.Field name="category">
              {(field) => (
                <InputSelectField
                  label="Trait Type"
                  options={[
                    '',
                    'weapon',
                    'armor',
                    'vehicle',
                    'chromebits',
                    'hardwired',
                    'networked',
                  ]}
                  field={field}
                  onChange={() => {
                    filterByCategory(field.state.value);
                  }}
                />
              )}
            </searchForm.Field>
          </div>
          <div className="flex items-end gap-4">
            <searchForm.Field name="query">
              {(field) => (
                <InputField
                  className="w-full"
                  label="Search Traits"
                  field={field}
                  onChange={() => {
                    filterByQuery(field.state.value);
                  }}
                />
              )}
            </searchForm.Field>
            <button
              className="text-accent bg-tertiary shadow-color group z-10 grid size-12 shrink-0 place-items-center rounded-md p-1.5 shadow-md hover:underline"
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
      <ThemeContainer
        chamfer="medium"
        className="w-full"
        borderColor={accentPrimary}
      >
        <div className="flex w-full flex-col gap-8 p-4 sm:p-8">
          <searchForm.Subscribe selector={(state) => state.values.category}>
            {(category) => (
              <ExpandingList
                title={
                  category.length > 0
                    ? capitalCase(category) + ' Traits'
                    : 'All Traits'
                }
                className="flex flex-col gap-4 md:grid md:grid-cols-2"
              >
                {keywords?.map((keyword) => {
                  const activeKeyword =
                    mode === 'form'
                      ? field.state.value?.find(
                          (item: KeywordReference) =>
                            item.keyword.id === keyword.id,
                        )
                      : null;
                  return (
                    <KeywordCard
                      mode={mode}
                      keyword={keyword}
                      activeKeyword={activeKeyword}
                      field={field}
                    />
                  );
                })}
              </ExpandingList>
            )}
          </searchForm.Subscribe>
        </div>
      </ThemeContainer>
    </div>
  );
};

export default Keywords;
