import { useForm } from '@tanstack/react-form';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import BtnRect from './buttons/BtnRect';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import useKeywords, { Keyword } from '../hooks/useKeywords';
import KeywordCard from './KeywordCard';
import Icon from '@mdi/react';
import { mdiClose, mdiCloseBox, mdiImagePlus } from '@mdi/js';
import Loading from './Loading';
import InputFieldBasic from './InputFieldBasic';
import useCreateCyberneticMutation from '../hooks/useCreateCyberneticMutation/useCreateCyberneticMutation';
import SelectField from './SelectField';
import FormLayout from '../layouts/FormLayout';
import useAttributeTree from '../hooks/useAttributeTree';
import CyberIcon from './icons/CyberIcon';
import useCyberneticQuery from '../hooks/useCyberneticQuery/useCyberneticQuery';
import { useParams } from 'react-router-dom';
import useDeleteCyberneticMutation from '../hooks/useDeleteCyberneticMutation/useDeleteCyberneticMutation';

const CyberneticForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { cyberneticId } = useParams();

  const { data: cybernetic } = useCyberneticQuery(apiUrl, cyberneticId);

  const keywords = useKeywords();
  const attributeTree = useAttributeTree();

  const [imagePreview, setImagePreview] = useState(
    cybernetic?.picture?.imageUrl || '',
  );

  const createCybernetic = useCreateCyberneticMutation(apiUrl, setFormMessage);
  const deleteCybernetic = useDeleteCyberneticMutation(
    apiUrl,
    cyberneticId,
    setFormMessage,
  );

  const handleDelete = () => {
    if (deleteMode) {
      deleteCybernetic.mutate();
    } else {
      setDeleteMode(true);
    }
  };

  const handleReset = async () => {
    cyberneticForm.reset();
  };

  const cyberneticKeywordData = cybernetic?.keywords.map(
    (item: { keyword: Keyword; value?: number }) => {
      return { keywordId: item.keyword.id, value: item.value };
    },
  );

  const weaponData = cybernetic?.weapons.map((weapon) => {
    const parsedKeywords = weapon.keywords.map(
      (item: { keyword: Keyword; value?: number }) => ({
        keywordId: item.keyword.id,
        value: item?.value,
      }),
    );
    return { ...weapon, keywords: parsedKeywords };
  });

  const armorData = cybernetic?.armor.map((armor) => {
    const parsedKeywords = armor.keywords.map(
      (item: { keyword: Keyword; value?: number }) => ({
        keywordId: item.keyword.id,
        value: item?.value,
      }),
    );
    return { ...armor, keywords: parsedKeywords };
  });

  useEffect(() => {
    if (cybernetic) {
      setImagePreview(cybernetic.picture?.imageUrl);
    }
  }, [cybernetic]);

  const cyberneticForm = useForm({
    defaultValues: {
      name: cybernetic?.name || '',
      cyberneticType: cybernetic?.cyberneticType || '',
      picture: cybernetic?.picture || '',
      description: cybernetic?.description || '',
      stats: {
        cyber: cybernetic?.stats.cyber || null,
        power: cybernetic?.stats.power || null,
      } as { cyber: number; power?: number },
      body: cybernetic?.body || ([''] as string[]),
      price: cybernetic?.price || null,
      weapons:
        weaponData ||
        ([] as {
          name: string;
          stats: {
            damage?: number;
            salvo?: number;
            flurry?: number;
            range?: number;
            magCapacity?: number;
            magCount?: number;
          };
          keywords: { keywordId: number; value?: number }[];
        }[]),
      armor:
        armorData ||
        ([] as {
          name: string;
          stats: {
            armor?: number;
            ward?: number;
            block?: number;
          };
          keywords: { keywordId: number; value?: number }[];
        }[]),
      actions:
        cybernetic?.actions ||
        ([] as {
          name: string;
          costs: { stat: string; value: number }[];
          attribute: string;
          skill: string;
          actionType: string;
          actionSubtypes: string[];
          description: string;
        }[]),
      keywords:
        cyberneticKeywordData ||
        ([] as { keywordId: number; value?: number }[]),
    },
    onSubmit: async ({ value }) => {
      console.log(value);

      const filteredStats = Object.fromEntries(
        Object.entries(value.stats).filter(([_, val]) => val),
      );

      value.stats = filteredStats;

      const filteredWeaponStats = value.weapons.map((weapon) =>
        Object.fromEntries(
          Object.entries(weapon.stats).filter(([_, val]) => val),
        ),
      );

      value.weapons.forEach((weapon, index) => {
        weapon.stats = filteredWeaponStats[index];
      });

      const filteredArmorStats = value.armor.map((armor) =>
        Object.fromEntries(
          Object.entries(armor.stats).filter(([_, val]) => val),
        ),
      );

      value.armor.forEach((armor, index) => {
        armor.stats = filteredArmorStats[index];
      });

      const filteredActions = value.actions.map((action) => {
        const filteredCosts = action.costs.filter((cost) => cost.stat);
        const filteredSubtypes = action.actionSubtypes.filter(
          (subtype) => subtype.length,
        );
        return {
          ...action,
          costs: filteredCosts,
          actionSubtypes: filteredSubtypes,
        };
      });

      value.actions = filteredActions;

      const formData = new FormData();

      Object.entries(value).forEach(([key, value]) => {
        if (key === 'picture' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });
      formData.append('cyberneticId', JSON.stringify(cyberneticId || 0));
      await createCybernetic.mutate(formData);
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
    return <Loading />;
  }

  return (
    <FormLayout
      itemId={cyberneticId}
      createMutation={createCybernetic}
      deleteMutation={deleteCybernetic}
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
          cyberneticForm.handleSubmit();
        }}
      >
        <div className="flex items-center justify-center gap-4">
          <CyberIcon className="size-12" />
          <h1>{cybernetic ? 'Update Cybernetic' : 'Create Cybernetic'}</h1>
        </div>
        <div className="flex w-full gap-4 sm:gap-6 lg:gap-8">
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
        <div className="flex w-full flex-wrap gap-4 sm:gap-6 lg:gap-8">
          <cyberneticForm.Field
            name="cyberneticType"
            listeners={{
              onChange: ({ value }) => {
                if (value !== 'offensive') {
                  const length = cyberneticForm.getFieldValue('weapons').length;
                  for (let i = 0; i < length; i++) {
                    cyberneticForm.removeFieldValue('weapons', i);
                  }
                }
                if (value !== 'defensive') {
                  const length = cyberneticForm.getFieldValue('armor').length;
                  for (let i = 0; i < length; i++) {
                    cyberneticForm.removeFieldValue('armor', i);
                  }
                }
              },
            }}
            validators={{
              onSubmit: ({ value }) =>
                value.length < 1
                  ? 'You must select a cybernetic type'
                  : undefined,
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
                <option value="roll">Roll</option>
                <option value="stat">Stat</option>
                <option value="offensive">Offensive</option>
                <option value="defensive">Defensive</option>
                <option value="function">Function</option>
              </SelectField>
            )}
          </cyberneticForm.Field>
          <cyberneticForm.Field name="stats.cyber">
            {(field) => (
              <InputField
                className="max-w-28"
                type="number"
                label="Cyber"
                field={field}
              />
            )}
          </cyberneticForm.Field>
          <cyberneticForm.Field name="stats.power">
            {(field) => (
              <InputField
                className="max-w-28"
                type="number"
                label="Power"
                field={field}
              />
            )}
          </cyberneticForm.Field>
        </div>
        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:gap-6 lg:gap-8">
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
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
                {field.state.value.map((_, i) => {
                  return (
                    <div key={i} className="flex w-full items-center gap-8">
                      <cyberneticForm.Field name={`body[${i}]`}>
                        {(subField) => {
                          return (
                            <InputField
                              className="w-full"
                              type="select"
                              label="Body part replacement"
                              field={subField}
                            />
                          );
                        }}
                      </cyberneticForm.Field>
                      <button
                        className="sm:-ml-2 lg:-ml-4"
                        onClick={() => field.removeValue(i)}
                        type="button"
                      >
                        <Icon
                          className="text-tertiary"
                          path={mdiClose}
                          size={1}
                        />
                      </button>
                    </div>
                  );
                })}
                <button
                  className="text-accent self-center justify-self-end hover:underline sm:col-start-2"
                  onClick={() => field.pushValue('')}
                  type="button"
                >
                  Add body part
                </button>
              </div>
            );
          }}
        </cyberneticForm.Field>

        <cyberneticForm.Subscribe
          selector={(state) => [state.values.cyberneticType]}
        >
          {([cyberneticType]) => (
            <>
              {cyberneticType === 'offensive' && (
                <>
                  <hr className="border-yellow-300 border-opacity-50" />
                  <cyberneticForm.Field name="weapons" mode="array">
                    {(field) => (
                      <>
                        {field.state.value.length > 0 && (
                          <h2 className="text-left">Integrated weapons</h2>
                        )}
                        {field.state.value.map((_, i) => (
                          <>
                            <div className="flex w-full gap-4 lg:gap-8">
                              <cyberneticForm.Field
                                name={`weapons[${i}].name`}
                                validators={{
                                  onChange: ({ value }) =>
                                    value.length < 2
                                      ? 'Weapon name must be at least 2 characters long'
                                      : undefined,
                                }}
                              >
                                {(field) => (
                                  <InputField
                                    className="grow"
                                    label="Weapon name"
                                    field={field}
                                  />
                                )}
                              </cyberneticForm.Field>
                            </div>
                            <div>
                              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
                                <cyberneticForm.Field
                                  name={`weapons[${i}].stats.damage`}
                                >
                                  {(field) => (
                                    <InputField
                                      className="grow"
                                      type="number"
                                      label="Damage"
                                      field={field}
                                    />
                                  )}
                                </cyberneticForm.Field>
                                <cyberneticForm.Field
                                  name={`weapons[${i}].stats.salvo`}
                                >
                                  {(field) => (
                                    <InputField
                                      className="grow"
                                      type="number"
                                      label="Salvo"
                                      field={field}
                                    />
                                  )}
                                </cyberneticForm.Field>
                                <cyberneticForm.Field
                                  name={`weapons[${i}].stats.flurry`}
                                >
                                  {(field) => (
                                    <InputField
                                      className="grow"
                                      type="number"
                                      label="Flurry"
                                      field={field}
                                    />
                                  )}
                                </cyberneticForm.Field>
                                <cyberneticForm.Field
                                  name={`weapons[${i}].stats.range`}
                                >
                                  {(field) => (
                                    <InputField
                                      className="grow"
                                      type="number"
                                      label="Range"
                                      field={field}
                                    />
                                  )}
                                </cyberneticForm.Field>
                                <cyberneticForm.Field
                                  name={`weapons[${i}].stats.magCapacity`}
                                >
                                  {(field) => (
                                    <InputField
                                      className="grow"
                                      type="number"
                                      label="Mag. capacity"
                                      field={field}
                                    />
                                  )}
                                </cyberneticForm.Field>
                                <cyberneticForm.Field
                                  name={`weapons[${i}].stats.magCount`}
                                >
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
                            <h3>Integrated weapon keywords</h3>
                            <cyberneticForm.Field
                              name={`weapons[${i}].keywords`}
                            >
                              {(field) => (
                                <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                                  {keywords.filteredKeywords.weapon.map(
                                    (keyword) => {
                                      const activeKeyword =
                                        field.state.value.find(
                                          (item: {
                                            keywordId: number;
                                            value?: number;
                                          }) => item.keywordId === keyword.id,
                                        );
                                      return (
                                        <div
                                          key={keyword.id}
                                          className="flex items-center gap-4"
                                        >
                                          <KeywordCard
                                            className="w-full"
                                            keyword={keyword}
                                          >
                                            {activeKeyword && (
                                              <InputFieldBasic
                                                className="max-w-20"
                                                type="number"
                                                label="Value"
                                                value={activeKeyword.value}
                                                onChange={(value: number) => {
                                                  const updatedValue =
                                                    field.state.value.some(
                                                      (item: {
                                                        keywordId: number;
                                                        value?: number;
                                                      }) =>
                                                        item.keywordId ===
                                                        keyword.id,
                                                    )
                                                      ? field.state.value.map(
                                                          (item: {
                                                            keywordId: number;
                                                            value?: number;
                                                          }) =>
                                                            item.keywordId ===
                                                            keyword.id
                                                              ? {
                                                                  ...item,
                                                                  value,
                                                                }
                                                              : item,
                                                        )
                                                      : [
                                                          ...field.state.value,
                                                          { ...keyword, value },
                                                        ];
                                                  field.handleChange(
                                                    updatedValue,
                                                  );
                                                }}
                                              />
                                            )}
                                          </KeywordCard>
                                          <div className="flex flex-col items-center gap-4">
                                            <input
                                              className="size-6 shrink-0"
                                              type="checkbox"
                                              checked={activeKeyword}
                                              onChange={(e) => {
                                                if (e.target.checked) {
                                                  field.handleChange([
                                                    ...field.state.value,
                                                    { keywordId: keyword.id },
                                                  ]);
                                                } else {
                                                  field.handleChange(
                                                    field.state.value.filter(
                                                      (item: {
                                                        keywordId: number;
                                                        value?: number;
                                                      }) =>
                                                        item.keywordId !==
                                                        keyword.id,
                                                    ),
                                                  );
                                                }
                                              }}
                                            />
                                          </div>
                                        </div>
                                      );
                                    },
                                  )}
                                </div>
                              )}
                            </cyberneticForm.Field>
                          </>
                        ))}
                        <div className="flex w-full items-center justify-between">
                          <button
                            className="text-accent hover:underline"
                            onClick={(e) => {
                              e.preventDefault();
                              field.pushValue({
                                name: '',
                                stats: {
                                  damage: null,
                                  salvo: null,
                                  flurry: null,
                                  range: null,
                                  magCapacity: null,
                                  magCount: null,
                                },
                                keywords: [],
                              });
                            }}
                          >
                            Add integrated weapon
                          </button>
                          {cyberneticForm.state.values.weapons.length > 0 && (
                            <button
                              className="text-accent hover:underline"
                              onClick={(e) => {
                                e.preventDefault();
                                field.removeValue(
                                  cyberneticForm.state.values.weapons.length -
                                    1,
                                );
                              }}
                            >
                              Remove integrated weapon
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </cyberneticForm.Field>
                </>
              )}
              {cyberneticType === 'defensive' && (
                <>
                  <hr className="border-yellow-300 border-opacity-50" />
                  <cyberneticForm.Field name="armor" mode="array">
                    {(field) => (
                      <>
                        {field.state.value.length > 0 && (
                          <h2 className="text-left">Integrated Armor</h2>
                        )}
                        {field.state.value.map((_, i) => (
                          <>
                            <div className="flex w-full gap-4 lg:gap-8">
                              <cyberneticForm.Field
                                name={`armor[${i}].name`}
                                validators={{
                                  onChange: ({ value }) =>
                                    value.length < 2
                                      ? 'Armor name must be at least 2 characters long'
                                      : undefined,
                                }}
                              >
                                {(field) => (
                                  <InputField
                                    className="grow"
                                    label="Armor name"
                                    field={field}
                                  />
                                )}
                              </cyberneticForm.Field>
                            </div>
                            <div>
                              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
                                <cyberneticForm.Field
                                  name={`armor[${i}].stats.armor`}
                                >
                                  {(field) => (
                                    <InputField
                                      className="grow"
                                      type="number"
                                      label="Armor value"
                                      field={field}
                                    />
                                  )}
                                </cyberneticForm.Field>
                                <cyberneticForm.Field
                                  name={`armor[${i}].stats.ward`}
                                >
                                  {(field) => (
                                    <InputField
                                      className="grow"
                                      type="number"
                                      label="Ward"
                                      field={field}
                                    />
                                  )}
                                </cyberneticForm.Field>
                                <cyberneticForm.Field
                                  name={`armor[${i}].stats.block`}
                                >
                                  {(field) => (
                                    <InputField
                                      className="grow"
                                      type="number"
                                      label="Block points"
                                      field={field}
                                    />
                                  )}
                                </cyberneticForm.Field>
                              </div>
                            </div>
                            <h3>Integrated armor keywords</h3>
                            <cyberneticForm.Field name={`armor[${i}].keywords`}>
                              {(field) => (
                                <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                                  {keywords.filteredKeywords.armor.map(
                                    (keyword) => {
                                      const activeKeyword =
                                        field.state.value.find(
                                          (item: {
                                            keywordId: number;
                                            value?: number;
                                          }) => item.keywordId === keyword.id,
                                        );
                                      return (
                                        <div
                                          key={keyword.id}
                                          className="flex items-center gap-4"
                                        >
                                          <KeywordCard
                                            className="w-full"
                                            keyword={keyword}
                                          >
                                            {activeKeyword && (
                                              <InputFieldBasic
                                                className="max-w-20"
                                                type="number"
                                                label="Value"
                                                value={activeKeyword.value}
                                                onChange={(value: number) => {
                                                  const updatedValue =
                                                    field.state.value.some(
                                                      (item: {
                                                        keywordId: number;
                                                        value?: number;
                                                      }) =>
                                                        item.keywordId ===
                                                        keyword.id,
                                                    )
                                                      ? field.state.value.map(
                                                          (item: {
                                                            keywordId: number;
                                                            value?: number;
                                                          }) =>
                                                            item.keywordId ===
                                                            keyword.id
                                                              ? {
                                                                  ...item,
                                                                  value,
                                                                }
                                                              : item,
                                                        )
                                                      : [
                                                          ...field.state.value,
                                                          { ...keyword, value },
                                                        ];
                                                  field.handleChange(
                                                    updatedValue,
                                                  );
                                                }}
                                              />
                                            )}
                                          </KeywordCard>
                                          <div className="flex flex-col items-center gap-4">
                                            <input
                                              className="size-6 shrink-0"
                                              type="checkbox"
                                              checked={activeKeyword}
                                              onChange={(e) => {
                                                if (e.target.checked) {
                                                  field.handleChange([
                                                    ...field.state.value,
                                                    { keywordId: keyword.id },
                                                  ]);
                                                } else {
                                                  field.handleChange(
                                                    field.state.value.filter(
                                                      (item: {
                                                        keywordId: number;
                                                        value?: number;
                                                      }) =>
                                                        item.keywordId !==
                                                        keyword.id,
                                                    ),
                                                  );
                                                }
                                              }}
                                            />
                                          </div>
                                        </div>
                                      );
                                    },
                                  )}
                                </div>
                              )}
                            </cyberneticForm.Field>
                          </>
                        ))}
                        <div className="flex w-full items-center justify-between">
                          <button
                            className="text-accent hover:underline"
                            onClick={(e) => {
                              e.preventDefault();
                              field.pushValue({
                                name: '',
                                stats: {
                                  armor: null,
                                  ward: null,
                                  block: null,
                                },
                                keywords: [],
                              });
                            }}
                          >
                            Add integrated armor
                          </button>
                          {cyberneticForm.state.values.armor.length > 0 && (
                            <button
                              className="text-accent hover:underline"
                              onClick={(e) => {
                                e.preventDefault();
                                field.removeValue(
                                  cyberneticForm.state.values.armor.length - 1,
                                );
                              }}
                            >
                              Remove integrated armor
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </cyberneticForm.Field>
                </>
              )}
              {(cyberneticType === 'offensive' ||
                cyberneticType === 'defensive' ||
                cyberneticType === 'function') && (
                <>
                  <hr className="border-yellow-300 border-opacity-50" />
                  <cyberneticForm.Field name="actions" mode="array">
                    {(field) => (
                      <>
                        {field.state.value.length > 0 && (
                          <h2 className="text-left">Unique actions</h2>
                        )}
                        {field.state.value.map((_, i) => {
                          return (
                            <>
                              <cyberneticForm.Field
                                name={`actions[${i}].name`}
                                validators={{
                                  onChange: ({ value }) =>
                                    value.length < 2
                                      ? 'Action name must be at least 2 characters long'
                                      : undefined,
                                }}
                              >
                                {(field) => (
                                  <InputField
                                    className="grow"
                                    label="Action name"
                                    field={field}
                                  />
                                )}
                              </cyberneticForm.Field>
                              <cyberneticForm.Field
                                name={`actions[${i}].costs`}
                                mode="array"
                              >
                                {(field) => {
                                  return (
                                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
                                      {field.state.value.map((_, j) => {
                                        return (
                                          <div
                                            key={i}
                                            className="flex gap-2 sm:gap-4 lg:gap-6"
                                          >
                                            <cyberneticForm.Field
                                              name={`actions[${i}].costs[${j}].stat`}
                                            >
                                              {(subField) => {
                                                return (
                                                  <SelectField
                                                    className="grow"
                                                    label="Stat"
                                                    field={subField}
                                                  >
                                                    <option defaultValue=""></option>
                                                    <option value="actionPoints">
                                                      Action points
                                                    </option>
                                                    <option value="reactionPoints">
                                                      Reaction points
                                                    </option>
                                                    <option value="power">
                                                      Power
                                                    </option>
                                                    <option value="health">
                                                      Health
                                                    </option>
                                                    <option value="sanity">
                                                      Sanity
                                                    </option>
                                                  </SelectField>
                                                );
                                              }}
                                            </cyberneticForm.Field>
                                            <cyberneticForm.Field
                                              key={i}
                                              name={`actions[${i}].costs[${j}].value`}
                                            >
                                              {(subField) => {
                                                return (
                                                  <InputField
                                                    className="max-w-28"
                                                    type="number"
                                                    label="Value"
                                                    field={subField}
                                                  />
                                                );
                                              }}
                                            </cyberneticForm.Field>
                                            <button
                                              className="sm:-ml-2 lg:-ml-4"
                                              onClick={() =>
                                                field.removeValue(j)
                                              }
                                              type="button"
                                            >
                                              <Icon
                                                className="text-tertiary"
                                                path={mdiClose}
                                                size={1}
                                              />
                                            </button>
                                          </div>
                                        );
                                      })}
                                      <div className="my-auto flex items-center justify-end gap-4 self-end sm:col-start-2 lg:gap-8">
                                        <button
                                          className="text-accent self-end hover:underline"
                                          onClick={() =>
                                            field.pushValue({
                                              stat: '',
                                              value: 1,
                                            })
                                          }
                                          type="button"
                                        >
                                          Add cost
                                        </button>
                                      </div>
                                    </div>
                                  );
                                }}
                              </cyberneticForm.Field>
                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
                                <cyberneticForm.Field
                                  name={`actions[${i}].attribute`}
                                  listeners={{
                                    onChange: () => {
                                      cyberneticForm.setFieldValue(
                                        `actions[${i}].skill`,
                                        '',
                                      );
                                    },
                                  }}
                                >
                                  {(field) => (
                                    <SelectField
                                      label="Attribute"
                                      field={field}
                                    >
                                      <option defaultValue=""></option>
                                      {Object.entries(attributeTree.tree).map(
                                        ([attribute, _]) => {
                                          return (
                                            <option
                                              key={attribute}
                                              value={`${attribute}`}
                                            >
                                              {attribute[0].toUpperCase() +
                                                attribute.slice(1)}
                                            </option>
                                          );
                                        },
                                      )}
                                    </SelectField>
                                  )}
                                </cyberneticForm.Field>
                                <cyberneticForm.Field
                                  name={`actions[${i}].skill`}
                                >
                                  {(field) => {
                                    return (
                                      <SelectField label="Skill" field={field}>
                                        <option defaultValue=""></option>
                                        {cyberneticForm.state.values.actions[i]
                                          .attribute &&
                                          Object.entries(
                                            attributeTree.tree[
                                              cyberneticForm.state.values
                                                .actions[i].attribute
                                            ].skills,
                                          ).map(([skill, _]) => {
                                            return (
                                              <option
                                                key={skill}
                                                value={`${skill}`}
                                              >
                                                {skill[0].toUpperCase() +
                                                  skill.slice(1)}
                                              </option>
                                            );
                                          })}
                                      </SelectField>
                                    );
                                  }}
                                </cyberneticForm.Field>
                              </div>
                              <cyberneticForm.Field
                                name={`actions[${i}].actionType`}
                              >
                                {(field) => (
                                  <SelectField
                                    label="Action type"
                                    field={field}
                                  >
                                    <option defaultValue="" disabled></option>
                                    <option value="action">Action</option>
                                    <option value="extendedAction">
                                      Ex. action
                                    </option>
                                    <option value="reaction">Reaction</option>
                                  </SelectField>
                                )}
                              </cyberneticForm.Field>
                              <cyberneticForm.Field
                                name={`actions[${i}].actionSubtypes`}
                                mode="array"
                              >
                                {(field) => {
                                  const actionSubtypes = [
                                    'attack',
                                    'movement',
                                    'upkeep',
                                    'unique',
                                  ];
                                  return (
                                    <div className="flex flex-col gap-4">
                                      {field.state.value.map((_, j) => {
                                        return (
                                          <div
                                            key={i}
                                            className="flex gap-2 sm:gap-4 lg:gap-6"
                                          >
                                            <cyberneticForm.Field
                                              name={`actions[${i}].actionSubtypes[${j}]`}
                                            >
                                              {(subField) => {
                                                return (
                                                  <SelectField
                                                    className="grow"
                                                    label="Action subtype"
                                                    field={subField}
                                                  >
                                                    <option defaultValue=""></option>
                                                    {actionSubtypes.map(
                                                      (subtype) => {
                                                        return (
                                                          <option
                                                            key={subtype}
                                                            value={subtype}
                                                          >
                                                            {subtype[0].toUpperCase() +
                                                              subtype.slice(1)}
                                                          </option>
                                                        );
                                                      },
                                                    )}
                                                  </SelectField>
                                                );
                                              }}
                                            </cyberneticForm.Field>
                                            <button
                                              className="sm:-ml-2 lg:-ml-4"
                                              onClick={() =>
                                                field.removeValue(j)
                                              }
                                              type="button"
                                            >
                                              <Icon
                                                className="text-tertiary"
                                                path={mdiClose}
                                                size={1}
                                              />
                                            </button>
                                          </div>
                                        );
                                      })}
                                      <div className="my-auto flex items-center justify-end gap-4 self-end sm:col-start-2 lg:gap-8">
                                        <button
                                          className="text-accent self-end hover:underline"
                                          onClick={() => field.pushValue('')}
                                          type="button"
                                        >
                                          Add subtype
                                        </button>
                                      </div>
                                    </div>
                                  );
                                }}
                              </cyberneticForm.Field>
                              <cyberneticForm.Field
                                name={`actions[${i}].description`}
                                validators={{
                                  onChange: ({ value }) =>
                                    value.length < 2
                                      ? 'Action description must be at least 2 characters long'
                                      : undefined,
                                }}
                              >
                                {(field) => (
                                  <TextAreaField
                                    className="h-40 w-full"
                                    label="Action description"
                                    field={field}
                                  />
                                )}
                              </cyberneticForm.Field>
                            </>
                          );
                        })}
                        <div className="flex w-full items-center justify-between">
                          <button
                            className="text-accent hover:underline"
                            onClick={(e) => {
                              e.preventDefault();
                              field.pushValue({
                                name: '',
                                costs: [{ stat: 'actionPoints', value: 1 }] as {
                                  stat: string;
                                  value: number;
                                }[],
                                attribute: '',
                                skill: '',
                                actionType: '',
                                actionSubtypes: ['unique'] as string[],
                                description: '',
                              });
                            }}
                          >
                            Add unique action
                          </button>
                          {cyberneticForm.state.values.actions.length > 0 && (
                            <button
                              className="text-accent hover:underline"
                              onClick={(e) => {
                                e.preventDefault();
                                field.removeValue(
                                  cyberneticForm.state.values.actions.length -
                                    1,
                                );
                              }}
                            >
                              Remove unique action
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </cyberneticForm.Field>
                </>
              )}
              <hr className="border-yellow-300 border-opacity-50" />
            </>
          )}
        </cyberneticForm.Subscribe>
        <h2>Cybernetic keywords</h2>
        <cyberneticForm.Field name="keywords">
          {(field) => (
            <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
              {keywords.filteredKeywords.cybernetic.map((keyword) => {
                const activeKeyword = field.state.value.find(
                  (item: { keywordId: number; value?: number }) =>
                    item.keywordId === keyword.id,
                );
                return (
                  <div key={keyword.id} className="flex items-center gap-4">
                    <KeywordCard className="w-full" keyword={keyword}>
                      {activeKeyword && (
                        <InputFieldBasic
                          className="max-w-20"
                          type="number"
                          label="Value"
                          value={activeKeyword.value}
                          onChange={(value: number) => {
                            const updatedValue = field.state.value.some(
                              (item: { keywordId: number; value?: number }) =>
                                item.keywordId === keyword.id,
                            )
                              ? field.state.value.map(
                                  (item: {
                                    keywordId: number;
                                    value?: number;
                                  }) =>
                                    item.keywordId === keyword.id
                                      ? { ...item, value }
                                      : item,
                                )
                              : [...field.state.value, { ...keyword, value }];
                            field.handleChange(updatedValue);
                          }}
                        />
                      )}
                    </KeywordCard>
                    <div className="flex flex-col items-center gap-4">
                      <input
                        className="size-6 shrink-0"
                        type="checkbox"
                        checked={activeKeyword}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.handleChange([
                              ...field.state.value,
                              { keywordId: keyword.id },
                            ]);
                          } else {
                            field.handleChange(
                              field.state.value.filter(
                                (item: { keywordId: number; value?: number }) =>
                                  item.keywordId !== keyword.id,
                              ),
                            );
                          }
                        }}
                      />
                    </div>
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
          ) : cybernetic ? (
            'Update'
          ) : (
            'Create'
          )}
        </BtnRect>
      </form>
    </FormLayout>
  );
};

export default CyberneticForm;
