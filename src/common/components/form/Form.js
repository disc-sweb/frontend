import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 40px 80px;
  text-align: flex-start;
  box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.25);
  background-color: #ffffff;

  @media screen and (max-width: 768px) {
    height: 100%;
    padding: 40px;
    box-shadow: none;
  }
`;

export const FormTitle = styled.h2`
  margin: 0;
  font-size: 1.8rem;
  margin-bottom: 6px;
  font-family: 'PoppinsBold';

  @media screen and (max-width: 768px) {
    font-size: 1.4rem;
  }
`;
