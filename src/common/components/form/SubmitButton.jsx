import React from 'react';

import PropTypes from 'prop-types';

import { Spinner } from './Spinnner';
import { StyledButton } from './styles';

SubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  ascancel: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default function SubmitButton({
  children,
  onClick,
  disabled,
  ascancel,
  isLoading = false,
}) {
  return (
    <StyledButton
      type='submit'
      onClick={onClick}
      disabled={disabled || isLoading}
      ascancel={ascancel}
    >
      {isLoading ? (
        <>
          {children}
          <Spinner />
        </>
      ) : (
        children
      )}
    </StyledButton>
  );
}
