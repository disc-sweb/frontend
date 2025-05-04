import React, { useState } from 'react';

import styled from 'styled-components';

import { Form, FormTitle } from 'common/components/form/Form';
import { StyledButton } from 'common/components/form/styles.js';
import { useUser } from 'common/contexts/UserContext';

import { StyledLinkCenter, StyledPage } from './styles';

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  background-color: #ffe6e6;
`;

const SuccessMessage = styled.div`
  color: #2e7d32;
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  background-color: #edf7ed;
`;

export default function RequestPasswordReset() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { requestPasswordReset } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await requestPasswordReset(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledPage>
      {!success ? (
        <Form onSubmit={handleSubmit}>
          <FormTitle>Reset Password</FormTitle>
          <p>
            Enter the email address you used for your account and we’ll send you
            instructions to reset your password.
          </p>
          <Input
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete='email'
          />
          <StyledButton type='submit' disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Reset Password'}
          </StyledButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <StyledLinkCenter to='/login'>BACK TO LOGIN</StyledLinkCenter>
        </Form>
      ) : (
        <div>
          <SuccessMessage>
            Password reset instructions have been sent to your email. Please
            check your inbox and follow the instructions to reset your password.
            If you don&apos;t receive the email within a few minutes, please
            check your spam folder.
          </SuccessMessage>
          <StyledLinkCenter to='/login'>BACK TO LOGIN</StyledLinkCenter>
        </div>
      )}
    </StyledPage>
  );
}
