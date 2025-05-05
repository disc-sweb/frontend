import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import GoogleButton from 'common/components/GoogleButton';
import { Form, FormTitle } from 'common/components/form/Form';
import { Input } from 'common/components/form/Input';
import SubmitButton from 'common/components/form/SubmitButton';
import { RedSpan } from 'common/components/form/styles';
import { useUser } from 'common/contexts/UserContext';

import { StyledForm, StyledLink, StyledLinkCenter, StyledPage } from './styles';

export default function Login() {
  const navigate = useNavigate();
  const { login, googleAuth } = useUser();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(formState.email, formState.password);
      navigate('/', { replace: true });
    } catch (error) {
      setError(error.message || 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleAuth();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <StyledPage>
      <StyledForm>
        <Form onSubmit={handleSubmit}>
          <FormTitle>Login</FormTitle>
          {error && <RedSpan>{error}</RedSpan>}
          <Input.Text
            title='EMAIL'
            name='email'
            placeholder='jsmith or js@example.com'
            value={formState.email}
            onChange={handleChange}
            required
          />
          <Input.Password
            title='PASSWORD'
            name='password'
            value={formState.password}
            onChange={handleChange}
            required
          />
          <StyledLink to='/forgot-password'>I FORGOT MY PASSWORD</StyledLink>
          <SubmitButton disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </SubmitButton>
          <GoogleButton
            onClick={handleGoogleLogin}
            isLoading={isLoading}
            text='Sign in with Google'
          />
          <StyledLinkCenter to='/signup'>
            I DON&apos;T HAVE AN ACCOUNT
          </StyledLinkCenter>
        </Form>
      </StyledForm>
    </StyledPage>
  );
}
