import { useForm, useStore } from '@tanstack/react-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import BtnRect from './buttons/BtnRect';
import InputField from './InputField';
import Loading from './Loading';
import FormLayout from '../layouts/FormLayout';
import InputFieldBasic from './InputFieldBasic';
import { User } from 'src/types/user';
import { Link, useParams } from 'react-router-dom';
import LexicalEditor from './lexical/LexicalEditor';
import useUsersQuery from '../hooks/useUsersQuery/useUsersQuery';
import ItemCardSmall from './ItemCardSmall';
import useCreateCampaignMutation from '../hooks/useCreateCampaignMutation/useCreateCampaignMutation';
import ArrowHeader2 from './ArrowHeader2';
import AffiliationBar from './AffiliationBar';
import Divider from './Divider';
import useCampaignQuery from '../hooks/useCampaignQuery/useCampaignQuery';
import useDeleteCampaignMutation from '../hooks/useDeleteCampaignMutation/useDeleteCampaignMutation';
import PictureField from './form_fields/PictureField';
import AccountPicture from './AccountPicture';
import InputSelectField from './InputSelectField';

const CampaignForm = ({ title, mode }: { title: string; mode?: string }) => {
  const { apiUrl } = useContext(AuthContext);
  const { campaignId } = useParams();
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const [nameQuery, setNameQuery] = useState('');

  const createCampaign = useCreateCampaignMutation(
    apiUrl,
    setFormMessage,
    Number(campaignId),
  );

  const deleteCampaign = useDeleteCampaignMutation(
    apiUrl,
    Number(campaignId),
    setFormMessage,
  );

  const { data: campaign, isLoading } = useCampaignQuery(
    apiUrl,
    Number(campaignId),
  );

  const {
    data: users,
    isLoading: usersLoading,
    isPending: usersPending,
  } = useUsersQuery(apiUrl, nameQuery);

  const handleReset = async () => {
    campaignForm.reset();
  };

  const handleDelete = () => {
    if (deleteMode) {
      deleteCampaign.mutate();
    } else {
      setDeleteMode(true);
    }
  };

  const campaignForm = useForm({
    defaultValues: {
      id: campaignId || 0,
      name: campaign?.name || '',
      location: campaign?.location || '',
      picture: campaign?.picture || '',
      position: campaign?.picture?.position || { x: 50, y: 50 },
      factions:
        campaign?.factions ||
        ([
          { factionType: '', name: '' },
          { factionType: '', name: '' },
        ] as { factionType: string; name: string }[]),
      affiliation: 0,
      briefing: {} as { html: string; nodes: string },
      players: campaign?.players || ([] as User[]),
      pendingPlayers: campaign?.pendingPlayers || ([] as User[]),
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
      if (mode === 'create' || mode === 'update') {
        await createCampaign.mutate(formData);
      }
    },

    validators: {
      onSubmit: ({ value }) => {
        if ([...value.players, ...value.pendingPlayers].length < 1) {
          return 'You must invite or have a minimum of one active player to create or update this campaign';
        }
        return undefined;
      },
    },
  });

  const formErrorMap = useStore(campaignForm.store, (state) => state.errorMap);

  if (isLoading) return <Loading />;

  return (
    <FormLayout
      itemId={campaignId}
      createMutation={createCampaign}
      modifyMutation={createCampaign}
      deleteMutation={deleteCampaign}
      handleDelete={handleDelete}
      handleReset={handleReset}
      formMessage={formMessage}
      deleteMode={deleteMode}
      setDeleteMode={setDeleteMode}
    >
      <form
        className="flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (createCampaign.isPending) return;
          campaignForm.handleSubmit();
        }}
      >
        <div className="flex items-center justify-center gap-4">
          <h1>{title} Campaign</h1>
        </div>
        <Divider />
        <ArrowHeader2 title="Campaign Information" />
        <p className="text-tertiary border-l-2 border-gray-400 border-opacity-50 pl-4">
          Welcome to campaign creation! This page should only be filled out if
          you intend to act as the game master for an upcoming game. If that's
          the case then continue on and craft the perfect cybermystic,
          apocalyptic, metropolitan hellscape for your players to endure. The
          information you provide will act as the backbone for your campaign's
          narrative.
        </p>
        <campaignForm.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Campaign name must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => (
            <InputField className="grow" label="Campaign name" field={field} />
          )}
        </campaignForm.Field>
        <campaignForm.Field
          name="location"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Campaign location name must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => (
            <InputField label="Campaign location (city name)" field={field} />
          )}
        </campaignForm.Field>
        <PictureField
          form={campaignForm}
          sizeInfo={{
            aspectRatio: '10/3',
            maxHeight: '',
            minHeight: '',
          }}
        />
        <Divider />
        <ArrowHeader2 title="Campaign Factions" />
        <p className="text-tertiary border-l-2 border-gray-400 border-opacity-50 pl-4">
          Decide which warring factions (The Powers that Be) of GatED will be
          present in your campaign. It is strongly recommended that a standard
          campaign include 2 major factions vying for power of the game's city.
          The factions chosen should shape the entire narrative of your story.
          Everything from NPCs, gameplay encounters and environment aesthetics
          should be derived from the characteristics of the chosen factions. In
          depth information about each faction can be found{' '}
          <span className="text-accent hover:underline">
            <Link to="/glam/codex/book/31">here.</Link>
          </span>{' '}
          Choose wisely!
        </p>
        <campaignForm.Field name="factions" mode="array">
          {(field) => (
            <div className="flex w-full flex-col gap-4 lg:gap-8">
              {field.state.value.map((_, i: number) => {
                return (
                  <div className="flex w-full flex-col gap-4" key={i}>
                    <campaignForm.Field
                      name={`factions[${i}].factionType`}
                      validators={{
                        onSubmit: ({ value }) =>
                          !value ? 'Select a faction type' : undefined,
                      }}
                    >
                      {(subfield) => (
                        <InputSelectField
                          className="w-full"
                          label="Faction type"
                          field={subfield}
                          options={[
                            'curchOfElShaddai',
                            'corporateHoldouts',
                            'federalReservists',
                            'noblebloods',
                          ]}
                        />
                      )}
                    </campaignForm.Field>
                    <campaignForm.Field
                      name={`factions[${i}].name`}
                      validators={{
                        onSubmit: ({ value }) =>
                          !value
                            ? 'Create a unique name for this faction'
                            : undefined,
                      }}
                    >
                      {(subfield) => (
                        <InputField field={subfield} label="Faction name" />
                      )}
                    </campaignForm.Field>
                  </div>
                );
              })}
            </div>
          )}
        </campaignForm.Field>
        {!campaignId && (
          <>
            <Divider />
            <ArrowHeader2 title="Starting Faction Affiliation" />
            <p className="text-tertiary border-l-2 border-gray-400 border-opacity-50 pl-4">
              On the scale shown below, choose the starting relationship between
              your two major factions. This chosen relationship will help guide
              the campaign narrative and give insight into the benefits and
              consequences of potential alliances or rivalries for the players
              taking part in the campaign.
            </p>
            <campaignForm.Field name="affiliation">
              {(field) => <AffiliationBar field={field} />}
            </campaignForm.Field>

            <div className="flex flex-col gap-8">
              <Divider />
              <ArrowHeader2 title="Session 0 Briefing" />
              <p className="text-tertiary border-l-2 border-gray-400 border-opacity-50 pl-4">
                Craft a backstory for your upcoming campaign. This backstory
                will serve as the first taste of the world for your campaign
                participants and act as a starting point for the campaign's
                overarching narrative. The text entered below will be shown to
                your campaign's participants as a "Session 0" introduction
                briefing. Remember, your story should integrate the factions
                chosen above, weaving their influence throughout as much of the
                storytelling as possible. The world of GatED is a dark and
                brutal place; danger, betrayal and action can be found around
                every corner of the city streets.
              </p>
              <campaignForm.Field
                name="briefing"
                validators={{
                  onChange: ({ value }) =>
                    value.html.length < 20
                      ? 'Section content has not met the minimum length requirement'
                      : undefined,
                }}
              >
                {(field) => (
                  <>
                    <LexicalEditor field={field} />
                    {field.state.meta.errors &&
                      field.state.meta.errors.map((error, index) => (
                        <p
                          key={index}
                          className="timing text-error text-base italic leading-5"
                          role="alert"
                        >
                          {error}
                        </p>
                      ))}
                  </>
                )}
              </campaignForm.Field>
            </div>
          </>
        )}
        <div className="flex flex-col gap-8">
          <Divider />
          <ArrowHeader2 title="Invite Players" />
          <p className="text-tertiary border-l-2 border-gray-400 border-opacity-50 pl-4">
            Search for the usernames of the friends you want to invite to this
            campaign and check the box next to their names. When the campaign is
            created, invitations to join the campaign will be sent to those
            friends. Until each of the chosen friends have accepted the
            invitation the campaign will be in a pending state. After all the
            chosen players have accepted, all the features of campaign gameplay
            will be unlocked and you can begin your first session!
          </p>
          <InputFieldBasic
            label="Search users"
            onChange={(value: string) => {
              setNameQuery(value);
            }}
          />
          <campaignForm.Subscribe
            selector={(state) => [
              state.values.players,
              state.values.pendingPlayers,
            ]}
          >
            {([players, pendingPlayers]) => {
              if ([...players, ...pendingPlayers].length > 0) {
                return <ArrowHeader2 title="Selected Players" />;
              }
              return null;
            }}
          </campaignForm.Subscribe>
          <div className="flex flex-col gap-4">
            <campaignForm.Field name="players">
              {(field) => {
                const playerArray = field.state.value;

                return (
                  <>
                    {playerArray.map((user: User) => (
                      <div className="flex items-center gap-4" key={user.id}>
                        <ItemCardSmall
                          heading={
                            <div className="flex w-full items-center justify-between">
                              <div className="flex items-center gap-8">
                                <AccountPicture
                                  className="opacity-50"
                                  user={user}
                                />
                                <h3>{user.username}</h3>
                              </div>
                            </div>
                          }
                        />
                        <input
                          className="size-8"
                          type="checkbox"
                          checked={true}
                          onChange={() => {
                            field.handleChange((prev: User[]) => {
                              if (
                                prev.some(
                                  (player: User) => player.id === user.id,
                                )
                              ) {
                                return prev.filter(
                                  (player: User) => player.id !== user.id,
                                );
                              } else {
                                return [...prev, user];
                              }
                            });
                          }}
                        />
                      </div>
                    ))}
                  </>
                );
              }}
            </campaignForm.Field>
            <campaignForm.Field name="pendingPlayers">
              {(field) => {
                const playerArray = field.state.value;

                return (
                  <>
                    {playerArray.map((user: User) => (
                      <div className="flex items-center gap-4" key={user.id}>
                        <ItemCardSmall
                          heading={
                            <div className="flex w-full items-center justify-between">
                              <div className="flex items-center gap-8">
                                <AccountPicture
                                  className="opacity-50"
                                  user={user}
                                />
                                <h3>{user.username}</h3>
                                <p className="text-tertiary">(Pending)</p>
                              </div>
                            </div>
                          }
                        />
                        <input
                          className="size-8"
                          type="checkbox"
                          checked={true}
                          onChange={() => {
                            field.handleChange((prev: User[]) => {
                              if (
                                prev.some(
                                  (player: User) => player.id === user.id,
                                )
                              ) {
                                return prev.filter(
                                  (player: User) => player.id !== user.id,
                                );
                              } else {
                                return [...prev, user];
                              }
                            });
                          }}
                        />
                      </div>
                    ))}
                    {field.state.value.length > 0 && <Divider />}
                    {usersLoading || usersPending ? (
                      <Loading />
                    ) : (
                      users?.map((user: User) => {
                        const status = playerArray.some(
                          (player: User) => player.id === user.id,
                        );
                        return (
                          <div
                            className="flex items-center gap-4"
                            key={user.id}
                          >
                            <ItemCardSmall
                              heading={
                                <div className="flex w-full items-center justify-between">
                                  <div className="flex items-center gap-8">
                                    <AccountPicture
                                      className="opacity-50"
                                      user={user}
                                    />
                                    <h3>{user.username}</h3>
                                  </div>
                                </div>
                              }
                            />
                            <input
                              className="size-8"
                              type="checkbox"
                              checked={status}
                              onChange={() => {
                                field.handleChange((prev: User[]) => {
                                  if (
                                    prev.some(
                                      (player: User) => player.id === user.id,
                                    )
                                  ) {
                                    return prev.filter(
                                      (player: User) => player.id !== user.id,
                                    );
                                  } else {
                                    return [...prev, user];
                                  }
                                });
                              }}
                            />
                          </div>
                        );
                      })
                    )}
                  </>
                );
              }}
            </campaignForm.Field>
          </div>
        </div>
        {formErrorMap ? (
          <div>
            <em className="text-error">{formErrorMap.onSubmit}</em>
          </div>
        ) : null}
        <BtnRect
          ariaLabel={`${title} campaign`}
          type="submit"
          className="group w-full"
        >
          {createCampaign.isPending ? (
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

export default CampaignForm;
