import PerkList from './PerkList';
import { useContext } from 'react';
import usePerks from '../hooks/usePerks';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import { useForm } from '@tanstack/react-form';
import InputField from './InputField';
import { LayoutContext } from '../contexts/LayoutContext';
import SelectField from './SelectField';
import Loading from './Loading';

const Perks = ({ mode }: { mode?: string }) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);

  const perks = usePerks();

  const searchForm = useForm({
    defaultValues: {
      attribute: '',
      skill: '',
      query: '',
    },
    onSubmit: ({ value }) => {
      perks.filterPerks(value.query);
    },
  });

  if (perks.isLoading || perks.isPending) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8">
      <h1 className="text-center">Perks</h1>
      <ThemeContainer
        className="w-full rounded-br-4xl rounded-tl-4xl shadow-lg shadow-slate-950"
        chamfer="24"
        borderColor={accentPrimary}
      >
        <form className="bg-primary flex w-full flex-col gap-4 p-4 clip-6">
          <div className="grid w-full grid-cols-2 items-center justify-between gap-4 sm:grid-cols-3 sm:gap-8">
            <h3 className="col-span-2 pl-4 sm:col-span-1">Filter options</h3>
            <searchForm.Field name="attribute">
              {(field) => (
                <SelectField
                  field={field}
                  onChange={() => {
                    perks.filterByAttribute(field.state.value);
                    perks.filterBySkill('');
                  }}
                >
                  <option value="">All attributes</option>
                  <option value="general">General</option>
                  <option value="cybernetica">Cybernetica</option>
                  <option value="esoterica">Esoterica</option>
                  <option value="peace">Peace</option>
                  <option value="violence">Violence</option>
                </SelectField>
              )}
            </searchForm.Field>
            <searchForm.Subscribe
              selector={(state) => [state.values.attribute]}
            >
              {([selectedAttribute]) => (
                <searchForm.Field name="skill">
                  {(field) => (
                    <SelectField
                      field={field}
                      onChange={() => {
                        perks.filterBySkill(field.state.value);
                      }}
                    >
                      <option value=""></option>
                      {Object.entries(perks.emptyTree).map(
                        ([attribute, skills]) => {
                          if (attribute === selectedAttribute) {
                            return Object.entries(skills).map(([skill]) => {
                              return (
                                <option key={skill} value={skill}>
                                  {skill[0].toUpperCase() + skill.slice(1)}
                                </option>
                              );
                            });
                          }
                        },
                      )}
                    </SelectField>
                  )}
                </searchForm.Field>
              )}
            </searchForm.Subscribe>
          </div>
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
      </ThemeContainer>
      <ThemeContainer
        chamfer={`${layoutSize === 'small' || layoutSize === 'xsmall' ? '24' : '32'}`}
        className="w-full rounded-br-5xl rounded-tl-5xl shadow-lg shadow-slate-950"
        borderColor={accentPrimary}
      >
        <div
          className={`bg-primary flex w-full flex-col gap-4 px-3 py-4 ${layoutSize === 'small' || layoutSize === 'xsmall' ? 'clip-6' : 'clip-8'} sm:gap-6 sm:p-6 lg:gap-8 lg:p-8`}
        >
          <PerkList perkTree={perks.filteredPerkTree} mode={mode} />
        </div>
      </ThemeContainer>
    </div>
  );
};

export default Perks;
