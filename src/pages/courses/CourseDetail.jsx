import React, { useEffect, useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Footer from 'common/components/footer/Footer';

import VideoPlayer from './VideoPlayer';

const CourseDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px 50px 150px 50px;
`;

const BackButtonContainer = styled.div`
  margin-bottom: 20px;
`;

const BackButton = styled(Link)`
  display: flex;
  text-decoration: none;
`;

const BackArrow = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M19 12H5'
      stroke='black'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M12 19L5 12L12 5'
      stroke='black'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: calc(50% - 10px);
  aspect-ratio: 16 / 9; // Ensures correct video shape
  overflow: hidden;
  border-radius: 4px;

  @media (max-width: 1200px) {
    width: 100%;
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

// const VideoPlaceholder = styled.div`
//   background-color: #f0f0f0;
//   width: 100%;
//   max-width: 800px;
//   margin: 0 auto;
//   border-radius: 8px;
//   display: flex;
//   align-items: center; // Vertical center
//   justify-content: center; // Horizontal center

//   height: 500px;

//   @media (max-width: 1024px) {
//     height: 400px;
//   }

//   @media (max-width: 768px) {
//     height: 300px;
//   }

//   @media (max-width: 480px) {
//     height: 200px;
//   }
// `;

// const PlayButton = styled.div`
//   width: 60px;
//   height: 60px;
//   background-color: rgba(0, 0, 0, 0.6);
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   &::before {
//     content: '';
//     display: block;
//     width: 0;
//     height: 0;
//     border-left: 15px solid white;
//     border-top: 10px solid transparent;
//     border-bottom: 10px solid transparent;
//   }
// `;

const CourseInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  flex: 1;
  width: calc(50% - 10px);

  @media (max-width: 1200px) {
    width: 100%;
    padding: 0;
  }
`;

const CourseTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #2e7d6f;
  margin-bottom: 16px;
`;

const Description = styled.div`
  margin-bottom: 30px;

  h2 {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 10px;
  }

  p {
    font-size: 15px;
    line-height: 1.6;
    color: #333;
  }
`;

const RegisterButton = styled.button`
  background-color: #2e7d6f;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  width: fit-content;
  align-self: flex-start;
  margin-top: auto;
  text-transform: uppercase;

  &:hover {
    background-color: #256559;
  }
`;

const CourseDetail = () => {
  // Get the courseId parameter from the URL
  const { courseId } = useParams();
  const navigate = useNavigate();

  // State to store course data and  user course data
  const [courseData, setCourseData] = useState(null);
  const [userId, setUserId] = useState(null);
  // const [userCourseData, setUserCourseData] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);

  // State for loading status
  const [courseLoading, setCourseLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl =
    process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
  const token = localStorage.getItem('authToken');

  // Fetch course data based on the ID
  useEffect(() => {
    // Simulated API call for demonstration
    const fetchCourse = async () => {
      try {
        if (!token) throw new Error('User not logged in.');

        const response = await fetch(`${backendUrl}/courses/${courseId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Course not found');
        }
        const data = await response.json();
        setCourseData(data);
        console.log('Course data:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setCourseLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, token, backendUrl]);

  // Fetch User Id from the backend
  useEffect(() => {
    // Simulated API call for demonstration
    const fetchUserId = async () => {
      try {
        if (!token) throw new Error('User not logged in.');

        const response = await fetch(`${backendUrl}/auth/me`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        setUserId(data.id);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError(error.message);
      }
    };

    fetchUserId();
  }, [backendUrl, token]);

  // Get User Couse Data from the backend
  useEffect(() => {
    // Simulated API call for demonstration
    const fetchUserCourses = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`${backendUrl}/courses/getUserCourses`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user courses');
        }
        const data = await response.json();
        console.log('User course data:', data);

        const courseIds = data
          .map((entry) => entry.courses?.id) // optional chaining to avoid crash if null
          .filter(Boolean) // remove undefined/null
          .map((id) => String(id)); // normalize to strings

        // Compare courseId from URL (string) with the IDs from backend
        const registered = courseIds.includes(String(courseId));
        console.log('User Courses:', courseIds);
        setIsRegistered(registered);
      } catch (error) {
        console.error('Error fetching user courses:', error);
        setError(error.message);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUserCourses();
  }, [userId, backendUrl, courseId, token]);

  useEffect(() => {
    if (error) {
      navigate('/NotFound');
    }
  }, [error, navigate]);

  if (courseLoading || userLoading) {
    return (
      <CourseDetailContainer>
        <BackButtonContainer>
          <BackButton to='/courses'>
            <BackArrow />
          </BackButton>
        </BackButtonContainer>
        <div style={{ padding: '40px', textAlign: 'center' }}>
          Loading course information...
        </div>
      </CourseDetailContainer>
    );
  }

  if (!courseData) {
    return null;
  }

  // Check if the user is registered for the course
  const handleRegister = () => {
    if (isRegistered) return;
    navigate('/register'); // Redirect to registration page
    alert('You have successfully registered for this course!');
    setIsRegistered(true); // Simulated registration — replace with real API
  };

  return (
    <div>
      <CourseDetailContainer>
        <BackButtonContainer>
          <BackButton to='/courses'>
            <BackArrow />
          </BackButton>
        </BackButtonContainer>

        <ContentWrapper>
          <VideoContainer>
            <VideoPlayer
              videoLink={
                isRegistered
                  ? courseData.video_link
                  : courseData.restricted_video_link
              }
              isRegistered={isRegistered}
              src={courseData.video_link}
              title='Course Video'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            />
          </VideoContainer>

          <CourseInfo>
            <CourseTitle>{courseData.title}</CourseTitle>

            <Description>
              <h2>Description:</h2>
              <p>{courseData.description}</p>
            </Description>

            {/* Check if the user is registered for the course to show the Register Button */}
            {!isRegistered && (
              <RegisterButton onClick={handleRegister}>
                Register for this course
              </RegisterButton>
            )}
          </CourseInfo>
        </ContentWrapper>
      </CourseDetailContainer>
      <Footer />
    </div>
  );
};

export default CourseDetail;
