import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import InputField from './InputField';
import BtnRect from './BtnRect';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import useSignupMutation from '../hooks/useSignupMutation/useSignupMutation';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState([]);
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);

  const signupMutation = useSignupMutation(apiUrl, setErrors);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    signupMutation.mutate(formData);
  };

  return (
    <ThemeContainer
      chamfer="52"
      borderColor={accentPrimary}
      className="bg-primary mb-auto ml-auto flex flex-col gap-6 p-4 clip-12 md:min-w-[500px] md:gap-8 md:p-8"
      position="mx-auto max-w-xl w-full"
    >
      <h2 className="text-accent text-center text-4xl font-semibold md:text-5xl">
        Create credentials
      </h2>
      <div className="flex flex-col gap-4 md:gap-6">
        <InputField
          label="First Name"
          name="firstName"
          type="text"
          minLength={2}
          onChange={handleChange}
        />
        <InputField
          label="Last Name"
          name="lastName"
          type="text"
          minLength={2}
          onChange={handleChange}
        />
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
        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          minLength={6}
          onChange={handleChange}
        />
      </div>
      <BtnRect
        type="submit"
        className="w-full p-2 text-lg clip-4 md:text-xl"
        onClick={handleSubmit}
      >
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
    </ThemeContainer>
  );
};

export default SignupForm;
