import styled from 'styled-components';

import { Button } from 'common/components/Button';

export const InputContainer = styled.div``;

export const InputName = styled.h3`
  margin: 0;
  text-align: left;
  font-weight: normal;
  font-size: 1rem;
  margin-bottom: 4px;

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 2px;
  }
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

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
    padding: 4px 0;
  }
`;

export const StyledTextArea = styled.textarea`
  height: 200px;
  width: 100%;
  font-size: 1rem;
  border: 1px solid #474747;
  padding: 8px;
  background-color: transparent;
  resize: vertical;
  color: #333;
  box-sizing: border-box;

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

  input {
    opacity: 0;
  }
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

  @media screen and (max-width: 768px) {
    top: 0;
    height: 80%;
  }
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 40px; // Add this to prevent button size changes

    @media screen and (max-width: 768px) {
      min-height: 30px;
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
    margin-top: 10px;
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 8px;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #333;

  input[type='radio'] {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #007575;
    border-radius: 50%;
    margin: 0;
    cursor: pointer;
    position: relative;

    &:checked {
      background-color: #007575;
      border: 2px solid #007575;

      &:after {
        content: '';
        width: 10px;
        height: 10px;
        background: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
      }
    }

    &:hover {
      border-color: #005757;
    }
  }
`;
