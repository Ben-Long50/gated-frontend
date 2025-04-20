import { useForm } from '@tanstack/react-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import BtnRect from './buttons/BtnRect';
import Loading from './Loading';
import FormLayout from '../layouts/FormLayout';
import { useParams } from 'react-router-dom';
import AffiliationBar from './AffiliationBar';
import { Character } from 'src/types/character';
import { Faction } from 'src/types/faction';
import useCreateAffiliationMutation from '../hooks/useCreateAffiliationMutation/useCreateAffiliationMutation';
import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import InputSelectField from './InputSelectField';
import AffiliationIcon from './icons/AffiliationIcon';

const AffiliationForm = ({ title, mode }: { title: string; mode?: string }) => {
  const { apiUrl } = useContext(AuthContext);
  const { factionId, gangId, characterId, affiliationId } = useParams();
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);

  const {
    data: character,
    isLoading,
    isPending,
  } = useActiveCharacterQuery(apiUrl);

  const createAffiliation = useCreateAffiliationMutation(
    apiUrl,
    characterId,
    setFormMessage,
  );

  const affiliation = null;

  const handleReset = async () => {
    affiliationForm.reset();
  };

  const affiliationForm = useForm({
    defaultValues: {
      affiliationType: affiliation?.type || '',
      faction:
        affiliation?.factions.find(
          (faction: Faction) => faction.id !== Number(factionId),
        ) || ({} as Faction),
      character:
        affiliation?.characters.find(
          (character: Character) => character.id !== Number(characterId),
        ) || ({} as Character),
      value: affiliation?.value || 0,
    },

    onSubmit: async ({ value }) => {
      console.log(value);

      const formData = new FormData();

      Object.entries(value).forEach(([key, value]) => {
        if (key === 'picture' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });
      if (mode === 'create' || mode === 'update') {
        await createAffiliation.mutate(formData);
      } else if (mode === 'modify') {
        // await modifyArmor.mutate(formData);
      }
    },
  });

  if (isLoading || isPending) return <Loading />;

  return (
    <FormLayout
      itemId={affiliationId}
      createMutation={createAffiliation}
      handleReset={handleReset}
      formMessage={formMessage}
      deleteMode={deleteMode}
      setDeleteMode={setDeleteMode}
    >
      <form
        className="flex flex-col gap-12"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (createAffiliation.isPending) return;
          affiliationForm.handleSubmit();
        }}
      >
        <h1 className="text-center">{title} Affiliation</h1>
        <div className="flex gap-8">
          <affiliationForm.Field
            name="affiliationType"
            listeners={{
              onChange: () => {
                affiliationForm.setFieldValue('character', '');
                affiliationForm.setFieldValue('faction', '');
              },
            }}
          >
            {(field) => (
              <InputSelectField
                field={field}
                label="Affilitation Type"
                options={['To Faction', 'To Gang', 'To Character']}
              />
            )}
          </affiliationForm.Field>
          <affiliationForm.Subscribe
            selector={(state) => state.values.affiliationType}
          >
            {(type) => {
              switch (type) {
                case 'To Faction':
                  return (
                    <affiliationForm.Field name="faction">
                      {(field) => (
                        <InputSelectField
                          field={field}
                          label="Campaign Factions"
                          options={character.campaign.factions}
                        />
                      )}
                    </affiliationForm.Field>
                  );
                case 'To Gang':
                  return;
                case 'To Character':
                  return (
                    <affiliationForm.Field name="character">
                      {(field) => (
                        <InputSelectField
                          field={field}
                          label="Campaign Characters"
                          options={character.campaign.characters}
                        />
                      )}
                    </affiliationForm.Field>
                  );
                default:
                  return;
              }
            }}
          </affiliationForm.Subscribe>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-12">
          {characterId && (
            <div className="flex items-center gap-8">
              <img
                className="w-24 rounded-full shadow-md shadow-black"
                src={character.picture.imageUrl}
              />
              <h2>{character.firstName + ' ' + character.lastName}</h2>
            </div>
          )}
          <AffiliationIcon className="text-secondary size-16" />
          <affiliationForm.Subscribe
            selector={(state) => [
              state.values.affiliationType,
              state.values.character,
              state.values.faction,
            ]}
          >
            {([type, character, faction]) => {
              switch (type) {
                case 'To Faction':
                  return (
                    faction && (
                      <div className="flex items-center gap-8 place-self-end">
                        <h2>{faction.name}</h2>
                        <img
                          className="size-24 rounded-full object-cover shadow-md shadow-black"
                          src={faction.picture?.imageUrl}
                          alt={faction.name + "'s picture"}
                        />
                      </div>
                    )
                  );
                case 'To Gang':
                  return;
                case 'To Character':
                  return (
                    character && (
                      <div className="flex items-center gap-8 place-self-end">
                        <h2>
                          {character.firstName + ' ' + character.lastName}
                        </h2>
                        <img
                          className="size-24 rounded-full shadow-md shadow-black"
                          src={character.picture?.imageUrl}
                          alt={
                            character.firstName +
                            ' ' +
                            character.lastName +
                            "'s picture"
                          }
                        />
                      </div>
                    )
                  );
                default:
                  return;
              }
            }}
          </affiliationForm.Subscribe>
        </div>

        <div>
          <affiliationForm.Field name="value">
            {(field) => <AffiliationBar field={field} />}
          </affiliationForm.Field>
        </div>
        <BtnRect
          type="submit"
          ariaLabel={title + ' affiliation'}
          className="group w-full"
        >
          {createAffiliation.isPending ? (
            <Loading
              className="group-hover:text-yellow-300 dark:text-gray-900"
              size={1.15}
            />
          ) : (
            title
          )}
        </BtnRect>
      </form>
    </FormLayout>
  );
};

export default AffiliationForm;
