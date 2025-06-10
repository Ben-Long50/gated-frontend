import { useContext, useState } from 'react';
import InputField from './InputField';
import BtnRect from './buttons/BtnRect';
import AttributeCard from './AttributeCard';
import TextAreaField from './TextAreaField';
import { AuthContext } from '../contexts/AuthContext';
import useCreatePerkMutation from '../hooks/useCreatePerkMutation/useCreatePerkMutation';
import { useForm } from '@tanstack/react-form';
import useAttributeTree from '../hooks/useAttributeTree';
import FormLayout from '../layouts/FormLayout';
import { useLocation, useParams } from 'react-router-dom';
import Loading from './Loading';
import useDeletePerkMutation from '../hooks/useDeletePerkMutation/useDeletePerkMutation';
import usePerks from '../hooks/usePerks';
import { Perk } from 'src/types/perk';
import ModifierField from './form_fields/ModifierField';
import Divider from './Divider';
import ArrowHeader2 from './ArrowHeader2';
import { capitalCase } from 'change-case';
import AttributeField from './form_fields/AttributeField';

const PerkForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { perkId } = useParams();
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const mode = parts[parts.length - 1];

  const perks = usePerks();

  const perk = perks.perks?.filter(
    (perk: Perk) => perk.id === Number(perkId),
  )[0];

  const createPerk = useCreatePerkMutation(
    apiUrl,
    Number(perkId),
    setFormMessage,
  );
  const deletePerk = useDeletePerkMutation(
    apiUrl,
    Number(perkId),
    setFormMessage,
  );

  const handleDelete = () => {
    if (deleteMode) {
      deletePerk.mutate();
    } else {
      setDeleteMode(true);
    }
  };

  const handleReset = async () => {
    perkForm.reset();
  };

  const { emptyAttributeTree } = useAttributeTree();

  const perkForm = useForm({
    defaultValues: {
      name: perk?.name ?? '',
      description: perk?.description || '',
      modifiers: perk?.modifiers || {},
      attributes: perk?.attributes || emptyAttributeTree,
    },
    onSubmit: async ({ value }) => {
      await createPerk.mutate(value);
    },
  });

  return (
    <FormLayout
      itemId={perkId}
      createMutation={createPerk}
      deleteMutation={deletePerk}
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
          perkForm.handleSubmit();
        }}
      >
        <h1 className="text-center">{capitalCase(mode) + ' Perk'}</h1>
        <Divider />
        <ArrowHeader2 title="Perk Information" />
        <perkForm.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Perk name must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => <InputField label="Perk name" field={field} />}
        </perkForm.Field>
        <perkForm.Field
          name="description"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Perk description must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => (
            <TextAreaField
              className="h-40 w-full"
              label="Perk description"
              field={field}
            />
          )}
        </perkForm.Field>
        <Divider />
        <ModifierField form={perkForm} />
        <ArrowHeader2 title="Perk Requirements" />
        <AttributeField form={perkForm} />
        <BtnRect
          ariaLabel={capitalCase(mode)}
          type="submit"
          className="group w-full"
        >
          {createPerk.isPending ? (
            <Loading
              className="group-hover:text-yellow-300 dark:text-gray-900"
              size={1.15}
            />
          ) : (
            capitalCase(mode)
          )}
        </BtnRect>
      </form>
    </FormLayout>
  );
};

export default PerkForm;
