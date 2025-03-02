import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledComponent = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-width: 100%;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .card-image {
    width: 100%;
    min-width: 420px;
    height: 260px;
    background-color: #f5f5f5;
    object-fit: cover;
  }

  .card-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  .card-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 5px;
    color: #333;
  }

  .card-duration {
    font-size: 12px;
    color: #666;
    margin-bottom: 8px;
  }

  .card-price {
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
    &::before {
      content: '$';
    }
  }

  .card-description {
    font-size: 14px;
    line-height: 1.5;
    color: #555;
    margin-bottom: 20px;
  }
  
  .card-button {
    background-color: #2D9CDB;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    align-self: flex-middle;
    transition: background-color 0.3s;
    margin-top: auto;
  }
  
  .card-button:hover {
    background-color: #2180b9;
  }
`;

const ClassCard = ({
  class_title,
  class_duration,
  class_price,
  class_description,
}) => {
    console.log(class_description);
  return (
    <StyledComponent>
      <div className="card-image"></div>
      <div className='card-content'>
        <h3 className='card-title'>{class_title}</h3>
        <p className='card-duration'>{class_duration}</p>
        <p className='card-price'>{class_price.toFixed(2)}</p>
        <p className='card-description'>{class_description}</p>
        <button className="card-button">Go To Course</button>
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
  class_description: 'No description provided',
};

export default ClassCard;