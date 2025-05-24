import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import Footer from 'common/components/footer/Footer';

import CourseCard from './CourseCard';

const CoursesStyling = styled.div`
  /* (same styling from CoursesStyling) */
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

  .courses-container {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
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

  .language-button-container {
    display: flex;
    gap: 8px;
  }

  .filters-row {
    display: flex;
    justify-content: space-between;
    padding: 48px 120px;
    align-items: flex-start;
  }

  .filter-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  padding: 50px 100px 256px 100px;
  min-height: 100vh;
  background-color: #fbe9fd;

  @media (max-width: 768px) {
    padding: 30px 20px;
    .filters-row {
      flex-direction: column;
      gap: 24px;
    }
  }
`;

const CoursesDevPreview = () => {
  const [language, setLanguage] = useState('English');
  const [courseType, setCourseType] = useState('All');

  const mockCourses = [
    {
      id: '1',
      title: 'Intro to React',
      language: 'English',
      course_type: 'Online',
      price: 49,
      description:
        'Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.Learn the basics of React.',
      cover_image_link: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      title: 'Advanced Spanish Conversation',
      language: 'English',
      course_type: 'In-Person',
      price: 99,
      description: 'Practice your Spanish in real-time settings.',
      cover_image_link: 'https://via.placeholder.com/150',
    },
  ];

  const filteredCourses = mockCourses.filter(
    (course) =>
      course.language === language &&
      (courseType === 'All' || course.course_type === courseType)
  );

  return (
    <div>
      <CoursesStyling>
        <div className='header-container'>
          <h1>Courses (Dev Preview)</h1>
        </div>

        <div className='filters-row'>
          <div className='filter-container'>
            <h3>SELECT COURSE TYPE</h3>
            <div className='language-button-container'>
              {['All', 'Online', 'In-Person', 'Virtual'].map((type) => (
                <button
                  key={type}
                  className={
                    courseType === type
                      ? 'language-button-green'
                      : 'language-button-white'
                  }
                  onClick={() => setCourseType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className='filter-container'>
            <h3>SELECT LANGUAGE</h3>
            <div className='language-button-container'>
              {['English', 'Spanish'].map((lang) => (
                <button
                  key={lang}
                  className={
                    language === lang
                      ? 'language-button-green'
                      : 'language-button-white'
                  }
                  onClick={() => setLanguage(lang)}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className='courses-container'>
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course_id={course.id}
              course_title={course.title}
              course_type={course.course_type}
              course_price={course.price}
              course_description={course.description}
              course_image={course.cover_image_link}
              courseOwner={false}
            />
          ))}
        </div>
      </CoursesStyling>
      <Footer />
    </div>
  );
};

export default CoursesDevPreview;
