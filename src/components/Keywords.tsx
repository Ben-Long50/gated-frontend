import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import KeywordCard from './KeywordCard';
import useKeywords from '../hooks/useKeywords';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import { LayoutContext } from '../contexts/LayoutContext';
import Loading from './Loading';
import SelectField from './SelectField';
import Icon from '@mdi/react';
import { mdiTriangleDown } from '@mdi/js';

const Keywords = ({ mode }: { mode?: string }) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);

  const keywords = useKeywords();

  const searchForm = useForm({
    defaultValues: {
      query: '',
      category: '',
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
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8">
      <h1 className="text-center">Keywords</h1>
      <ThemeContainer
        className={`ml-auto w-full rounded-br-5xl rounded-tl-5xl shadow-lg shadow-zinc-950`}
        chamfer="24"
        borderColor={accentPrimary}
      >
        <form className="bg-primary flex w-full flex-col gap-4 p-4 clip-6">
          <div className="grid w-full grid-cols-2 items-center justify-between gap-4 sm:grid-cols-3 sm:gap-8">
            <h3 className="pl-4">Filter options</h3>
            <searchForm.Field name="category">
              {(field) => (
                <SelectField
                  className="col-span-2 sm:col-start-3"
                  field={field}
                  onChange={() => {
                    keywords.filterByCategory(field.state.value);
                  }}
                >
                  <option value="">All keywords</option>
                  <option value="weapon">Weapon keywords</option>
                  <option value="armor">Armor keywords</option>
                  <option value="cybernetic">Cybernetic keywords</option>
                </SelectField>
              )}
            </searchForm.Field>
          </div>
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
      </ThemeContainer>
      <ThemeContainer
        chamfer="24"
        className="w-full rounded-br-5xl rounded-tl-5xl shadow-lg shadow-slate-950"
        borderColor={accentPrimary}
      >
        <div className="bg-primary flex w-full flex-col gap-8 p-4 clip-6 sm:p-8">
          <searchForm.Subscribe selector={(state) => state.values.category}>
            {(category) => (
              <div className="flex items-center gap-4">
                <Icon
                  className="text-primary"
                  path={mdiTriangleDown}
                  size={0.5}
                  rotate={-90}
                />
                <h2>
                  {category.length > 0
                    ? category[0].toUpperCase() +
                      category.slice(1) +
                      ' keywords'
                    : 'All keywords'}
                </h2>
              </div>
            )}
          </searchForm.Subscribe>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
            {keywords.filteredKeywords.map((keyword) => {
              return (
                <KeywordCard key={keyword.name} keyword={keyword} mode={mode} />
              );
            })}
          </div>
        </div>
      </ThemeContainer>
    </div>
  );
};

export default Keywords;
