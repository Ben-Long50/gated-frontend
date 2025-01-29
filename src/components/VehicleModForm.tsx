import { useContext, useState } from 'react';
import InputField from './InputField';
import BtnRect from './buttons/BtnRect';
import TextAreaField from './TextAreaField';
import { AuthContext } from '../contexts/AuthContext';
import { useForm } from '@tanstack/react-form';
import FormLayout from '../layouts/FormLayout';
import Loading from './Loading';
import { useParams } from 'react-router-dom';
import useCreateVehicleModMutation from '../hooks/useCreateVehicleModMutation/useCreateVehicleModMutation';
import useDeleteVehicleModMutation from '../hooks/useDeleteVehicleModMutation/useDeleteKeywordMutation';
import useVehicleModQuery from '../hooks/useVehicleModQuery/useVehicleModQuery';

const VehicleModForm = ({ title }: { title: string }) => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { modId } = useParams();

  const { data: modification } = useVehicleModQuery(apiUrl, modId);

  const createModification = useCreateVehicleModMutation(
    apiUrl,
    modId,
    setFormMessage,
  );
  const deleteModification = useDeleteVehicleModMutation(
    apiUrl,
    modId,
    setFormMessage,
  );

  const handleDelete = () => {
    if (deleteMode) {
      deleteModification.mutate();
    } else {
      setDeleteMode(true);
    }
  };

  const handleReset = async () => {
    modForm.reset();
  };

  const modForm = useForm({
    defaultValues: {
      name: modification?.name || '',
      description: modification?.description || '',
      modificationType: modification?.modificationType || '',
      price: modification?.price || '',
    },
    onSubmit: async ({ value }) => {
      console.log(value);

      await createModification.mutate(value);
    },
  });

  return (
    <FormLayout
      itemId={modId}
      createMutation={createModification}
      deleteMutation={deleteModification}
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
          modForm.handleSubmit();
        }}
      >
        <h1 className="text-center">{title} Modification</h1>
        <div className="flex w-full gap-4 lg:gap-8">
          <modForm.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Modification name must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <InputField
                className="w-full"
                label="Modification name"
                field={field}
              />
            )}
          </modForm.Field>
          <modForm.Field
            name="price"
            validators={{
              onChange: ({ value }) =>
                value < 0 ? 'Price cannot be a negative value' : undefined,
            }}
          >
            {(field) => (
              <InputField
                className="max-w-28"
                type="number"
                label="Price"
                field={field}
              />
            )}
          </modForm.Field>
        </div>
        <modForm.Field
          name="modificationType"
          validators={{
            onSubmit: ({ value }) =>
              value.length < 1
                ? 'You must select a modification type'
                : undefined,
          }}
        >
          {(field) => <InputField label="Modification type" field={field} />}
        </modForm.Field>
        <modForm.Field
          name="description"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Modification description must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => (
            <TextAreaField
              className="h-40 w-full"
              label="Modification description"
              field={field}
            />
          )}
        </modForm.Field>

        <BtnRect type="submit" className="group w-full">
          {createModification.isPending ? (
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

export default VehicleModForm;
