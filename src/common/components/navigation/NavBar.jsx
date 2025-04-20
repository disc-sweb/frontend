import React, { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
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

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    padding: 1.5rem;
    align-items: center;
  }
`;

const LeftAligned = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;
`;

const RightAligned = styled.div`
  display: flex;
  gap: 4.6rem;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  padding: 0 1.7rem;
`;

const LogoPlaceholder = styled(Button.Invisible)`
  padding: 0;
  font-size: 1.7rem;
  font-weight: bold;
  font-family: monospace;
`;

const AnimatedLink = styled(Button.Invisible)`
  position: relative;
  padding: 4px 0;
  font-size: 1rem;
  font-weight: 500;
  color: black;
  text-decoration: none;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    height: 2px;
    width: 100%;
    background-color: #007f80;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  &.active::after {
    transform: scaleX(1);
  }
`;

export default function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const location = useLocation();

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
      <RightAligned>
        <AnimatedLink
          className={location.pathname === '/' ? 'active' : ''}
          onClick={() => navigate('/')}
        >
          Home
        </AnimatedLink>
        <AnimatedLink
          className={location.pathname === '/courses' ? 'active' : ''}
          onClick={() => navigate('/courses')}
        >
          Courses
        </AnimatedLink>
        {user ? (
          <AnimatedLink
            className={isModalOpen ? 'active' : ''}
            onClick={handleLogoutClick}
          >
            Log Out
          </AnimatedLink>
        ) : (
          <AnimatedLink
            className={location.pathname === '/login' ? 'active' : ''}
            onClick={() => navigate('/login')}
          >
            Login
          </AnimatedLink>
        )}
        <LogoutModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onLogout={handleLogoutConfirm}
        />
      </RightAligned>
    </StyledNav>
  );
}
