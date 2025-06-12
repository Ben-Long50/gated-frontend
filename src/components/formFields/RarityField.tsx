import { FormApi } from '@tanstack/react-form';
import InputSelectField from '../InputSelectField';
import { capitalCase } from 'change-case';

const RarityField = ({
  form,
  category,
}: {
  form: FormApi;
  category: string;
}) => {
  return (
    <form.Field
      name="rarity"
      validators={{
        onSubmit: ({ value }) => (!value ? 'Select a rarity' : undefined),
      }}
    >
      {(field) => (
        <InputSelectField
          label={capitalCase(category) + ' Rarity'}
          field={field}
          options={['common', 'uncommon', 'rare', 'blackMarket', 'artifact']}
        />
      )}
    </form.Field>
  );
};

export default RarityField;
