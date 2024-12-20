import { useContext, useEffect } from 'react';
import InputField from './InputField';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import BtnRect from './BtnRect';
import AttributeCard from './AttributeCard';
import TextAreaField from './TextAreaField';
import { AuthContext } from '../contexts/AuthContext';
import useCreatePerkMutation from '../hooks/useCreatePerkMutation/useCreatePerkMutation';
import { useForm } from '@tanstack/react-form';
import useAttributeTree from '../hooks/useAttributeTree';
import { useQueryClient } from '@tanstack/react-query';

const PerkForm = () => {
  const { apiUrl, authToken } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const queryClient = useQueryClient();

  const createPerk = useCreatePerkMutation(apiUrl, authToken);
  const attributeTree = useAttributeTree();

  const perkForm = useForm({
    defaultValues: {
      name: '',
      description: '',
      requirements: {},
    },
    onSubmit: async ({ value }) => {
      await createPerk.mutate(value, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['perks'],
            exact: false,
          });
          console.log('Perk successfully created');
        },
        onError: () => {
          console.error('Error creating perk');
        },
      });
      perkForm.reset({
        name: '',
        description: '',
        requirements: {},
      });
      attributeTree.resetTree();
    },
  });

  useEffect(() => {
    perkForm.setFieldValue('requirements', attributeTree.destructureTree());
  }, [attributeTree.tree, attributeTree, perkForm]);

  return (
    <ThemeContainer
      className="mb-auto w-full max-w-2xl lg:max-w-4xl"
      chamfer="32"
      borderColor={accentPrimary}
    >
      <form
        className="bg-primary flex w-full min-w-96 flex-col gap-8 p-8 clip-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          perkForm.handleSubmit();
        }}
      >
        <h1 className="text-center">Create Perk</h1>
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
          {(field) => <TextAreaField label="Perk description" field={field} />}
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
        <BtnRect type="submit" className="w-full">
          Create
        </BtnRect>
      </form>
    </ThemeContainer>
  );
};

export default PerkForm;
