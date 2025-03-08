import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from 'common/components/Button';
import { useUser } from 'common/contexts/UserContext';

import LogoutModal from './LogoutModal';

const StyledNav = styled.nav`
  display: flex;
  gap: 10px;
  padding: 10px 48px;
  font-size: 20px;
  border-bottom: 3px solid black;
`;

const LeftAligned = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;
`;

const LogoPlaceholder = styled(Button.Invisible)`
  padding: 0;
  font-size: 1.7rem;
  font-weight: bold;
  font-family: monospace;
`;

export default function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleLogoutConfirm = async () => {
    try {
      await logout();
      setIsModalOpen(false);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <StyledNav>
      <LeftAligned>
        <LogoPlaceholder onClick={() => navigate('/')}>
          <img src='/sokanalogo.png' height={200} alt='Sokana Logo' />
        </LogoPlaceholder>
      </LeftAligned>
      <Button.Invisible onClick={() => navigate('/')}>Home</Button.Invisible>
      <Button.Invisible onClick={() => navigate('/courses')}>
        Courses
      </Button.Invisible>
      {user ? (
        <Button.Invisible onClick={handleLogoutClick}>Log Out</Button.Invisible>
      ) : (
        <>
          {/* <Button.Invisible onClick={() => navigate('/signup')}>
            Sign Up
          </Button.Invisible> */}
          <Button.Invisible onClick={() => navigate('/login')}>
            Login
          </Button.Invisible>
        </>
      )}
      <LogoutModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onLogout={handleLogoutConfirm}
      />
    </StyledNav>
  );
}
