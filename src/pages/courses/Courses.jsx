import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Footer from 'common/components/footer/Footer';
import { useUser } from 'common/contexts/UserContext';

import CourseCard from './CourseCard';

const CoursesStyling = styled.div`
  /* Apply these styles to html and body to ensure full height coverage */
  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #fbe9fd;
  }

  h1 {
    text-align: center;
    color: #007575;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 20px;
    margin: 0;
  }

  .header-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
  }

  .add-course-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 12px 12px;
    margin-top: 10px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 800px;
    color: #007575;
  }

  .add-course-button:hover {
    background-color: #f5f5f5;
  }

  .add-course-button svg {
    margin-right: 6px;
    width: 16px;
    height: 16px;
  }

  .language-button-green {
    padding: 12px 40px;
    border: 2px solid #007f80;
    background: #007f80;
    color: #ffffff;
    font-size: 16px;
  }

  .language-button-white {
    padding: 12px 40px;
    border: 2px solid #007f80;
    background: #ffffff;
    color: #007f80;
    font-size: 16px;
  }

  .courses-container {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
  }

  .language-container {
    display: flex;
    padding: 48px 120px;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    align-self: stretch;
  }

  .language-button-container {
    display: flex;
    gap: 8px;
  }

  padding: 50px 100px 256px 100px;
  min-height: 100vh;
  height: auto;
  background-color: #fbe9fd;
  width: 100%;
  position: relative;
  overflow: auto;
  margin: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 30px 20px 30px 20px;

    .courses-container {
      justify-content: center;
    }
  }
`;

const Courses = () => {
  const [userCourses, setUserCourses] = useState([]);
  const [nonUserCourses, setNonUserCourses] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('English');

  // Filter courses based on selected language
  const filteredNonUserCourses = nonUserCourses.filter(
    (course) => course.language === language
  );

  const filteredUserCourses = userCourses.filter(
    (course) => course.language === language
  );

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const BACKEND_URL =
          process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${BACKEND_URL}/courses`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        console.log('courses data: ', data);
        console.log('response: ', data);
        setUserCourses(data['userCourses']);
        setNonUserCourses(data['nonUserCourses']);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <CoursesStyling>
        <div className='header-container'>
          <h1>Courses</h1>
          {user?.admin_access && (
            <button
              className='add-course-button'
              onClick={() => navigate('/upload')}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='#007575'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='12' y1='5' x2='12' y2='19'></line>
                <line x1='5' y1='12' x2='19' y2='12'></line>
              </svg>
              Add Course
            </button>
          )}
        </div>
        <div className='language-container'>
          <h3>SELECT LANGUAGE</h3>
          <div className='language-button-container'>
            <button
              className={
                language === 'English'
                  ? 'language-button-green'
                  : 'language-button-white'
              }
              onClick={() => setLanguage('English')}
            >
              English
            </button>
            <button
              className={
                language === 'Spanish'
                  ? 'language-button-green'
                  : 'language-button-white'
              }
              onClick={() => setLanguage('Spanish')}
            >
              Español
            </button>
          </div>
        </div>
        <div className='courses-container'>
          {filteredNonUserCourses.map((classData, index) => (
            <CourseCard
              key={index}
              course_id={classData.id}
              course_title={classData.title}
              course_type={classData.course_type}
              course_price={classData.price}
              course_description={classData.description}
              course_image={classData.cover_image_link}
              courseOwner={false}
            />
          ))}
          {filteredUserCourses.map((classData, index) => (
            <CourseCard
              key={index}
              course_id={classData.id}
              course_title={classData.title}
              course_type={classData.course_type}
              course_price={classData.price}
              course_description={classData.description}
              course_image={classData.cover_image_link}
              courseOwner={true}
            />
          ))}
        </div>
      </CoursesStyling>
      <Footer />
    </div>
  );
};

export default Courses;
