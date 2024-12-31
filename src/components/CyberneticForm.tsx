import { useForm } from '@tanstack/react-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import BtnRect from './BtnRect';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import useKeywords from '../hooks/useKeywords';
import KeywordCard from './KeywordCard';
import Icon from '@mdi/react';
import { mdiCloseBox, mdiImagePlus, mdiMinus, mdiPlus } from '@mdi/js';
import Loading from './Loading';
import InputFieldBasic from './InputFieldBasic';
import useCreateCyberneticMutation from '../hooks/useCreateCyberneticMutation copy/useCreateCyberneticMutation';
import SelectField from './SelectField';

const CyberneticForm = () => {
  const { apiUrl, authToken } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);

  const keywords = useKeywords();

  const [imagePreview, setImagePreview] = useState('');
  const createCybernetic = useCreateCyberneticMutation(apiUrl, authToken);

  const cyberneticForm = useForm({
    defaultValues: {
      name: '',
      cyberticType: '',
      picture: '',
      description: '',
      cyber: '',
      body: [''] as string[],
      stats: {
        power: '',
        damage: '',
        salvo: '',
        flurry: '',
        range: '',
        magCapacity: '',
        magCount: '',
      },
      price: '',
      keywords: [] as { id: number; value?: number }[],
    },
    onSubmit: async ({ value }) => {
      const filteredStats = Object.fromEntries(
        Object.entries(value.stats).filter(([_, val]) => val),
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
      // await createWeapon.mutate(formData);
      // cyberneticForm.reset({
      //   name: '',
      //   picture: '',
      //   description: '',
      //   stats: {
      //     damage: '',
      //     salvo: '',
      //     flurry: '',
      //     range: '',
      //     magCapacity: '',
      //     magCount: '',
      //     weight: '',
      //   },
      //   price: '',
      //   keywords: [],
      // });
      // setCheckedKeywords([]);
      // setImagePreview('');
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file

    if (selectedFile) {
      cyberneticForm.setFieldValue('picture', selectedFile);

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
          cyberneticForm.handleSubmit();
        }}
      >
        <h1 className="text-center">Create Cybernetic</h1>
        <div className="flex w-full gap-4 lg:gap-8">
          <cyberneticForm.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Cybernetic name must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <InputField
                className="grow"
                label="Cybernetic name"
                field={field}
              />
            )}
          </cyberneticForm.Field>
          <cyberneticForm.Field name="price">
            {(field) => (
              <InputField
                className="max-w-28"
                type="number"
                label="Price"
                field={field}
              />
            )}
          </cyberneticForm.Field>
        </div>
        <div className="flex w-full gap-4 lg:gap-8">
          <cyberneticForm.Field
            name="cyberticType"
            validators={{
              onSubmit: ({ value }) =>
                value.length < 1 ? 'You must select a keyword type' : undefined,
            }}
          >
            {(field) => (
              <SelectField
                className="grow"
                type="select"
                label="Cybernetic type"
                field={field}
              >
                <option defaultValue="" disabled></option>
                <option value="Roll">Roll</option>
                <option value="Stat">Stat</option>
                <option value="Function">Function</option>
                <option value="Defensive">Defensive</option>
                <option value="Prototype">Prototype</option>
              </SelectField>
            )}
          </cyberneticForm.Field>
          <cyberneticForm.Field name="cyber">
            {(field) => (
              <InputField
                className="max-w-28"
                type="number"
                label="Cyber"
                field={field}
              />
            )}
          </cyberneticForm.Field>
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
                    Upload cybernetic picture
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
                  alt="Cybernetic preview"
                />
                <button
                  className="text-secondary absolute right-2 top-2"
                  onClick={() => {
                    cyberneticForm.setFieldValue('picture', '');
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
          <cyberneticForm.Field
            name="description"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Cybernetic description must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <TextAreaField
                className="h-40 w-full sm:h-full"
                label="Cybernetic description"
                field={field}
              />
            )}
          </cyberneticForm.Field>
        </div>
        <cyberneticForm.Field
          name="body"
          mode="array"
          validators={{
            onSubmit: ({ value }) =>
              value.length < 1 ? 'You must select a keyword type' : undefined,
          }}
        >
          {(field) => {
            return (
              <div className="flex flex-col gap-4 lg:gap-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-8">
                  {field.state.value.map((_, i) => {
                    return (
                      <cyberneticForm.Field key={i} name={`body[${i}]`}>
                        {(subField) => {
                          return (
                            <InputField
                              type="select"
                              label="Body part replacement"
                              field={subField}
                            />
                          );
                        }}
                      </cyberneticForm.Field>
                    );
                  })}
                </div>
                <div className="flex items-center justify-center gap-4 self-end lg:gap-8">
                  <BtnRect
                    onClick={() =>
                      field.removeValue(field.state.value.length - 1)
                    }
                    type="button"
                  >
                    <Icon path={mdiMinus} size={1.15} />
                  </BtnRect>
                  <p>Body parts</p>
                  <BtnRect onClick={() => field.pushValue('')} type="button">
                    <Icon path={mdiPlus} size={1.15} />
                  </BtnRect>
                </div>
              </div>
            );
          }}
        </cyberneticForm.Field>
        <h2>Stats</h2>
        <div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
            <cyberneticForm.Field name="stats.power">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Power"
                  field={field}
                />
              )}
            </cyberneticForm.Field>
            <cyberneticForm.Field name="stats.damage">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Damage"
                  field={field}
                />
              )}
            </cyberneticForm.Field>
            <cyberneticForm.Field name="stats.salvo">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Salvo"
                  field={field}
                />
              )}
            </cyberneticForm.Field>
            <cyberneticForm.Field name="stats.flurry">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Flurry"
                  field={field}
                />
              )}
            </cyberneticForm.Field>
            <cyberneticForm.Field name="stats.range">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Range"
                  field={field}
                />
              )}
            </cyberneticForm.Field>
            <cyberneticForm.Field name="stats.magCapacity">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Mag. capacity"
                  field={field}
                />
              )}
            </cyberneticForm.Field>
            <cyberneticForm.Field name="stats.magCount">
              {(field) => (
                <InputField
                  className="grow"
                  type="number"
                  label="Mag. count"
                  field={field}
                />
              )}
            </cyberneticForm.Field>
          </div>
        </div>
        <h2>Keywords</h2>
        <cyberneticForm.Field name="keywords">
          {(field) => (
            <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
              {keywords.filteredKeywords.weapon?.map((keyword) => {
                const inKeywords = field.state.value.some(
                  (item) => item.id === keyword.id,
                );
                return (
                  <div key={keyword.id} className="flex items-center gap-4">
                    <KeywordCard className="w-full" keyword={keyword} />
                    {inKeywords && (
                      <InputFieldBasic
                        className="max-w-32"
                        type="number"
                        label="Value"
                        onChange={(value: number) => {
                          const updatedValue = field.state.value.some(
                            (item) => item.id === keyword.id,
                          )
                            ? field.state.value.map((item) =>
                                item.id === keyword.id
                                  ? { ...item, value }
                                  : item,
                              )
                            : [...field.state.value, { id: keyword.id, value }];
                          field.handleChange(updatedValue);
                        }}
                      />
                    )}
                    <input
                      className="size-6 shrink-0"
                      type="checkbox"
                      checked={inKeywords}
                      onChange={(e) => {
                        if (e.target.checked) {
                          field.handleChange([
                            ...field.state.value,
                            { id: keyword.id },
                          ]);
                        } else {
                          field.handleChange(
                            field.state.value.filter(
                              (item) => item.id !== keyword.id,
                            ),
                          );
                        }
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </cyberneticForm.Field>
        <BtnRect type="submit" className="group w-full">
          {createCybernetic.isPending ? (
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

export default CyberneticForm;
