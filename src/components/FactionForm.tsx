import { useForm } from '@tanstack/react-form';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import BtnRect from './buttons/BtnRect';
import InputField from './InputField';
import Loading from './Loading';
import FormLayout from '../layouts/FormLayout';
import { useParams } from 'react-router-dom';
import LexicalEditor from './lexical/LexicalEditor';
import { mdiCloseBox, mdiImagePlus } from '@mdi/js';
import Icon from '@mdi/react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import Divider from './Divider';
import useFactionQuery from '../hooks/useFactionQuery/useFactionQuery';
import ArrowHeader2 from './ArrowHeader2';
import useUpdateFactionMutation from '../hooks/useUpdateFactionMutation/useUpdateFactionMutation';
import useDeleteFactionMutation from '../hooks/useDeleteFactionMutation/useDeleteFactionMutation';

const FactionForm = ({ title, mode }: { title: string; mode?: string }) => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const { campaignId, factionId } = useParams();
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const updateFaction = useUpdateFactionMutation(
    apiUrl,
    Number(campaignId),
    Number(factionId),
    setFormMessage,
  );

  const {
    data: faction,
    isLoading,
    isPending,
  } = useFactionQuery(apiUrl, Number(factionId));

  const deleteFaction = useDeleteFactionMutation(
    apiUrl,
    Number(campaignId),
    Number(factionId),
    setFormMessage,
  );

  useEffect(() => {
    if (faction) {
      setImagePreview(faction.picture?.imageUrl);
    } else setImagePreview('');
  }, [faction, factionId]);

  const handleReset = async () => {
    factionForm.reset();
  };

  const factionForm = useForm({
    defaultValues: {
      name: faction?.name || '',
      picture: faction?.picture || '',
      background:
        faction?.background || ({} as { html: string; nodes: string }),
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
      formData.append('factionId', JSON.stringify(factionId || 0));
      if (mode === 'create' || mode === 'update') {
        await updateFaction.mutate(formData);
      }
    },
  });

  const handleDelete = () => {
    if (deleteMode) {
      deleteFaction.mutate();
    } else {
      setDeleteMode(true);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      factionForm.setFieldValue('picture', selectedFile);

      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

  if (isLoading || isPending) return <Loading />;

  return (
    <FormLayout
      itemId={factionId}
      handleReset={handleReset}
      modifyMutation={updateFaction}
      deleteMutation={deleteFaction}
      handleDelete={handleDelete}
      formMessage={formMessage}
      deleteMode={deleteMode}
      setDeleteMode={setDeleteMode}
    >
      <form
        className="flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (updateFaction.isPending) return;
          factionForm.handleSubmit();
        }}
      >
        <div className="flex items-center justify-center gap-4">
          <h1>{title} Faction</h1>
        </div>

        <ArrowHeader2 title="Basic Faction Information" />
        <factionForm.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Faction name must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => (
            <InputField className="grow" label="Faction name" field={field} />
          )}
        </factionForm.Field>
        <ThemeContainer
          className="mx-auto w-full"
          chamfer="medium"
          borderColor={accentPrimary}
        >
          {!imagePreview ? (
            <label className="flex aspect-[5/2] w-full cursor-pointer flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-2 pb-6 pt-5">
                <Icon className="text-tertiary" path={mdiImagePlus} size={3} />
                <p className="text-tertiary font-semibold">
                  Upload faction cover picture
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
                  factionForm.setFieldValue('picture', '');
                  setImagePreview('');
                }}
              >
                <Icon path={mdiCloseBox} size={1.5} />
              </button>
            </div>
          )}
        </ThemeContainer>
        <Divider />
        <ArrowHeader2 title="Faction Background" />
        <factionForm.Field
          name="background"
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
        </factionForm.Field>
        <BtnRect
          ariaLabel={`${title} faction`}
          type="submit"
          className="group w-full"
        >
          {updateFaction.isPending ? (
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

export default FactionForm;
