import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import InputField from './InputField';
import BtnRect from './buttons/BtnRect';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import useSignupMutation from '../hooks/useSignupMutation/useSignupMutation';
import { useForm } from '@tanstack/react-form';
import Loading from './Loading';
import ArrowHeader1 from './ArrowHeader1';

const SignupForm = () => {
  const [errors, setErrors] = useState([]);

  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);

  const signupMutation = useSignupMutation(apiUrl, setErrors);

  const signupForm = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      setErrors([]);
      signupMutation.mutate(value);
    },
  });

  return (
    <ThemeContainer
      chamfer="medium"
      borderColor={accentPrimary}
      className="mx-auto w-full rounded-br-5xl rounded-tl-5xl shadow-lg shadow-slate-950"
    >
      <form
        className="bg-primary flex flex-col gap-6 p-4 clip-6 md:gap-8 md:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          signupForm.handleSubmit();
        }}
      >
        <ArrowHeader1 title="Sign up" />
        <div className="flex flex-col gap-4 md:gap-6">
          <signupForm.Field
            name="firstName"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'First name must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => <InputField label="First Name" field={field} />}
          </signupForm.Field>
          <signupForm.Field
            name="lastName"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Last name must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => <InputField label="Last Name" field={field} />}
          </signupForm.Field>
          <signupForm.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                  ? undefined
                  : 'Email must be in a valid email format',
            }}
          >
            {(field) => <InputField label="Email" field={field} />}
          </signupForm.Field>
          <signupForm.Field
            name="password"
            validators={{
              onChange: ({ value }) =>
                value.length < 8
                  ? 'Password must be at least 8 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <InputField type="password" label="Password" field={field} />
            )}
          </signupForm.Field>
          <signupForm.Field
            name="confirmPassword"
            validators={{
              onChange: ({ value }) =>
                value.length < 8
                  ? 'Password must be at least 8 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <InputField
                type="password"
                label="Confirm Password"
                field={field}
              />
            )}
          </signupForm.Field>
        </div>
        <BtnRect type="submit" className="group w-full min-w-40">
          {signupMutation.isPending ? (
            <Loading
              className="group-hover:text-yellow-300 dark:text-gray-900"
              size={1.15}
            />
          ) : (
            'Sign up'
          )}
        </BtnRect>
        <p className="text-tertiary text-center">
          Already have an account?
          <Link to="/signin">
            <span className="pl-2 hover:underline">Sign in</span>
          </Link>
        </p>
        {errors?.length > 0 && (
          <div className="flex flex-col gap-3 self-start">
            <span className="text-primary">Error creating account:</span>
            {errors.map((error, index) => (
              <p key={index} className="text-error">
                {error}
              </p>
            ))}
          </div>
        )}
      </form>
    </ThemeContainer>
  );
};

export default SignupForm;
