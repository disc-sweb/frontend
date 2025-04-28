import React from 'react';

import PropTypes from 'prop-types';

import { StyledButton } from './styles';

SubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  ascancel: PropTypes.bool,
};
export default function SubmitButton({
  children,
  onClick,
  disabled,
  ascancel,
}) {
  return (
    <StyledButton
      type='submit'
      onClick={onClick}
      disabled={disabled}
      ascancel={ascancel}
    >
      {children}
    </StyledButton>
  );
}
