import { useContext, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import { useForm } from '@tanstack/react-form';
import Loading from './Loading';
import ArrowHeader2 from './ArrowHeader2';
import InputSelectField from './InputSelectField';
import Icon from '@mdi/react';
import { mdiContentSaveOutline, mdiSync } from '@mdi/js';
import useUsersQuery from '../hooks/useUsersQuery/useUsersQuery';
import { AuthContext } from '../contexts/AuthContext';
import InputFieldBasic from './InputFieldBasic';
import AccountPicture from './AccountPicture';
import { User } from 'src/types/user';
import useUpdateUserRoleMutation from '../hooks/useUpdateUserRoleMutation/useUpdateUserRoleMutation';
import FormLayout from '../layouts/FormLayout';

const UserRoleForm = ({
  user,
  setQuery,
}: {
  user: User;
  setQuery: (value: string) => void;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');

  const updateUserRole = useUpdateUserRoleMutation(apiUrl, setFormMessage);

  const roleForm = useForm({
    defaultValues: {
      id: user.id || 0,
      role: user.role || '',
    },
    onSubmit: ({ value }) => {
      updateUserRole.mutate(value);
    },
  });

  const handleReset = () => {
    setQuery('');
  };

  return (
    <FormLayout
      modifyMutation={updateUserRole}
      formMessage={formMessage}
      handleReset={handleReset}
    >
      <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-4">
          <AccountPicture user={user} />
          <ArrowHeader2 title={user.username} />
        </div>
        <div className="flex items-center gap-4">
          <roleForm.Field name="role">
            {(field) => (
              <InputSelectField
                field={field}
                label="Role"
                options={['SUPERADMIN', 'ADMIN', 'USER', 'GUEST']}
                initialValue={user.role}
              />
            )}
          </roleForm.Field>
          <button
            className="hover:bg-primary timing group size-12 shrink-0 rounded-full bg-yellow-300 p-1.5 shadow-md shadow-black hover:ring-2 hover:ring-yellow-300"
            onClick={() => roleForm.handleSubmit()}
          >
            <Icon
              path={mdiContentSaveOutline}
              className="group-hover:text-accent timing text-zinc-950"
            />
          </button>
        </div>
      </div>
    </FormLayout>
  );
};

const UserRoles = () => {
  const { accentPrimary } = useContext(ThemeContext);
  const { apiUrl } = useContext(AuthContext);

  const [query, setQuery] = useState('');

  const { data: users, isLoading, isPending } = useUsersQuery(apiUrl, query);

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8">
      <h1 className="text-center">User Roles</h1>
      <ThemeContainer
        className={`ml-auto w-full`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <form className="flex flex-col gap-4 p-4">
          <ArrowHeader2 title="Filter Options" />
          <div className="flex items-center gap-4">
            <InputFieldBasic
              className="w-full"
              type="text"
              name="Search Users"
              label="Search Users"
              value={query}
              onChange={(value: string) => {
                setQuery(value);
              }}
            />
            <button
              className="text-accent bg-tertiary group z-10 grid size-12 shrink-0 place-items-center rounded-md p-1.5 shadow-md shadow-black hover:underline"
              onClick={(e) => {
                e.preventDefault();
                setQuery('');
              }}
            >
              <Icon
                path={mdiSync}
                className="text-secondary group-hover:text-accent timing"
              />
            </button>
          </div>
        </form>
      </ThemeContainer>
      <div className="flex w-full flex-col gap-4">
        {isLoading || isPending ? (
          <Loading />
        ) : (
          users?.map((user) => <UserRoleForm user={user} setQuery={setQuery} />)
        )}
      </div>
    </div>
  );
};

export default UserRoles;
