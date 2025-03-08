import React, { useState } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styled Button
const StyledButton = styled.button`
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontSize};
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  border: none;
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.hoverBgColor};
    transform: scale(1.02);
  }

  .button-icon {
    width: 20px;
    filter: ${(props) =>
      props.isHovered ? 'brightness(1.2)' : 'brightness(1)'};
  }
`;

const GenericButton = ({
  text,
  color,
  bgColor,
  hoverBgColor,
  fontSize,
  padding,
  hasIcon,
  iconSrc,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <StyledButton
      color={color}
      bgColor={bgColor}
      hoverBgColor={hoverBgColor}
      fontSize={fontSize}
      padding={padding}
      isHovered={isHovered}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{text}</span>
      {hasIcon && iconSrc && (
        <img src={iconSrc} alt='icon' className='button-icon' />
      )}
    </StyledButton>
  );
};

GenericButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  hoverBgColor: PropTypes.string,
  fontSize: PropTypes.string,
  padding: PropTypes.string,
  hasIcon: PropTypes.bool,
  iconSrc: PropTypes.string,
  onClick: PropTypes.func,
};

GenericButton.defaultProps = {
  color: 'white',
  bgColor: '#007F80', //default background color is teal
  hoverBgColor: '#555555', //hover is darker grey
  fontSize: '16px',
  padding: '8px 16px',
  hasIcon: false,
  iconSrc: '',
  onClick: () => {},
};

export default GenericButton;
