import { useContext, useEffect, useState } from 'react';
import InputField from './InputField';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import BtnRect from './BtnRect';
import AttributeCard from './AttributeCard';
import TextAreaField from './TextAreaField';
import { AuthContext } from '../contexts/AuthContext';
import { useForm } from '@tanstack/react-form';
import useAttributeTree from '../hooks/useAttributeTree';
import SelectField from './SelectField';
import usePerksQuery from '../hooks/usePerksQuery/usePerksQuery';
import StatBar from './StatBar';
import PerkList from './PerkList';
import usePerks from '../hooks/usePerks';
import useCreateCharacterMutation from '../hooks/useCreateCharacterMutation/useCreateCharacterMutation';

const CharacterForm = () => {
  const { apiUrl, authToken } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);

  const [checkedPerk, setCheckedPerk] = useState('');

  const perks = usePerksQuery(apiUrl, authToken);
  const perkFilter = usePerks();
  const createCharacter = useCreateCharacterMutation(apiUrl, authToken);
  const attributeTree = useAttributeTree();
  const stats = attributeTree.calculateSkills(attributeTree.tree);

  const characterForm = useForm({
    defaultValues: {
      name: '',
      height: '',
      weight: '',
      age: '',
      sex: '',
      background: '',
      attributes: attributeTree.tree,
      perks: [],
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      createCharacter.mutate(value);
    },
  });

  useEffect(() => {
    if (perks.data) {
      perkFilter.filterPerks(perks.data, attributeTree.tree);
    }
  }, [perks.data, attributeTree.tree]);

  useEffect(() => {
    characterForm.setFieldValue('attributes', attributeTree.destructureTree());
  }, [attributeTree.tree, characterForm]);

  useEffect(() => {
    characterForm.setFieldValue('perks', [checkedPerk]);
  }, [checkedPerk]);

  if (perks.isPending) {
    return <span></span>;
  }

  return (
    <ThemeContainer
      className="mb-auto w-full max-w-2xl lg:max-w-4xl"
      chamfer="32"
      borderColor={accentPrimary}
    >
      <form
        className="bg-primary flex w-full min-w-96 flex-col gap-8 p-4 clip-8 lg:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          characterForm.handleSubmit();
        }}
      >
        <h1 className="text-center">Create Character</h1>
        <characterForm.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Perk name must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => <InputField label="Name" field={field} />}
        </characterForm.Field>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-16">
          <characterForm.Field name="height">
            {(field) => (
              <InputField type="number" label="Height (inches)" field={field} />
            )}
          </characterForm.Field>
          <characterForm.Field name="weight">
            {(field) => (
              <InputField type="number" label="Weight (pounds)" field={field} />
            )}
          </characterForm.Field>
          <characterForm.Field name="age">
            {(field) => (
              <InputField type="number" label="Age (years)" field={field} />
            )}
          </characterForm.Field>
          <characterForm.Field name="sex">
            {(field) => (
              <SelectField type="select" label="Sex" field={field}>
                <option defaultValue="" disabled></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </SelectField>
            )}
          </characterForm.Field>
        </div>
        <characterForm.Field
          name="background"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Perk description must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => (
            <TextAreaField label="Character background" field={field} />
          )}
        </characterForm.Field>
        <div className={`stat-bar-layout w-full items-center gap-4`}>
          <StatBar
            title="Health"
            current={stats.health}
            total={stats.health}
            color="rgb(248 113 113)"
          />
          <StatBar
            title="Sanity"
            current={stats.sanity}
            total={stats.sanity}
            color="rgb(96 165 250)"
          />
          <StatBar
            title="Cyber"
            current={stats.cyber}
            total={stats.cyber}
            color="rgb(52 211 153)"
          />
          <StatBar
            title="Equip"
            current={stats.equip}
            total={stats.equip}
            color="rgb(251 191 36)"
          />
        </div>
        <div className="flex flex-wrap justify-around gap-6">
          {Object.entries(stats).map(([stat, points]) => {
            const stats = ['speed', 'evasion', 'armor', 'ward'];
            return (
              stats.includes(stat) && (
                <div className="flex flex-col items-center gap-2" key={stat}>
                  <h3 className="text-primary text-xl font-semibold tracking-widest">
                    {stat.charAt(0).toUpperCase() + stat.slice(1)}{' '}
                  </h3>
                  <p className="text-secondary text-xl">{points}</p>
                </div>
              )
            );
          })}
          <div className="flex flex-col items-center gap-2" key={'evasion'}>
            <h3 className="text-primary text-xl font-semibold tracking-widest">
              Evasion
            </h3>
            <p className="text-secondary text-xl">1</p>
          </div>
          <div className="flex flex-col items-center gap-2" key={'armor'}>
            <h3 className="text-primary text-xl font-semibold tracking-widest">
              Armor
            </h3>
            <p className="text-secondary text-xl">0</p>
          </div>
          <div className="flex flex-col items-center gap-2" key={'ward'}>
            <h3 className="text-primary text-xl font-semibold tracking-widest">
              Ward
            </h3>
            <p className="text-secondary text-xl">0</p>
          </div>
        </div>
        <h2>Attributes and skills</h2>
        <div className="flex w-full grow flex-col gap-6 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-10">
          {Object.entries(attributeTree.tree).map(
            ([attribute, { points, skills }]) => (
              <div key={attribute}>
                <AttributeCard
                  attribute={attribute}
                  points={points}
                  skills={skills}
                  updatePoints={attributeTree.updatePoints}
                />
              </div>
            ),
          )}
        </div>
        <h2>Starting Perk</h2>
        <p className="text-tertiary sm:px-4 lg:px-6">
          (Available perks are only shown if you meet the attribute and skill
          point requirements)
        </p>
        <PerkList
          perkTree={perkFilter.filteredTree}
          mode="edit"
          checkedPerk={checkedPerk}
          setCheckedPerk={setCheckedPerk}
        />
        <BtnRect type="submit" className="w-full">
          Create
        </BtnRect>
      </form>
    </ThemeContainer>
  );
};

export default CharacterForm;
