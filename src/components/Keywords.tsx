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
import { Keyword } from 'src/types/keyword';
import InputFieldBasic from './InputFieldBasic';
import { useLocation } from 'react-router-dom';

const Keywords = ({
  title,
  forcedMode,
  field,
  keywordType,
}: {
  title?: string;
  forcedMode?: string;
  field?: FieldApi;
  keywordType?:
    | 'weapon'
    | 'armor'
    | 'vehicle'
    | 'chromebits'
    | 'hardwired'
    | 'networked';
}) => {
  const { accentPrimary } = useContext(ThemeContext);
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const mode = forcedMode || parts[parts.length - 2];

  const keywords = useKeywords(keywordType || undefined);

  const searchForm = useForm({
    defaultValues: {
      query: '',
      category: '',
    },
    onSubmit: () => {
      keywords.filterByQuery('');
      keywords.filterByCategory('');
    },
  });

  if (keywords.isLoading || keywords.isPending) {
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
                    keywords.filterByCategory(field.state.value);
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
                    keywords.filterByQuery(field.state.value);
                  }}
                />
              )}
            </searchForm.Field>
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
      <ThemeContainer
        chamfer="medium"
        className="w-full"
        borderColor={accentPrimary}
      >
        <div className="flex w-full flex-col gap-8 p-4 sm:p-8">
          <searchForm.Subscribe selector={(state) => state.values.category}>
            {(category) => (
              <ArrowHeader2
                title={
                  category.length > 0
                    ? category[0].toUpperCase() + category.slice(1) + ' Traits'
                    : 'All Traits'
                }
              />
            )}
          </searchForm.Subscribe>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
            {keywords.filteredKeywords.map((keyword) => {
              const activeKeyword =
                mode === 'form'
                  ? field.state.value.find(
                      (item: { keyword: Keyword; value?: number }) =>
                        item.keyword.id === keyword.id,
                    )
                  : null;
              return (
                <div key={keyword.id} className="flex items-center gap-4">
                  <KeywordCard mode={mode} keyword={keyword}>
                    {activeKeyword && (
                      <InputFieldBasic
                        className="max-w-20 shrink-0"
                        name="value"
                        type="number"
                        label="Value"
                        value={activeKeyword.value}
                        onChange={(value: number | string) => {
                          const updatedValue = field.state.value.map(
                            (item: { keyword: Keyword; value?: number }) =>
                              item.keyword.id === keyword.id
                                ? {
                                    keyword: item.keyword,
                                    value,
                                  }
                                : item,
                          );
                          field.handleChange(updatedValue);
                        }}
                      />
                    )}
                  </KeywordCard>
                  {mode === 'form' && (
                    <input
                      className="size-6 shrink-0"
                      type="checkbox"
                      checked={activeKeyword}
                      onChange={() => {
                        if (!activeKeyword) {
                          field.handleChange([
                            ...field.state.value,
                            { keyword },
                          ]);
                        } else {
                          field.handleChange(
                            field.state.value.filter(
                              (item: { keyword: Keyword; value?: number }) =>
                                item.keyword.id !== keyword.id,
                            ),
                          );
                        }
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </ThemeContainer>
    </div>
  );
};

export default Keywords;
