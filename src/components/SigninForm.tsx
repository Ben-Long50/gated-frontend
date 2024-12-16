import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import InputField from './InputField';
import BtnRect from './BtnRect';
import { AuthContext } from '../contexts/AuthContext';
import Icon from '@mdi/react';
import { mdiFacebook, mdiGoogle } from '@mdi/js';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import BtnAuth from './BtnAuth';
// import useSigninMutation from '../hooks/useSigninMutation';
// import useGuestSigninMutation from '../hooks/useGuestSigninMutation';

const SigninForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);

  // const signinMutation = useSigninMutation(apiUrl, setErrors);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const errorMessage = params.get('error');
    const statusCode = params.get('status');
    if (errorMessage) {
      setErrors([errorMessage]);
      console.log(`Error Code: ${statusCode}`);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const facebookSignin = () => {
    window.location.href = `${apiUrl}/auth/facebook/callback`;
  };

  const googleSignin = async () => {
    window.location.href = `${apiUrl}/auth/google`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    signinMutation.mutate(formData);
  };

  return (
    <ThemeContainer
      chamfer="48"
      borderColor={accentPrimary}
      className="bg-primary flex flex-col gap-6 p-4 clip-12 md:gap-8 md:p-8 lg:min-w-[500px]"
      position="mx-auto max-w-xl w-full"
    >
      <h2 className="text-accent text-center text-4xl font-semibold md:text-5xl">
        Credentials
      </h2>
      <div className="flex flex-col gap-4 md:gap-6">
        <InputField
          label="Email"
          name="email"
          type="email"
          onChange={handleChange}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          minLength={6}
          onChange={handleChange}
        />
      </div>
      <BtnRect type="submit" className="w-full p-2 text-lg clip-4 md:text-xl">
        Sign in
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
          <Icon className="mr-2 text-inherit" path={mdiGoogle} size={1.5} />
          Google
        </BtnAuth>
        <BtnAuth
          onClick={(e) => {
            e.preventDefault();
            facebookSignin();
          }}
        >
          <Icon className="mr-2 text-inherit" path={mdiFacebook} size={1.5} />
          Facebook
        </BtnAuth>
      </div>
      <p className="text-tertiary w-full text-center">
        Don't have an account?
        <Link to="/signup">
          <span className="pl-2 hover:underline">Sign up</span>
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
    </ThemeContainer>
  );
};

export default SigninForm;
