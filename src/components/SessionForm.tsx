import { useForm, ValidationError } from '@tanstack/react-form';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import BtnRect from './buttons/BtnRect';
import InputField from './InputField';
import Loading from './Loading';
import FormLayout from '../layouts/FormLayout';
import { useParams } from 'react-router-dom';
import LexicalEditor from './lexical/LexicalEditor';
import { mdiClose, mdiCloseBox, mdiImagePlus } from '@mdi/js';
import Icon from '@mdi/react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import ArrowHeader2 from './ArrowHeader2';
import Divider from './Divider';
import { Character } from 'src/types/character';
import useCreateSessionMutation from '../hooks/useCreateSessionMutation/useCreateSessionMutation';
import useCampaignQuery from '../hooks/useCampaignQuery/useCampaignQuery';
import InputSelectField from './InputSelectField';
import useSessionQuery from '../hooks/useSessionQuery/useSessionQuery';

const SessionForm = ({ title, mode }: { title: string; mode?: string }) => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const { campaignId, sessionId } = useParams();
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const {
    data: campaign,
    isLoading: campaignLoading,
    isPending: campaignPending,
  } = useCampaignQuery(apiUrl, Number(campaignId));

  const createSession = useCreateSessionMutation(
    apiUrl,
    Number(campaignId),
    setFormMessage,
    Number(sessionId),
  );

  const {
    data: session,
    isLoading: sessionLoading,
    isPaused: sessionPending,
  } = useSessionQuery(apiUrl, Number(campaignId), Number(sessionId));

  const isLoading = campaignLoading || sessionLoading;
  const isPending = campaignPending || sessionPending;

  const playerCharacters =
    campaign?.characters.filter(
      (character: Character) => character.playerCharacter === true,
    ) || [];

  const nonPlayerCharacters =
    campaign?.characters.filter(
      (character: Character) => character.playerCharacter === false,
    ) || [];

  const sessionPlayerCharacters =
    session?.characters.filter((character) => character.playerCharacter) || [];

  const sessionNonPlayerCharacters =
    session?.characters.filter((character) => !character.playerCharacter) || [];

  useEffect(() => {
    if (session) {
      setImagePreview(session.picture?.imageUrl);
    } else setImagePreview('');
  }, [session, sessionId]);

  const handleReset = async () => {
    sessionForm.reset();
  };

  const sessionForm = useForm({
    defaultValues: {
      name: session?.name || '',
      location: session?.location || '',
      picture: session?.picture || '',
      playerCharacters:
        sessionPlayerCharacters.length > 0
          ? sessionPlayerCharacters
          : ([] as Character[]),
      nonPlayerCharacters:
        sessionNonPlayerCharacters.length > 0
          ? sessionNonPlayerCharacters
          : ([] as Character[]),
      briefing: session?.briefing || ({} as { html: string; nodes: string }),
    },

    onSubmit: async ({ value }) => {
      const { playerCharacters, nonPlayerCharacters, ...data } = {
        id: Number(sessionId),
        ...value,
        characters: [...value.playerCharacters, ...value.nonPlayerCharacters]
          .filter((character: Character) => !!character)
          .map((character: Character) => character.id),
      };

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'picture' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });
      if (mode === 'create' || mode === 'update') {
        await createSession.mutate(formData);
      }
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      sessionForm.setFieldValue('picture', selectedFile);

      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

  if (isLoading || isPending) return <Loading />;

  return (
    <FormLayout
      itemId={sessionId}
      createMutation={createSession}
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
          if (createSession.isPending) return;
          sessionForm.handleSubmit();
        }}
      >
        <div className="flex items-center justify-center gap-4">
          <h1>{title} Session</h1>
        </div>
        <p className="ml-4 border-l border-gray-400 px-4">
          Create a new session for your campaign. Provide a name, optional
          starting location and optional cover picture for this gameplay
          session. To create a session, you must add at least 2 player
          characters to join. Optionally, you can add your NPCs as well.
        </p>
        <ArrowHeader2 title="Session Information" />
        <sessionForm.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Session name must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => (
            <InputField className="grow" label="Session name" field={field} />
          )}
        </sessionForm.Field>
        <sessionForm.Field name="location">
          {(field) => <InputField label="Session location" field={field} />}
        </sessionForm.Field>
        <ThemeContainer
          className="mx-auto w-full"
          chamfer="medium"
          borderColor={accentPrimary}
          overflowHidden={true}
        >
          {!imagePreview ? (
            <label className="bg-secondary flex aspect-[5/2] w-full cursor-pointer flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-2 pb-6 pt-5">
                <Icon className="text-tertiary" path={mdiImagePlus} size={3} />
                <p className="text-tertiary font-semibold">
                  Upload session cover picture
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
                onClick={(e) => {
                  e.preventDefault();
                  sessionForm.setFieldValue('picture', '');
                  setImagePreview('');
                }}
              >
                <Icon path={mdiCloseBox} size={1.5} />
              </button>
            </div>
          )}
        </ThemeContainer>
        <Divider />
        <div className="flex flex-col gap-8">
          <ArrowHeader2 title="Add Characters" />
          <sessionForm.Field
            mode="array"
            name="playerCharacters"
            validators={{
              onChange: ({ value }) =>
                value.length < 1
                  ? 'You must invite at least 2 player characters to create a session'
                  : undefined,
            }}
          >
            {(field) => {
              return (
                <div className="flex w-full flex-col gap-4">
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
                    {field.state.value.map((_: unknown, i: number) => (
                      <sessionForm.Field
                        key={i}
                        name={`playerCharacters[${i}]`}
                      >
                        {(subfield) => (
                          <div className="flex items-center gap-4">
                            <InputSelectField
                              field={subfield}
                              options={playerCharacters}
                              label="Player Characters"
                            />
                            <button
                              aria-label="Remove field"
                              onClick={(e) => {
                                e.preventDefault();
                                field.removeValue(i);
                              }}
                            >
                              <Icon
                                path={mdiClose}
                                className="text-tertiary size-8"
                              />
                            </button>
                          </div>
                        )}
                      </sessionForm.Field>
                    ))}
                  </div>
                  <button
                    className="text-accent self-end hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      field.pushValue(
                        playerCharacters[field.state.value.length],
                      );
                    }}
                  >
                    Add Player character
                  </button>
                </div>
              );
            }}
          </sessionForm.Field>
          <sessionForm.Field mode="array" name="nonPlayerCharacters">
            {(field) => {
              return (
                <div className="flex w-full flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    {field.state.value.map((_: unknown, i: number) => (
                      <sessionForm.Field
                        key={i}
                        name={`nonPlayerCharacters[${i}]`}
                      >
                        {(subfield) => (
                          <div className="flex items-center gap-4">
                            <InputSelectField
                              field={subfield}
                              options={nonPlayerCharacters}
                              label="Non-player Characters"
                            />
                            <button
                              aria-label="Remove field"
                              onClick={(e) => {
                                e.preventDefault();
                                field.removeValue(i);
                              }}
                            >
                              <Icon
                                path={mdiClose}
                                className="text-tertiary size-8"
                              />
                            </button>
                          </div>
                        )}
                      </sessionForm.Field>
                    ))}
                  </div>
                  <button
                    className="text-accent self-end hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      field.pushValue(
                        nonPlayerCharacters[field.state.value.length],
                      );
                    }}
                  >
                    Add Non-player character
                  </button>
                </div>
              );
            }}
          </sessionForm.Field>
        </div>
        <Divider />
        <div className="flex flex-col gap-8">
          <ArrowHeader2 title="Session Briefing" />
          <p className="ml-4 border-l border-gray-400 px-4">
            Craft a narrative outline for your upcoming session. This outline
            will serve as a loose guide for your players to follow for the
            duration of the session. You can include events that have happened
            in the time between the last session and now, objectives for you
            players to accomplish during this session, or simply leave the
            session open to the whims of your players.
          </p>
          <sessionForm.Field
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
          </sessionForm.Field>
        </div>
        <BtnRect
          ariaLabel={`${title} session`}
          type="submit"
          className="group w-full"
        >
          {createSession.isPending ? (
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

export default SessionForm;
