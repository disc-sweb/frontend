import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useUser } from 'common/contexts/UserContext';

import { StyledPage } from './styles';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const PasswordStrength = styled.div`
  height: 5px;
  margin-top: 5px;
  background-color: ${({ strength }) => {
    switch (strength) {
      case 'weak':
        return '#ff4d4d';
      case 'medium':
        return '#ffd700';
      case 'strong':
        return '#32cd32';
      default:
        return '#ccc';
    }
  }};
  width: ${({ strength }) => {
    switch (strength) {
      case 'weak':
        return '33%';
      case 'medium':
        return '66%';
      case 'strong':
        return '100%';
      default:
        return '0%';
    }
  }};
  transition: all 0.3s ease;
`;

const PasswordRequirements = styled.ul`
  font-size: 0.8rem;
  color: #666;
  margin-top: 5px;
  padding-left: 20px;
`;

const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { updatePassword } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.substring(1);

    const hashParams = new URLSearchParams(hash);

    const access_token = hashParams.get('access_token');
    const type = hashParams.get('type');

    console.log('Hash parameters:', {
      hasAccessToken: !!access_token,
      type,
    });

    if (!access_token) {
      setError(
        'No reset token found. Please request a new password reset link.'
      );
    } else if (type !== 'recovery') {
      setError(
        'Invalid reset link type. Please request a new password reset link.'
      );
    }
  }, []);

  const checkPasswordStrength = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const strength =
      (hasUpperCase ? 1 : 0) +
      (hasLowerCase ? 1 : 0) +
      (hasNumbers ? 1 : 0) +
      (hasSpecialChar ? 1 : 0) +
      (password.length >= 8 ? 1 : 0);

    if (strength >= 4) return 'strong';
    if (strength >= 2) return 'medium';
    return 'weak';
  };

  const validatePassword = (password) => {
    const requirements = [];

    if (password.length < 8) {
      requirements.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      requirements.push('Include at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      requirements.push('Include at least one lowercase letter');
    }
    if (!/\d/.test(password)) {
      requirements.push('Include at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      requirements.push('Include at least one special character');
    }

    return requirements;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const hash = window.location.hash.substring(1);
    const hashParams = new URLSearchParams(hash);
    const access_token = hashParams.get('access_token');

    if (!access_token) {
      setError(
        'Reset token not found. Please request a new password reset link.'
      );
      return;
    }

    const requirements = validatePassword(password);
    if (requirements.length > 0) {
      setError(requirements.join(', '));
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Attempting password reset with token');
      await updatePassword(password, access_token);

      navigate('/login', {
        state: {
          message:
            'Password has been reset successfully. Please login with your new password.',
        },
        replace: true,
      });
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledPage>
      <h2>Set New Password</h2>
      <Form onSubmit={handleSubmit}>
        <PasswordContainer>
          <Input
            type='password'
            placeholder='New Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <PasswordStrength strength={checkPasswordStrength(password)} />
          {password && (
            <PasswordRequirements>
              {validatePassword(password).map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </PasswordRequirements>
          )}
        </PasswordContainer>
        <Input
          type='password'
          placeholder='Confirm New Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type='submit' disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Password'}
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </StyledPage>
  );
}
