import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import KeywordCard from './KeywordCard';
import useKeywords from '../hooks/useKeywords';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';

const Keywords = () => {
  const { apiUrl, authToken } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);

  const keywords = useKeywords();

  const searchForm = useForm({
    defaultValues: {
      query: '',
    },
    onSubmit: ({ value }) => {
      if (value.query === '') {
        keywords.resetList();
      } else {
        keywords.filterByQuery(value.query);
      }
    },
  });

  if (keywords.isLoading || keywords.isPending) {
    return <span></span>;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-3">
      <h1 className="text-center lg:mb-5">Keywords</h1>
      <ThemeContainer
        chamfer="32"
        className="w-full"
        borderColor={accentPrimary}
      >
        <div
          className={`bg-primary flex w-full flex-col gap-4 px-3 py-4 clip-8 sm:gap-6 sm:p-6 lg:gap-8 lg:p-8`}
        >
          <form>
            <searchForm.Field name="query">
              {(field) => (
                <InputField
                  label="Search keywords"
                  field={field}
                  onChange={() => {
                    searchForm.handleSubmit();
                  }}
                />
              )}
            </searchForm.Field>
          </form>
          {Object.entries(keywords.filteredKeywords).map(
            ([type, keywordList]) => {
              return (
                keywordList.length > 0 && (
                  <div
                    className="flex flex-col gap-4 md:grid md:grid-cols-2"
                    key={type}
                  >
                    <h1 className="col-span-2 pl-6 sm:mb-4">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </h1>
                    {keywordList.map((keyword) => {
                      return (
                        <KeywordCard key={keyword.name} keyword={keyword} />
                      );
                    })}
                  </div>
                )
              );
            },
          )}
        </div>
      </ThemeContainer>
    </div>
  );
};

export default Keywords;
