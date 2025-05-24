import React, { useState } from 'react';

import { FiMenu, FiX } from 'react-icons/fi';
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
    padding: 8px 32px;
    align-items: space-between;
  }
`;

const LeftAligned = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;
`;

const Menu = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    z-index: 10;

    .exit-icon {
      position: fixed;
      right: 32px;
    }
  }
`;

const RightAligned = styled.div`
  display: flex;
  gap: 4.6rem;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  padding: 0 1.7rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const LogoPlaceholder = styled(Button.Invisible)`
  padding: 0;
  font-size: 1.7rem;
  font-weight: bold;
  font-family: monospace;

  img {
    height: 200px;
  }

  @media screen and (max-width: 768px) {
    img {
      height: 120px;
    }
  }
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

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    position: relative;
  }
`;

const MobileMenuOverlay = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    padding-top: 200px;
    position: fixed;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background: white;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 48px;
  }
`;

export default function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleMenuToggle = () => setIsMenuOpen((open) => !open);
  const handleMobileNav = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <StyledNav>
      <LeftAligned>
        <LogoPlaceholder onClick={() => navigate('/')}>
          <img src='/sokanalogo.png' alt='Sokana Logo' />
        </LogoPlaceholder>
      </LeftAligned>
      <Menu>
        {isMenuOpen ? (
          <FiX size={32} onClick={handleMenuToggle} className='exit-icon' />
        ) : (
          <FiMenu size={32} onClick={handleMenuToggle} />
        )}
      </Menu>
      {isMenuOpen && (
        <MobileMenuOverlay>
          <AnimatedLink
            className={location.pathname === '/' ? 'active' : ''}
            onClick={() => handleMobileNav('/')}
          >
            Home
          </AnimatedLink>
          <AnimatedLink
            className={location.pathname === '/courses' ? 'active' : ''}
            onClick={() => handleMobileNav('/courses')}
          >
            Courses
          </AnimatedLink>
          {user ? (
            <AnimatedLink
              className={isModalOpen ? 'active' : ''}
              onClick={() => {
                handleLogoutClick();
                setIsMenuOpen(false);
              }}
            >
              Log Out
            </AnimatedLink>
          ) : (
            <AnimatedLink
              className={location.pathname === '/login' ? 'active' : ''}
              onClick={() => handleMobileNav('/login')}
            >
              Login
            </AnimatedLink>
          )}
        </MobileMenuOverlay>
      )}
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
