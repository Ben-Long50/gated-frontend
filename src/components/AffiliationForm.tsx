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
import ArrowHeader2 from './ArrowHeader2';
import { Gang } from 'src/types/gang';
import { LayoutContext } from '../contexts/LayoutContext';
import useUpdateAffiliationMutation from '../hooks/useUpdateAffiliationMutation/useUpdateAffiliationMutation';
import useAffiliationQuery from '../hooks/useAffiliationQuery/useAffiliationQuery';
import useDeleteAffiliationMutation from '../hooks/useDeleteAffiliationMutation/useDeleteAffiliationMutation';

const AffiliationForm = ({ title, mode }: { title: string; mode?: string }) => {
  const { apiUrl } = useContext(AuthContext);
  const { mobile } = useContext(LayoutContext);
  const { factionId, gangId, characterId, affiliationId } = useParams();
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);

  const {
    data: character,
    isLoading: characterLoading,
    isPending: characterPending,
  } = useActiveCharacterQuery(apiUrl);

  const {
    data: affiliation,
    isLoading: affiliationLoading,
    isPending: affiliationPending,
  } = useAffiliationQuery(apiUrl, affiliationId);

  console.log(affiliation);

  const createAffiliation = useCreateAffiliationMutation(
    apiUrl,
    setFormMessage,
    factionId,
    gangId,
    characterId,
  );

  const updateAffiliation = useUpdateAffiliationMutation(
    apiUrl,
    affiliationId,
    setFormMessage,
  );

  const deleteAffiliation = useDeleteAffiliationMutation(
    apiUrl,
    affiliationId,
    setFormMessage,
  );

  const secondaryFaction =
    affiliation?.factions.find(
      (faction: Faction) => faction.id !== Number(factionId),
    ) || null;

  const secondaryGang =
    affiliation?.gangs.find((gang: Gang) => gang.id !== Number(gangId)) || null;

  const secondaryCharacter =
    affiliation?.characters.find(
      (character: Character) => character.id !== Number(characterId),
    ) || null;

  const handleDelete = () => {
    if (deleteMode && affiliationId) {
      deleteAffiliation.mutate();
    } else {
      setDeleteMode(true);
    }
  };

  const handleReset = async () => {
    affiliationForm.reset();
  };

  const affiliationForm = useForm({
    defaultValues: {
      affiliationType: secondaryFaction
        ? 'To Faction'
        : secondaryGang
          ? 'To Gang'
          : (secondaryCharacter && 'To Character') || '',
      faction: secondaryFaction || '',
      gang: secondaryGang || '',
      character: secondaryCharacter || '',
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
      if (mode === 'create') {
        await createAffiliation.mutate(formData);
      } else if (mode === 'update') {
        await updateAffiliation.mutate(value.value);
      }
    },
  });

  if (
    characterLoading ||
    characterPending ||
    affiliationLoading ||
    affiliationPending
  )
    return <Loading />;

  return (
    <FormLayout
      itemId={affiliationId}
      createMutation={createAffiliation}
      modifyMutation={updateAffiliation}
      deleteMutation={deleteAffiliation}
      handleReset={handleReset}
      formMessage={formMessage}
      handleDelete={handleDelete}
      deleteMode={deleteMode}
      setDeleteMode={setDeleteMode}
    >
      <form
        className={`flex flex-col gap-8`}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (createAffiliation.isPending) return;
          affiliationForm.handleSubmit();
        }}
      >
        <h1 className="text-center">{title} Affiliation</h1>
        {mode !== 'update' && (
          <div
            className={`${mobile ? 'flex-col gap-4' : 'flex-row gap-8'} flex w-full`}
          >
            <affiliationForm.Field
              name="affiliationType"
              listeners={{
                onChange: ({ value }) => {
                  affiliationForm.reset({
                    affiliationType: value,
                    faction: '',
                    gang: '',
                    character: '',
                    value: 0,
                  });
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
              {(type) => (
                <>
                  {type === 'To Faction' && (
                    <affiliationForm.Field name="faction">
                      {(field) => (
                        <InputSelectField
                          field={field}
                          label="Campaign Factions"
                          options={
                            factionId
                              ? character.campaign.factions.filter(
                                  (faction: Faction) =>
                                    faction.id !== Number(factionId),
                                )
                              : character.campaign.factions
                          }
                        />
                      )}
                    </affiliationForm.Field>
                  )}
                  {type === 'To Gang' && (
                    <affiliationForm.Field name="gang">
                      {(field) => (
                        <InputSelectField
                          field={field}
                          label="Campaign Gangs"
                          options={
                            gangId
                              ? character.campaign.gangs.filter(
                                  (gang: Gang) => gang.id !== Number(gangId),
                                )
                              : character.campaign.gangs
                          }
                        />
                      )}
                    </affiliationForm.Field>
                  )}
                  {type === 'To Character' && (
                    <affiliationForm.Field name="character">
                      {(field) => (
                        <InputSelectField
                          field={field}
                          label="Campaign Characters"
                          options={
                            characterId
                              ? character.campaign.characters.filter(
                                  (character: Character) =>
                                    character.id !== Number(characterId),
                                )
                              : character.campaign.characters
                          }
                        />
                      )}
                    </affiliationForm.Field>
                  )}
                </>
              )}
            </affiliationForm.Subscribe>
          </div>
        )}
        <div
          className={`${mobile ? 'grid-rows-[auto_auto_auto] place-items-center' : 'grid-cols-[1fr_auto_1fr] gap-8'} grid items-center`}
        >
          {characterId && (
            <div className={`${mobile ? 'gap-4' : 'gap-8'} flex items-center`}>
              <img
                className={`${mobile ? 'size-14' : 'size-20'} rounded-full shadow-md shadow-black`}
                src={character.picture.imageUrl}
              />
              <ArrowHeader2
                title={character.firstName + ' ' + character.lastName}
              />
            </div>
          )}
          <AffiliationIcon
            className={`${mobile ? 'size-10' : 'size-12'} text-tertiary`}
          />
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
                      <div
                        className={`${mobile ? 'gap-4' : 'gap-8'} flex items-center`}
                      >
                        <ArrowHeader2
                          className="text-right"
                          title={faction.name}
                          reverse={true}
                        />
                        <img
                          className={`${mobile ? 'size-14' : 'size-20'} rounded-full shadow-md shadow-black`}
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
                      <div
                        className={`${mobile ? 'gap-4' : 'gap-8'} flex items-center`}
                      >
                        <ArrowHeader2
                          className="text-right"
                          title={character.firstName + ' ' + character.lastName}
                          reverse={true}
                        />
                        <img
                          className={`${mobile ? 'size-14' : 'size-20'} rounded-full shadow-md shadow-black`}
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
