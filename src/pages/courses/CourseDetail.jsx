import React, { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

const CourseDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 50px 20px 50px;
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
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  flex: 1;
  height: 100%;
  width: calc(50% - 10px);
  min-height: 500px;

  @media (max-width: 1200px) {
    width: 100%;
    min-height: 500px;
  }
`;

const PlayButton = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:before {
    content: '';
    width: 0;
    height: 0;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    border-left: 20px solid white;
    margin-left: 5px;
  }
`;

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

  // State to store course data
  const [courseData, setCourseData] = useState(null);

  // State for loading status
  const [loading, setLoading] = useState(true);

  // Fetch course data based on the ID
  useEffect(() => {
    // Simulated API call for demonstration
    const fetchCourse = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 600));

        // Mock data - replace with actual API call
        const mockCourseData = {
          id: courseId,
          title: 'Course Title',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dui felis, malesuada sit amet imperdiet vitae, convallis a ipsum. Nam ornare bibendum felis. Cras ac est eu augue dictum imperdiet sit amet non leo. Cras auctor commodo odio semper blandit. Ut felis nulla, scelerisque eget suscipit nec, mattis in turpis.',
        };

        setCourseData(mockCourseData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
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

  return (
    <CourseDetailContainer>
      <BackButtonContainer>
        <BackButton to='/courses'>
          <BackArrow />
        </BackButton>
      </BackButtonContainer>

      <ContentWrapper>
        <VideoContainer>
          <PlayButton />
        </VideoContainer>

        <CourseInfo>
          <CourseTitle>{courseData.title}</CourseTitle>

          <Description>
            <h2>Description:</h2>
            <p>{courseData.description}</p>
          </Description>

          <RegisterButton>Register for this course</RegisterButton>
        </CourseInfo>
      </ContentWrapper>
    </CourseDetailContainer>
  );
};

export default CourseDetail;
