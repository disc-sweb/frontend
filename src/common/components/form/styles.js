import styled from 'styled-components';

import { Button } from 'common/components/Button';

export const InputContainer = styled.div``;

export const InputName = styled.h3`
  margin: 0;
  text-align: left;
  font-weight: normal;
  font-size: 1rem;
  margin-bottom: 4px;
`;
export const InputTitle = styled.span`
  margin-right: 2px;
  font-family: 'PoppinsMedium';
`;
export const RedSpan = styled.span`
  color: red;
`;

export const StyledInput = styled.input`
  width: 100%;
  font-size: 1rem;
  padding: 8px 0;
  border: none;
  border-bottom: 1px solid #999;
  background-color: transparent;
  color: #333;

  &:focus {
    border-bottom: 1px solid #007bff;
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const StyledTextArea = styled.textarea`
  height: 200px;
  width: 100%;
  font-size: 1rem;
  border: 1px solid #474747;
  border-radius: 8px;
  padding: 8px;
  background-color: transparent;
  color: #333;

  &::placeholder {
    color: #aaa;
  }
`;

export const StyledFileInput = styled.div`
  height: 200px;
  width: 100%;
  font-size: 1rem;
  border: 1px dashed #474747;
  border-radius: 8px;
  background-color: ${(props) => (props.hasFile ? 'white' : '#F4F4EF')};
  color: #474747;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const IconContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 8px;
  background-color: var(--white);
  cursor: pointer;
`;

export const StyledButton = styled(Button.Primary)`
  font-size: 1.1rem;
  width: 100%;
  font-align: center;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  background-color: ${(props) =>
    props.disabled ? '#474747' : props.ascancel ? '#832D2D' : '#006464'};
  color: 'var(--white)';
  transtion: hover 0.3s ease-in-out;
  &:hover {
    background-color: ${(props) =>
      !props.disabled && (props.ascancel ? '#772828' : '#005151')};
    cursor: ${(props) => props.disabled && 'not-allowed'};
  }
`;
