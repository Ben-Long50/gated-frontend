import { useForm, ValidationError } from '@tanstack/react-form';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import BtnRect from './buttons/BtnRect';
import InputField from './InputField';
import Loading from './Loading';
import FormLayout from '../layouts/FormLayout';
import InputFieldBasic from './InputFieldBasic';
import SelectField from './SelectField';
import { User } from 'src/types/user';
import { Link, useParams } from 'react-router-dom';
import LexicalEditor from './lexical/LexicalEditor';
import useUsersQuery from '../hooks/useUsersQuery/useUsersQuery';
import ItemCardSmall from './ItemCardSmall';
import { mdiCloseBox, mdiImagePlus } from '@mdi/js';
import Icon from '@mdi/react';
import useCreateCampaignMutation from '../hooks/useCreateCampaignMutation/useCreateCampaignMutation';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import ArrowHeader3 from './ArrowHeader3';
import AffiliationBar from './AffiliationBar';
import Divider from './Divider';

const CampaignForm = ({ title, mode }: { title: string; mode?: string }) => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const { campaignId } = useParams();
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const [nameQuery, setNameQuery] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const createCampaign = useCreateCampaignMutation(apiUrl, setFormMessage);

  const campaign = null;

  useEffect(() => {
    if (campaign) {
      setImagePreview(campaign.picture?.imageUrl);
    } else setImagePreview('');
  }, [campaign, campaignId]);

  const {
    data: users,
    isLoading: usersLoading,
    isPending: usersPending,
  } = useUsersQuery(apiUrl, nameQuery);

  const handleReset = async () => {
    campaignForm.reset();
  };

  const campaignForm = useForm({
    defaultValues: {
      name: campaign?.name || '',
      location: campaign?.location || '',
      picture: campaign?.picture || '',
      factions:
        campaign?.factions ||
        ([
          { factionType: '', name: '' },
          { factionType: '', name: '' },
        ] as { factionType: string; name: string }[]),
      affiliation: 0,
      briefing: campaign?.briefing || ({} as { html: string; nodes: string }),
      players: campaign?.players || ([] as User[]),
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
      formData.append('campaignId', JSON.stringify(campaignId || 0));
      if (mode === 'create' || mode === 'update') {
        await createCampaign.mutate(formData);
      } else if (mode === 'modify') {
        // await modifyArmor.mutate(formData);
      }
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      campaignForm.setFieldValue('picture', selectedFile);

      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

  return (
    <FormLayout
      itemId={campaignId}
      createMutation={createCampaign}
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
        <p className="ml-4 border-l border-zinc-200 border-opacity-50 px-4">
          Welcome to campaign creation! This page should only be filled out if
          you intend to act as the game master for an upcoming game. If that's
          the case then continue on and craft the perfect cybermystic,
          apocalyptic, metropolitan hellscape for your players to endure. The
          information you provide will act as the backbone for your campaign's
          narrative.
        </p>
        <ArrowHeader3 title="Basic Campaign Information" />
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
        <ThemeContainer
          className="mx-auto w-full"
          chamfer="medium"
          borderColor={accentPrimary}
        >
          {!imagePreview ? (
            <label className="bg-secondary flex aspect-[5/2] w-full cursor-pointer flex-col items-center justify-center clip-6">
              <div className="flex flex-col items-center justify-center gap-2 pb-6 pt-5">
                <Icon className="text-tertiary" path={mdiImagePlus} size={3} />
                <p className="text-tertiary font-semibold">
                  Upload campaign cover picture
                </p>
                <p className="text-tertiary">PNG, JPG, JPEG</p>
              </div>
              <input
                id="file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="bg-secondary relative flex aspect-[5/2] w-full items-center justify-center overflow-hidden bg-black clip-6">
              <img
                className="fade-in-bottom"
                src={imagePreview}
                alt="Preview"
              />
              <button
                className="text-secondary absolute right-2 top-2"
                onClick={() => {
                  campaignForm.setFieldValue('picture', '');
                  setImagePreview('');
                }}
              >
                <Icon path={mdiCloseBox} size={1.5} />
              </button>
            </div>
          )}
        </ThemeContainer>
        <ArrowHeader3 title="Campaign Factions" />
        <p className="ml-4 border-l border-zinc-200 border-opacity-50 px-4">
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
                        <SelectField
                          className="w-full"
                          label="Faction type"
                          field={subfield}
                        >
                          <option value=""></option>
                          <option value="churchOfElShaddai">
                            Church of El Shaddai
                          </option>
                          <option value="corporateHoldouts">
                            Corporate Holdouts
                          </option>
                          <option value="federalReservists">
                            Federal Reservists
                          </option>
                          <option value="noblebloods">Noblebloods</option>
                        </SelectField>
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
              <div className="my-auto flex items-center justify-end gap-4 self-end sm:col-start-2 lg:gap-8">
                <button
                  className="text-accent self-end hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    field.pushValue('');
                  }}
                  type="button"
                >
                  Add a faction
                </button>
              </div>
            </div>
          )}
        </campaignForm.Field>
        <ArrowHeader3 title="Starting Faction Affiliation" />
        <p className="ml-4 border-l border-zinc-200 border-opacity-50 px-4">
          On the scale shown below, choose the starting relationship between
          your two major factions. This chosen relationship will help guide the
          campaign narrative and give insight into the benefits and consequences
          of potential alliances or rivalries for the players taking part in the
          campaign.
        </p>
        <campaignForm.Field name="affiliation">
          {(field) => <AffiliationBar field={field} />}
        </campaignForm.Field>
        <div className="flex flex-col gap-8">
          <ArrowHeader3 title="Campaign Briefing" />
          <p className="ml-4 border-l border-zinc-200 border-opacity-50 px-4">
            Craft a backstory for your upcoming campaign. This backstory will
            serve as the first taste of the world for your campaign participants
            and act as a starting point for the campaign's overarching
            narrative. The text entered below will be shown to your campaign's
            participants as a "Session 0" introduction briefing. Remember, your
            story should integrate the factions chosen above, weaving their
            influence throughout as much of the storytelling as possible. The
            world of GatED is a dark and brutal place; danger, betrayal and
            action can be found around every corner of the city streets.
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
        <div className="flex flex-col gap-8">
          <ArrowHeader3 title="Invite Players" />
          <p className="ml-4 border-l border-zinc-200 border-opacity-50 px-4">
            Search for the names of the friends you want to invite to this
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
          ></InputFieldBasic>
          <campaignForm.Field
            name="players"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'You must invite at least 2 players to create a campaign'
                  : undefined,
            }}
          >
            {(field) => {
              const playerArray = field.state.value;

              return (
                <div className="flex flex-col gap-4">
                  {field.state.meta.errors &&
                    field.state.meta.errors.map((error: ValidationError) => (
                      <p
                        key={error?.toString()}
                        className="timing text-error mt-1 text-base italic leading-5"
                        role="alert"
                      >
                        {error}
                      </p>
                    ))}
                  {field.state.value.length > 0 && (
                    <ArrowHeader3 title="Selected Players" />
                  )}

                  {playerArray.map((user: User) => (
                    <div className="flex items-center gap-4" key={user.id}>
                      <ItemCardSmall
                        heading={
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-8">
                              <img
                                className="size-10 rounded-full"
                                src={user.profilePicture}
                                alt={
                                  user.firstName +
                                  ' ' +
                                  user.lastName +
                                  "'s" +
                                  ' profile picture'
                                }
                              />
                              <h3>{user.firstName + ' ' + user.lastName}</h3>
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
                              prev.some((player: User) => player.id === user.id)
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
                    users.map((user: User) => {
                      const status = playerArray.some(
                        (player: User) => player.id === user.id,
                      );
                      return (
                        <div className="flex items-center gap-4" key={user.id}>
                          <ItemCardSmall
                            heading={
                              <div className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-8">
                                  <img
                                    className="size-10 rounded-full"
                                    src={user.profilePicture}
                                    alt={
                                      user.firstName +
                                      ' ' +
                                      user.lastName +
                                      "'s" +
                                      ' profile picture'
                                    }
                                  />
                                  <h3>
                                    {user.firstName + ' ' + user.lastName}
                                  </h3>
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
                </div>
              );
            }}
          </campaignForm.Field>
        </div>
        <BtnRect type="submit" className="group w-full">
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
