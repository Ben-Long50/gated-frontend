import { useForm } from '@tanstack/react-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import BtnRect from './buttons/BtnRect';
import Loading from './Loading';
import FormLayout from '../layouts/FormLayout';
import { Link, useParams } from 'react-router-dom';
import AffiliationBar from './AffiliationBar';
import { Character } from 'src/types/character';
import { Faction } from 'src/types/faction';
import useCreateAffiliationMutation from '../hooks/useCreateAffiliationMutation/useCreateAffiliationMutation';
import InputSelectField from './InputSelectField';
import AffiliationIcon from './icons/AffiliationIcon';
import { Gang } from 'src/types/gang';
import { LayoutContext } from '../contexts/LayoutContext';
import useUpdateAffiliationMutation from '../hooks/useUpdateAffiliationMutation/useUpdateAffiliationMutation';
import useAffiliationQuery from '../hooks/useAffiliationQuery/useAffiliationQuery';
import useDeleteAffiliationMutation from '../hooks/useDeleteAffiliationMutation/useDeleteAffiliationMutation';
import useFactionQuery from '../hooks/useFactionQuery/useFactionQuery';
import ArrowHeader3 from './ArrowHeader3';
import useCharacterQuery from 'src/hooks/useCharacterQuery/useCharacterQuery';
import useCampaignQuery from 'src/hooks/useCampaignQuery/useCampaignQuery';
import ArrowHeader4 from './ArrowHeader4';
import CharacterPictureRound from './CharacterPictureRound';

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
  } = useCharacterQuery(apiUrl, Number(characterId));

  const {
    data: campaign,
    isLoading: campaignLoading,
    isPending: campaignPending,
  } = useCampaignQuery(apiUrl, character?.campaignId);

  console.log(character, campaign);

  const {
    data: faction,
    isLoading: factionLoading,
    isPending: factionPending,
  } = useFactionQuery(apiUrl, Number(factionId));

  const {
    data: affiliation,
    isLoading: affiliationLoading,
    isPending: affiliationPending,
  } = useAffiliationQuery(apiUrl, Number(affiliationId));

  const isLoading =
    characterLoading || campaignLoading || factionLoading || affiliationLoading;

  const isPending =
    characterPending || campaignPending || factionPending || affiliationPending;

  const createAffiliation = useCreateAffiliationMutation(
    apiUrl,
    setFormMessage,
    Number(factionId),
    Number(gangId),
    Number(characterId),
  );

  const updateAffiliation = useUpdateAffiliationMutation(
    apiUrl,
    Number(affiliationId),
    setFormMessage,
    Number(factionId),
    Number(characterId),
  );

  const deleteAffiliation = useDeleteAffiliationMutation(
    apiUrl,
    Number(affiliationId),
    setFormMessage,
    Number(factionId),
    Number(characterId),
  );

  const secondaryFaction =
    affiliation?.factions.find(
      (faction: Faction) => faction.id !== Number(factionId),
    ) || null;

  const secondaryGang =
    affiliation?.gangs.find((gang: Gang) => gang.id !== Number(gangId)) || null;

  const secondaryCharacter =
    affiliation?.characters.find(
      (character: Character) => character?.id !== Number(characterId),
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

  if (isLoading) return <Loading />;

  if (!campaign) {
    return (
      <div className="flex w-full max-w-7xl flex-col items-center gap-8">
        <h1 className="w-full text-center">Create Affiliation</h1>
        <h3 className="text-center">
          Your active character is not associated with a campaign. Update your
          character information with a campaign to access affiliations.
        </h3>
        <Link to={`/glam/characters/${character?.id}`}>
          <BtnRect type="button" ariaLabel="Character sheet">
            Character Sheet
          </BtnRect>
        </Link>
      </div>
    );
  }

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
                  options={['toFaction', 'toGang', 'toCharacter']}
                />
              )}
            </affiliationForm.Field>
            <affiliationForm.Subscribe
              selector={(state) => state.values.affiliationType}
            >
              {(type) => (
                <>
                  {type === 'toFaction' && (
                    <affiliationForm.Field name="faction">
                      {(field) => (
                        <InputSelectField
                          field={field}
                          label="Campaign Factions"
                          options={
                            factionId
                              ? campaign?.factions.filter(
                                  (faction: Faction) =>
                                    faction.id !== Number(factionId),
                                )
                              : campaign?.factions
                          }
                        />
                      )}
                    </affiliationForm.Field>
                  )}
                  {type === 'toGang' && (
                    <affiliationForm.Field name="gang">
                      {(field) => (
                        <InputSelectField
                          field={field}
                          label="Campaign Gangs"
                          options={
                            gangId
                              ? campaign?.gangs.filter(
                                  (gang: Gang) => gang.id !== Number(gangId),
                                )
                              : campaign?.gangs
                          }
                        />
                      )}
                    </affiliationForm.Field>
                  )}
                  {type === 'toCharacter' && (
                    <affiliationForm.Field name="character">
                      {(field) => (
                        <InputSelectField
                          field={field}
                          label="Campaign Characters"
                          options={
                            characterId
                              ? campaign?.characters.filter(
                                  (character: Character) =>
                                    character.id !== Number(characterId),
                                )
                              : campaign?.characters
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
            <div className={`flex items-center gap-4 justify-self-start`}>
              <CharacterPictureRound character={character} />
              <ArrowHeader4
                title={character?.firstName + ' ' + character?.lastName}
              />
            </div>
          )}
          {factionId && (
            <div className={`flex items-center gap-4 justify-self-start`}>
              <CharacterPictureRound character={faction} />
              <ArrowHeader4 title={faction.name} />
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
                case 'toFaction':
                  return (
                    faction && (
                      <div
                        className={`flex items-center gap-4 justify-self-end`}
                      >
                        <ArrowHeader4
                          className="text-right"
                          title={faction.name}
                          reverse={true}
                        />
                        <CharacterPictureRound character={faction} />
                      </div>
                    )
                  );
                case 'toGang':
                  return;
                case 'toCharacter':
                  return (
                    character && (
                      <div
                        className={`flex items-center gap-4 justify-self-end`}
                      >
                        <ArrowHeader4
                          className="text-right"
                          title={
                            character?.firstName + ' ' + character?.lastName
                          }
                          reverse={true}
                        />
                        <CharacterPictureRound character={character} />
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
