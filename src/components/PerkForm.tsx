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
import usePerkQuery from '../hooks/usePerkQuery/usePerkQuery';
import Loading from './Loading';

const PerkForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const { perkId } = useParams();

  const {
    data: perk,
    isLoading,
    isPending,
    refetch,
    isRefetching,
  } = usePerkQuery(apiUrl, perkId);

  const createPerk = useCreatePerkMutation(apiUrl, perkId, setFormMessage);

  const attributeTree = useAttributeTree(perk?.requirements);

  const perkForm = useForm({
    defaultValues: {
      name: perk?.name ?? '',
      description: perk?.description || '',
      requirements: attributeTree?.tree || null,
    },
    onSubmit: async ({ value }) => {
      value.requirements = attributeTree.destructureTree(value.requirements);
      console.log(value);

      await createPerk.mutate(value);
    },
  });

  if (isLoading || isPending || isRefetching) {
    return <Loading />;
  }

  return (
    <FormLayout>
      <form
        className="bg-primary flex w-full min-w-96 flex-col gap-8 p-4 clip-8 sm:p-6 lg:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          perkForm.handleSubmit();
        }}
      >
        <h1 className="text-center">{perk ? 'Update Perk' : 'Create Perk'}</h1>
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
        <h2>Requirements</h2>
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
        <BtnRect type="submit" className="group w-full">
          {createPerk.isPending ? (
            <Loading
              className="text-gray-900 group-hover:text-yellow-300"
              size={1.15}
            />
          ) : perk ? (
            'Update'
          ) : (
            'Create'
          )}
        </BtnRect>
        {formMessage && (
          <div className="flex w-full items-center justify-between">
            {createPerk.isPending && <p>Submitting...</p>}
            {createPerk.isSuccess && <p>{formMessage}</p>}
            {createPerk.isError && (
              <p>
                Error creating perk:{' '}
                <span className="text-error">{formMessage}</span>
              </p>
            )}
            <button
              className="text-accent text-xl hover:underline"
              onClick={
                perkId
                  ? async (e) => {
                      e.preventDefault();
                      const { data: refetchedPerk } = await refetch();
                      attributeTree.setAttributeTree(
                        attributeTree.structureTree(refetchedPerk.requirements),
                      );
                      perkForm.reset({
                        name: refetchedPerk.name,
                        description: refetchedPerk.description,
                        requirements: attributeTree.structureTree(
                          refetchedPerk.requirements,
                        ),
                      });
                    }
                  : () => {
                      perkForm.reset();
                    }
              }
            >
              Reset form
            </button>
          </div>
        )}
      </form>
    </FormLayout>
  );
};

export default PerkForm;
