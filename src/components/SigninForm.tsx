import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import InputField from './InputField';
import BtnRect from './buttons/BtnRect';
import { AuthContext } from '../contexts/AuthContext';
import Icon from '@mdi/react';
import { mdiFacebook, mdiGoogle } from '@mdi/js';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import BtnAuth from './buttons/BtnAuth';
import { useForm } from '@tanstack/react-form';
import useSigninMutation from '../hooks/useSigninMutation/useSigninMutation';
import Loading from './Loading';
import ArrowHeader1 from './ArrowHeader1';

const SigninForm = () => {
  const [errors, setErrors] = useState([]);

  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);

  const signinMutation = useSigninMutation(apiUrl, setErrors);

  const signinForm = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      await signinMutation.mutate(value);
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const errorMessage = params.get('error');
    const statusCode = params.get('status');
    if (errorMessage) {
      setErrors([errorMessage]);
      console.log(`Error Code: ${statusCode}`);
    }
  }, []);

  const facebookSignin = () => {
    window.location.href = `${apiUrl}/auth/facebook/callback`;
  };

  const googleSignin = async () => {
    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <ThemeContainer
      chamfer="medium"
      borderColor={accentPrimary}
      className="mx-auto w-full"
    >
      <form
        className="flex w-full flex-col gap-6 p-4 md:gap-8 md:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          signinForm.handleSubmit();
        }}
      >
        <ArrowHeader1 title="Sign in" />
        <div className="flex flex-col gap-4 md:gap-6">
          <signinForm.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                  ? undefined
                  : 'Email must be in a valid email format',
            }}
          >
            {(field) => <InputField label="Email" field={field} />}
          </signinForm.Field>
          <signinForm.Field
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
          </signinForm.Field>
        </div>
        <BtnRect type="submit" className="group w-full min-w-40">
          {signinMutation.isPending ? (
            <Loading
              className="group-hover:text-accent dark:text-gray-900"
              size={1.15}
            />
          ) : (
            'Sign in'
          )}
        </BtnRect>
        <div className="text-tertiary -my-2 flex items-center">
          <hr className="grow border-gray-400" />
          <p className="mx-4 text-gray-400">or</p>
          <hr className="grow border-gray-400" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <BtnAuth
            onClick={(e) => {
              e.preventDefault();
              googleSignin();
            }}
          >
            <Icon
              className="mr-2 stroke-inherit text-inherit"
              path={mdiGoogle}
              size={1.5}
            />
            Google
          </BtnAuth>
          <BtnAuth
            onClick={(e) => {
              e.preventDefault();
              facebookSignin();
            }}
          >
            <Icon
              className="mr-2 stroke-inherit text-inherit"
              path={mdiFacebook}
              size={1.5}
            />
            Facebook
          </BtnAuth>
        </div>
        <p className="text-tertiary w-full text-center">
          Don't have an account?
          <Link to="/signup">
            <span className="pl-2 hover:underline">Sign up</span>
          </Link>
        </p>
        {errors?.length > 0 && (
          <div className="flex flex-col gap-3 self-start">
            <span className="text-primary">Error creating account:</span>
            {errors?.map((error, index) => (
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

export default SigninForm;
