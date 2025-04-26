import React from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Footer from 'common/components/footer/Footer';

const RegisterStyling = styled.div`
  min-height: 100vh;
  background-color: #f3e8ff; /* soft purple */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;

  .registration-card {
    background-color: white;
    padding: 64px 40px;
    border-radius: 4px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    min-height: 400px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 24px;
    font-family: 'Helvetica Neue', sans-serif;
  }
  .card-content {
    flex: 1;
    justify-content: space-evenly;
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a202c;
    text-align: left;
  }

  p {
    color: #4a5568;
    line-height: 1.6;
    font-size: 0.95rem;
  }

  .form-label {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.85rem;
    color: #1a202c;
  }

  .form-link {
    color: #3182ce;
    font-weight: 500;
    text-decoration: none;
    font-size: 0.95rem;
    margin-top: 24px;
    display: inline-block;
  }

  .form-link:hover {
    text-decoration: underline;
  }

  .payment-button {
    background-color: #2d2d2d;
    color: white;
    border: none;
    padding: 14px 24px;
    font-size: 0.95rem;
    font-weight: 600;
    border-radius: 9999px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s ease;
  }

  .payment-button:hover {
    background-color: #1a1a1a;
  }

  .close-button {
    position: absolute;
    top: 24px;
    right: 24px;
    font-size: 1.2rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
  }
`;

const Register = () => {
  // const { classId } = useParams();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const { state } = useLocation();

  const handleRegister = async () => {
    try {
      console.log('Registering for course...');
      const BACKEND_URL =
        process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
      const token = localStorage.getItem('authToken');

      const res = await fetch(
        `${BACKEND_URL}/courses/purchaseCourse/${courseId}`, // no stray apostrophes!
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { url } = await res.json();

      if (!url) {
        throw new Error('No checkout URL returned');
      }

      // 3️⃣ Redirect the browser straight to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      console.error('Purchase error:', err);
      // show a user-friendly notification...
    }
  };

  const course = state.extraData;
  return (
    <div>
      <RegisterStyling>
        <div className='registration-card'>
          <button className='close-button' onClick={() => navigate('/courses')}>
            ✕
          </button>
          <div className='card-content'>
            <h2>{course.title} Course Registration</h2>

            <p>{course.description}</p>

            <div>
              <div className='form-label'>
                Please fill out the following Google Form to register:
              </div>
              <a
                className='form-link'
                href='https://forms.gle/your-form-link-here'
                target='_blank'
                rel='noopener noreferrer'
              >
                {course.form_link}
              </a>
            </div>
          </div>
          <button className='payment-button' onClick={handleRegister}>
            Continue to Payment
          </button>
        </div>
      </RegisterStyling>
      <Footer />
    </div>
  );
};

export default Register;
