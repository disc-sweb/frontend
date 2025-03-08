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
  width: 500px; /* Increased from 450px */
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .card-image {
    width: 100%;
    min-width: 470px; /* Increased from 420px */
    height: 300px; /* Increased from 260px */
    background-color: #f5f5f5;
    object-fit: cover;
  }

  .card-content {
    padding: 24px; /* Increased from 20px */
    display: flex;
    flex-direction: column;
  }

  .card-title {
    font-size: 20px; /* Increased from 18px */
    font-weight: 600;
    margin-bottom: 8px; /* Increased from 5px */
    color: #333;
  }

  .card-duration {
    font-size: 14px; /* Increased from 12px */
    color: #666;
    margin-bottom: 10px; /* Increased from 8px */
  }

  .card-price {
    font-weight: 600;
    font-size: 18px; /* Added font-size */
    color: #333;
    margin-bottom: 16px; /* Increased from 12px */
    &::before {
      content: '$';
    }
  }

  .card-description {
    font-size: 15px; /* Increased from 14px */
    line-height: 1.6; /* Increased from 1.5 */
    color: #555;
    margin-bottom: 24px; /* Increased from 20px */
  }
  
  .card-button {
    background-color: #2D9CDB;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 20px; /* Increased from 8px 16px */
    font-size: 15px; /* Increased from 14px */
    cursor: pointer;
    align-self: center; /* Changed from flex-middle to center */
    transition: background-color 0.3s;
    margin-top: auto;
    width: 60%; /* Added width to make button more prominent */
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