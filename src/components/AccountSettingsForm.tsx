import { useForm } from '@tanstack/react-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import BtnRect from './buttons/BtnRect';
import Loading from './Loading';
import InputField from './InputField';
import FormLayout from '../layouts/FormLayout';
import ArrowHeader2 from './ArrowHeader2';
import Divider from './Divider';
import useAccountQuery from '../hooks/useAccountQuery/useAccountQuery';
import useUpdateAccountMutation from '../hooks/useUpdateAccountMutation/useUpdateAccountMutation';

const AccountSettingsForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const { data: account, isLoading, isPending } = useAccountQuery(apiUrl);

  const updateAccount = useUpdateAccountMutation(
    apiUrl,
    setFormMessage,
    setErrors,
  );

  const handleReset = async () => {
    accountForm.reset();
  };

  const accountForm = useForm({
    defaultValues: {
      username: account?.username || '',
      firstName: account?.firstName || '',
      lastName: account?.lastName || '',
      email: account?.email || '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setErrors([]);
      await updateAccount.mutate(value);
    },
  });

  if (isLoading || isPending) return <Loading />;

  return (
    <FormLayout
      modifyMutation={updateAccount}
      handleReset={handleReset}
      formMessage={formMessage}
    >
      <form
        className="flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          accountForm.handleSubmit();
        }}
      >
        <h1 className="text-center">Account Settings</h1>
        <Divider />
        <ArrowHeader2 title="Account Information" />
        <accountForm.Field
          name="username"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Username name must be at least 4 characters long'
                : undefined,
          }}
        >
          {(field) => (
            <InputField className="grow" label="Username" field={field} />
          )}
        </accountForm.Field>
        <accountForm.Field
          name="firstName"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'First name must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => (
            <InputField className="grow" label="First Name" field={field} />
          )}
        </accountForm.Field>
        <accountForm.Field
          name="lastName"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Last name must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => (
            <InputField className="grow" label="Last Name" field={field} />
          )}
        </accountForm.Field>
        <accountForm.Field
          name="email"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Email must be a valid email format'
                : undefined,
          }}
        >
          {(field) => (
            <InputField
              className="grow"
              label="Email"
              type="email"
              field={field}
            />
          )}
        </accountForm.Field>
        <accountForm.Field
          name="password"
          validators={{
            onChange: ({ value }) =>
              value.length < 8
                ? 'Enter your password to change your account information securely'
                : undefined,
          }}
        >
          {(field) => (
            <InputField
              className="grow"
              label="Password"
              type="password"
              field={field}
            />
          )}
        </accountForm.Field>
        <BtnRect
          ariaLabel="Update account settings"
          type="submit"
          className="group w-full"
        >
          {updateAccount.isPending ? (
            <Loading
              className="group-hover:text-yellow-300 dark:text-gray-900"
              size={1.15}
            />
          ) : (
            'Update Account'
          )}
        </BtnRect>
        {errors?.length > 0 && (
          <div className="flex flex-col gap-3 self-start">
            <span className="text-primary">Error updating account:</span>
            {errors.map((error, index) => (
              <p key={index} className="text-error">
                {error}
              </p>
            ))}
          </div>
        )}
      </form>
    </FormLayout>
  );
};

export default AccountSettingsForm;
