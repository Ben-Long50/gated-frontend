import PerkList from './PerkList';
import { useContext } from 'react';
import usePerks from '../hooks/usePerks';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import { FieldApi, useForm } from '@tanstack/react-form';
import InputField from './InputField';
import Loading from './Loading';
import ArrowHeader2 from './ArrowHeader2';
import InputSelectField from './InputSelectField';
import {
  AttributeName,
  AttributeTree,
  SkillName,
} from 'src/types/attributeTree';
import Icon from '@mdi/react';
import { mdiSync } from '@mdi/js';
import { useLocation } from 'react-router-dom';

const Perks = ({
  title,
  field,
  forcedMode,
  attributeTree,
}: {
  title?: string;
  field?: FieldApi;
  forcedMode?: string;
  attributeTree?: AttributeTree;
}) => {
  const { accentPrimary } = useContext(ThemeContext);
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const mode = forcedMode || parts[parts.length - 2];

  const perks = usePerks(attributeTree);

  const searchForm = useForm({
    defaultValues: {
      attribute: '' as AttributeName,
      skill: '' as SkillName,
      query: '',
    },
    onSubmit: () => {
      perks.filterPerks('');
      perks.filterByAttribute('');
      perks.filterBySkill('');
    },
  });

  if (perks.isLoading || perks.isPending) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8">
      <h1 className="text-center">{title || 'Perks'}</h1>
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
                <InputSelectField
                  field={field}
                  label="Attribute"
                  options={[
                    '',
                    'general',
                    'cybernetica',
                    'esoterica',
                    'peace',
                    'violence',
                  ]}
                  onChange={() => {
                    perks.filterByAttribute(field.state.value);
                    perks.filterBySkill('');
                  }}
                />
              )}
            </searchForm.Field>
            <searchForm.Subscribe
              selector={(state) => [state.values.attribute]}
            >
              {([selectedAttribute]) => (
                <searchForm.Field name="skill">
                  {(field) => (
                    <InputSelectField
                      field={field}
                      label="Skill"
                      options={
                        selectedAttribute
                          ? Object.keys(perks.emptyTree[selectedAttribute])
                          : []
                      }
                      onChange={() => {
                        perks.filterBySkill(field.state.value);
                      }}
                    />
                  )}
                </searchForm.Field>
              )}
            </searchForm.Subscribe>
          </div>
          <div className="flex items-end gap-4">
            <searchForm.Field name="query">
              {(field) => (
                <InputField
                  label="Search perks"
                  className="w-full"
                  field={field}
                  onChange={() => {
                    perks.filterPerks(field.state.value);
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
        </form>
      </ThemeContainer>
      <ThemeContainer
        chamfer="medium"
        className="w-full"
        borderColor={accentPrimary}
      >
        <PerkList perkTree={perks.filteredPerkTree} mode={mode} field={field} />
      </ThemeContainer>
    </div>
  );
};

export default Perks;
