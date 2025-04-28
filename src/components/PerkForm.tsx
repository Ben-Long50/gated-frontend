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
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import useDeletePerkMutation from '../hooks/useDeletePerkMutation/useDeletePerkMutation';
import usePerks from '../hooks/usePerks';
import { Perk } from 'src/types/perk';
import { Modifier } from 'src/types/modifier';
import ModifierField from './ModifierField';
import Divider from './Divider';
import ArrowHeader2 from './ArrowHeader2';

const PerkForm = ({ mode }: { mode?: string }) => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { perkId } = useParams();

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
    if (perkId) {
      const { data: refetchedPerk } = await refetch();
      attributeTree.setAttributeTree(
        attributeTree.structureTree(refetchedPerk.requirements),
      );
      perkForm.reset({
        name: refetchedPerk.name,
        description: refetchedPerk.description,
        modifiers: refetchedPerk.modifiers,
        requirements: attributeTree.structureTree(refetchedPerk.requirements),
      });
    } else {
      attributeTree.setAttributeTree(attributeTree.emptyAttributeTree);
      perkForm.reset();
    }
  };

  const attributeTree = useAttributeTree(perk?.requirements);

  const perkForm = useForm({
    defaultValues: {
      name: perk?.name ?? '',
      description: perk?.description || '',
      modifiers:
        perk?.modifiers?.map((modifier: Modifier) => ({
          type: modifier.type,
          actionId: modifier.action?.id || null,
          stat: modifier.stat || null,
          operator: modifier.operator,
          valueType: modifier.valueType,
          attribute: modifier.attribute,
          skill: modifier.skill,
          value: modifier.value,
          duration: modifier.duration,
        })) || ([] as Modifier[]),
      requirements: attributeTree?.tree || null,
    },
    onSubmit: async ({ value }) => {
      value.requirements = attributeTree.destructureTree(value.requirements);

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
        <h1 className="text-center">{perk ? 'Update Perk' : 'Create Perk'}</h1>
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
        <perkForm.Field name="modifiers">
          {(field) => <ModifierField form={perkForm} field={field} />}
        </perkForm.Field>
        <Divider />
        <ArrowHeader2 title="Perk Requirements" />
        <div className="flex w-full grow flex-col gap-6 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-10">
          {Object.entries(attributeTree.tree).map(
            ([attribute, { points, skills }]) => (
              <div key={attribute}>
                <AttributeCard
                  attribute={attribute}
                  points={points}
                  skills={skills}
                  updatePoints={attributeTree.updatePoints}
                />
              </div>
            ),
          )}
        </div>
        <BtnRect ariaLabel="Create perk" type="submit" className="group w-full">
          {createPerk.isPending ? (
            <Loading
              className="group-hover:text-yellow-300 dark:text-gray-900"
              size={1.15}
            />
          ) : perk ? (
            'Update'
          ) : (
            'Create'
          )}
        </BtnRect>
      </form>
    </FormLayout>
  );
};

export default PerkForm;
