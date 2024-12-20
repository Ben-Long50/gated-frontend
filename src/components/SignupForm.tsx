import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import InputField from './InputField';
import BtnRect from './BtnRect';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import useSignupMutation from '../hooks/useSignupMutation/useSignupMutation';
import { useForm } from '@tanstack/react-form';

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
      chamfer="32"
      borderColor={accentPrimary}
      className="mx-auto w-full max-w-2xl"
      position="mx-auto max-w-xl w-full"
      as="form"
    >
      <form
        className="bg-primary flex flex-col gap-6 p-4 clip-8 md:gap-8 md:p-8 lg:min-w-[500px]"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          signupForm.handleSubmit();
        }}
      >
        <h1 className="text-accent text-center text-4xl font-semibold md:text-5xl">
          Create credentials
        </h1>
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
        <BtnRect type="submit" className="w-full p-2 text-lg clip-4 md:text-xl">
          Sign up
        </BtnRect>
        <p className="text-tertiary text-center">
          Already have an account?
          <Link to="/signin">
            <span className="pl-2 hover:underline">Sign in</span>
          </Link>
        </p>
        {errors.length > 0 && (
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
