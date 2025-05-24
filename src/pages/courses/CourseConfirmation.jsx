import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import GenericButton from 'common/components/GenericButton';
import Footer from 'common/components/footer/Footer';

const ConfirmText = styled.p`
  color: #474747;
  font-size: 16px;
`;

const StyledComponent = styled.div`
  background-color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: 100px 50px 150px 50px;
`;

const ButtonDiv = styled.div`
  padding: 48px 0;
  display: flex;
  gap: 72px;
  justify-content: center;
`;

const TealButton = {
  bgColor: '#007F80',
  padding: '12px 40px',
  color: 'white',
  fontSize: '16px',
  hoverBgColor: '#005F60',
};

export default function CourseConfirmation() {
  // Get the courseId parameter from the URL
  const { courseId } = useParams();

  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    const fetchCourseData = async () => {
      try {
        const backendUrl =
          process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

        const token = localStorage.getItem('authToken');
        if (!token) {
          console.warn('No token found. User may not be logged in.');
          return;
        }

        const response = await fetch(`${backendUrl}/courses/${courseId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Course not found');
        }
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchCourseData();
  }, [courseId]);

  useEffect(() => {
    if (error) {
      navigate('/NotFound');
    }
  }, [error, navigate]);

  if (!course) {
    return (
      <StyledComponent>
        <p>Loading course information...</p>
      </StyledComponent>
    );
  }

  return (
    <div>
      <StyledComponent>
        <h1>
          You have successfully signed up for {course.title}
          {/*Only shows the line below if course type includes 'Online'*/}
          {course.course_type?.includes('Online') && ` at 09/19/25`}!{' '}
        </h1>
        <ConfirmText>
          We have sent an email confirming the registration. Thank you!
        </ConfirmText>
        <ButtonDiv>
          <GenericButton
            {...TealButton}
            text='CONTINUE TO COURSE'
            onClick={() => navigate(`/courses/${course?.id}`)}
          />
          <GenericButton
            {...TealButton}
            text='BROWSE MORE COURSES'
            onClick={() => navigate('/courses')}
          />
          <GenericButton
            {...TealButton}
            text='GO BACK TO HOME PAGE'
            onClick={() => navigate('/home')}
          />
        </ButtonDiv>
      </StyledComponent>
      <Footer />
    </div>
  );
}
