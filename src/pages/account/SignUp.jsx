import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import GoogleButton from 'common/components/GoogleButton';
import { Form, FormTitle } from 'common/components/form/Form';
import { Input } from 'common/components/form/Input';
import SubmitButton from 'common/components/form/SubmitButton';
import { useUser } from 'common/contexts/UserContext';

import { StyledForm, StyledPage } from './styles';

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { googleAuth } = useUser();

  const [formState, setFormState] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const handleChangeFullname = (e) => {
    setFormState({ ...formState, fullname: e.target.value });
    setError('');
  };

  const handleChangeEmail = (e) => {
    setFormState({ ...formState, email: e.target.value });
    setError('');
  };

  const handleChangePassword = (e) => {
    setFormState({ ...formState, password: e.target.value });
    setError('');
  };

  const handleGoogleSignup = async () => {
    try {
      await googleAuth();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formState.email,
            password: formState.password,
            fullname: formState.fullname || undefined,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }
      alert(
        'Account created successfully! Please check your email to verify your account.'
      );
      navigate('/login', {
        state: {
          message:
            'Account created successfully! Please check your email to verify your account.',
        },
      });
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledPage>
      <StyledForm>
        <Form onSubmit={handleSubmit}>
          <FormTitle>Signup</FormTitle>
          {error && <div className='text-red-500 mb-4'>{error}</div>}
          <Input.Text
            title='FULL NAME'
            placeholder='John'
            value={formState.fullname}
            onChange={handleChangeFullname}
          />
          <Input.Text
            title='EMAIL'
            placeholder='j@example.com'
            value={formState.email}
            onChange={handleChangeEmail}
            required
          />
          <Input.Password
            title='PASSWORD'
            value={formState.password}
            onChange={handleChangePassword}
            required
          />
          <SubmitButton onClick={() => {}} disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </SubmitButton>
          <GoogleButton
            onClick={handleGoogleSignup}
            isLoading={isLoading}
            text='Sign up with Google'
          />
        </Form>
      </StyledForm>
    </StyledPage>
  );
}
