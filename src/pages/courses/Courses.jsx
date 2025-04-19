import React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import Footer from 'common/components/footer/Footer';

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

  .courses-container {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
  }

  padding: 50px 100px 50px 100px;
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
  const [courses, setCourses] = useState([]);

  //sample courses for now to test frontend
  const sampleCourses = [
    {
      id: 1,
      title: 'React for Beginners',
      class_duration: '4 weeks',
      price: 49.99,
      description: 'Learn the basics of React, including components and hooks.',
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      class_duration: '6 weeks',
      price: 79.99,
      description: 'Deep dive into closures, async/await, and ES6+ features.',
    },
    {
      id: 3,
      title: 'UI Design Principles',
      class_duration: '3 weeks',
      price: 59.99,
      description:
        'Create stunning, accessible interfaces using Figma and CSS.',
    },
  ];

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const backendUrl =
          process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
        const response = await fetch(`${backendUrl}/courses`);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  //sample courses for now to test frontend
  useEffect(() => {
    setCourses(sampleCourses);
  }, []);

  return (
    <div>
      <CoursesStyling>
        <div className='header-container'>
          <h1>Courses</h1>
          <button className='add-course-button'>
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
        </div>
        <div className='courses-container'>
          {courses.map((classData, index) => (
            <CourseCard
              key={index}
              course_id={classData.id}
              course_title={classData.title}
              course_duration={classData.class_duration}
              course_price={classData.price}
              course_description={classData.description}
            />
          ))}
        </div>
      </CoursesStyling>
      <Footer />
    </div>
  );
};

export default Courses;
