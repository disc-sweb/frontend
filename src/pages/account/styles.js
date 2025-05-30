import 'App.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from 'common/components/Button';

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 40%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  background-color: #ffffff;
  font-family: 'PoppinsLight';

  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0;
    height: 100%;
`;

export const StyledInput = styled.input`
  font-size: 1rem;
  padding: 8px 32px 8px 0; /* space for the eye icon on the right */
  border: none;
  border-bottom: 1px solid gray;
  width: 100%;
  outline: none;

  &:focus {
    border-bottom: 2px solid #007bff;
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 8px;
  background-color: var(--white);
  cursor: pointer;
`;

export const StyledPage = styled.div`
  flex: 1 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fbe9fd;
  font-family: 'PoppinsLight';
  padding-top: 25px;
  padding-bottom: 100px;

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

export const StyledButton = styled(Button.Primary)`
  font-size: 1.1rem;
  width: content;
  padding-left: 30px;
  padding-right: 30px;
  margin-left: auto;
  margin-right: auto;
`;

export const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-size: 0.9rem;
  margin-top: 1rem;
  align-self: flex-start;
  font-family: 'PoppinsMedium';
  color: #007575;

  &:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 768px) {
    font-size: 0.7rem;
    margin-top: 0.5rem;
  }
`;

export const StyledLinkCenter = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-size: 0.9rem;
  margin-top: 1rem;
  align-self: center;
  font-family: 'PoppinsMedium';
  color: #007575;

  &:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 768px) {
    font-size: 0.7rem;
    margin-top: 0.5rem;
  }
`;
