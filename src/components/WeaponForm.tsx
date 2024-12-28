import { useForm } from '@tanstack/react-form';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import BtnRect from './BtnRect';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import useKeywords from '../hooks/useKeywords';
import KeywordCard from './KeywordCard';
import Icon from '@mdi/react';
import { mdiCloseBox, mdiImagePlus } from '@mdi/js';
import useCreateWeaponMutation from '../hooks/useCreateWeaponMutation/useCreateWeaponMutation';
import Loading from './Loading';

const WeaponForm = () => {
  const { apiUrl, authToken } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);

  const [checkedKeywords, setCheckedKeywords] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const createWeapon = useCreateWeaponMutation(apiUrl, authToken);

  const keywords = useKeywords();

  const weaponForm = useForm({
    defaultValues: {
      name: '',
      picture: '',
      description: '',
      stats: {
        damage: '',
        salvo: '',
        flurry: '',
        range: '',
        magCapacity: '',
        magCount: '',
        weight: '',
      },
      price: '',
      keywords: [],
    },
    onSubmit: async ({ value }) => {
      const filteredStats = Object.fromEntries(
        Object.entries(value.stats).filter(([stat, val]) => val),
      );
      value.stats = filteredStats;
      console.log(value);

      const formData = new FormData();

      Object.entries(value).forEach(([key, value]) => {
        if (key === 'picture' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });
      await createWeapon.mutate(formData);
      weaponForm.reset({
        name: '',
        picture: '',
        description: '',
        stats: {
          damage: '',
          salvo: '',
          flurry: '',
          range: '',
          magCapacity: '',
          magCount: '',
          weight: '',
        },
        price: '',
        keywords: [],
      });
      setCheckedKeywords([]);
      setImagePreview('');
    },
  });

  useEffect(() => {
    weaponForm.setFieldValue('keywords', checkedKeywords);
  }, [checkedKeywords, weaponForm]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file

    if (selectedFile) {
      weaponForm.setFieldValue('picture', selectedFile);

      // Create a URL for the selected file to preview
      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

  if (keywords.isLoading || keywords.isPending) {
    return <span></span>;
  }

  return (
    <ThemeContainer
      className="mb-auto w-full max-w-2xl lg:max-w-4xl"
      chamfer="32"
      borderColor={accentPrimary}
    >
      <form
        className="bg-primary flex w-full min-w-96 flex-col gap-8 p-4 clip-8 sm:p-6 lg:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          weaponForm.handleSubmit();
        }}
      >
        <h1 className="text-center">Create Weapon</h1>
        <div className="flex w-full gap-4 lg:gap-8">
          <weaponForm.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Weapon name must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <InputField className="grow" label="Weapon name" field={field} />
            )}
          </weaponForm.Field>
          <weaponForm.Field name="price">
            {(field) => (
              <InputField
                className="max-w-28"
                type="number"
                label="Price"
                field={field}
              />
            )}
          </weaponForm.Field>
        </div>
        <div className="flex flex-col gap-8 sm:grid sm:grid-cols-2 sm:grid-rows-1">
          <ThemeContainer
            className="mx-auto w-full max-w-sm"
            chamfer="24"
            borderColor={accentPrimary}
          >
            {!imagePreview ? (
              <label className="bg-secondary flex aspect-square size-full w-full cursor-pointer flex-col items-center justify-center clip-6">
                <div className="flex flex-col items-center justify-center gap-2 pb-6 pt-5">
                  <Icon
                    className="text-tertiary"
                    path={mdiImagePlus}
                    size={3}
                  />
                  <p className="text-tertiary font-semibold">
                    Upload character picture
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
              <div className="bg-secondary relative flex aspect-square max-w-4xl items-center justify-center overflow-hidden bg-black clip-6">
                <img
                  className="fade-in-bottom"
                  src={imagePreview}
                  alt="Preview"
                />
                <button
                  className="text-secondary absolute right-2 top-2"
                  onClick={() => {
                    weaponForm.setFieldValue('picture', '');
                    setImagePreview('');
                  }}
                >
                  <div className="rounded bg-zinc-950">
                    <Icon path={mdiCloseBox} size={1.5} />
                  </div>
                </button>
              </div>
            )}
          </ThemeContainer>
          <weaponForm.Field
            name="description"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Weapon description must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <TextAreaField
                className="h-40 w-full sm:h-full"
                label="Weapon description"
                field={field}
              />
            )}
          </weaponForm.Field>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
            <weaponForm.Field name="stats.damage">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Damage"
                  field={field}
                />
              )}
            </weaponForm.Field>
            <weaponForm.Field name="stats.salvo">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Salvo"
                  field={field}
                />
              )}
            </weaponForm.Field>
            <weaponForm.Field name="stats.flurry">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Flurry"
                  field={field}
                />
              )}
            </weaponForm.Field>
            <weaponForm.Field name="stats.range">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Range"
                  field={field}
                />
              )}
            </weaponForm.Field>
            <weaponForm.Field name="stats.magCapacity">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Mag. capacity"
                  field={field}
                />
              )}
            </weaponForm.Field>
            <weaponForm.Field name="stats.magCount">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Mag. count"
                  field={field}
                />
              )}
            </weaponForm.Field>
            <weaponForm.Field name="stats.weight">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Weight"
                  field={field}
                />
              )}
            </weaponForm.Field>
          </div>
        </div>
        <h2>Keywords</h2>
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
          {keywords.filteredKeywords.weapon.map((keyword) => {
            return (
              <div key={keyword.name} className="flex items-center gap-4">
                <KeywordCard className="w-full" keyword={keyword} />
                <input
                  className="size-6 shrink-0"
                  type="checkbox"
                  checked={checkedKeywords.includes(keyword.id)}
                  onChange={() => {
                    if (!checkedKeywords.includes(keyword.id)) {
                      setCheckedKeywords([...checkedKeywords, keyword.id]);
                    } else {
                      setCheckedKeywords((prevKeywords) =>
                        prevKeywords.filter((id) => id !== keyword.id),
                      );
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
        <BtnRect type="submit" className="group w-full">
          {createWeapon.isPending ? (
            <Loading
              className="text-gray-900 group-hover:text-yellow-300"
              size={1.15}
            />
          ) : (
            'Create'
          )}
        </BtnRect>
      </form>
    </ThemeContainer>
  );
};

export default WeaponForm;
