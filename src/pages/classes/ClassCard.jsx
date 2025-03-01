import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledComponent = styled.div`
  // styles
`;

const ClassCard = ({ class_title, class_duration, class_price, class_description }) => {
  return (
    <StyledComponent>
      <div>
        <img />
        <p className='card-title'>{class_title}</p>
        <p className='card-duration'>{class_duration}</p>
        <p className='card-price'>{class_price}</p>
        <p className='card-description'>{class_description}</p>
      </div>
    </StyledComponent>
  );
};

ClassCard.propTypes = {
  class_title: PropTypes.string.isRequired,
  class_duration: PropTypes.string.isRequired,
  class_price: PropTypes.number.isRequired,
  class_description: PropTypes.string.isRequired,
};

ClassCard.defaultProps = {
  prop2: 0,
};

export default ClassCard;
