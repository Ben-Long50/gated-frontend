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
import ArrowHeader2 from './ArrowHeader2';

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
        className="w-full"
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <form className="flex w-full flex-col gap-4 p-4">
          <div className="grid w-full grid-cols-2 items-center justify-between gap-4 sm:grid-cols-3 sm:gap-8">
            <ArrowHeader2 title="Filter Options" />
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
        chamfer="medium"
        className="w-full"
        borderColor={accentPrimary}
      >
        <PerkList
          className="p-4 sm:p-8"
          perkTree={perks.filteredPerkTree}
          mode={mode}
        />
      </ThemeContainer>
    </div>
  );
};

export default Perks;
