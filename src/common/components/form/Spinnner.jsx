import React from 'react';

import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: 8px;
  vertical-align: middle;
`;

const SpinnerCircle = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const Spinner = () => (
  <SpinnerWrapper>
    <SpinnerCircle />
  </SpinnerWrapper>
);
