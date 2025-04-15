import React from 'react';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// import PropTypes from 'prop-types';
// 2. Third-party modules
// import styled from 'styled-components';

// import Button from 'common/components/Button';
// 3. Absolute paths from src/
// import { useAuth } from 'common/hooks/useAuth';

// 4. Relative paths
// import { StyledContainer } from './styles';

// add styling
const RegisterStyling = styled.div`
  min-height: 100vh;
  background-color: #fbe9fd;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;

  .registration-card {
    background-color: white;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  h2 {
    color: #007575;
    margin-bottom: 16px;
    text-align: center;
  }

  .form-link {
    color: #007575;
    font-weight: 500;
    text-decoration: underline;
    cursor: pointer;
  }

  .payment-button {
    background-color: #007575;
    color: white;
    border: none;
    padding: 14px 24px;
    font-size: 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 100%;
  }

  .payment-button:hover {
    background-color: #005f5f;
  }
`;

const Register = () => {
  const { classId } = useParams();
  //   const navigate = useNavigate();

  const handlePaymentClick = () => {
    // open Stripe?
  };

  return (
    <RegisterStyling>
      <div className='signup-card'>
        {/* replace with correspinding props */}
        <h2>{course.class_title}</h2>
        <p>Description</p>
        <a
          className='form-link'
          href='https://forms.gle/your-form-link-here'
          target='_blank'
          rel='noopener noreferrer'
        >
          Registration Form
        </a>
        <button className='payment-button' onClick={handlePaymentClick}>
          Continue to Payment
        </button>
      </div>
    </RegisterStyling>
  );
};

export default Register;
