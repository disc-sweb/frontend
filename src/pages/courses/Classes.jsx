import React from 'react';
import styled from 'styled-components';
import ClassCard from './ClassCard';

const ClassesStyling = styled.div`
  /* Apply these styles to html and body to ensure full height coverage */
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #FBE9FD;
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
  background-color: #FBE9FD;
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

const SampleClassData = [
  // Your existing data
  {
    class_title: 'Class 1',
    class_duration: '1 hour',
    class_price: 10.00,
    class_description: 'This is class 1'
  },
  {
    class_title: 'Class 2',
    class_duration: '2 hours',
    class_price: 20.00,
    class_description: 'This is class 2'
  },
  {
    class_title: 'Class 3',
    class_duration: '3 hours',
    class_price: 30.00,
    class_description: 'This is class 3'
  },
];

const Classes = () => {
  return (
    <ClassesStyling>
      <div className="header-container">
        <h1>Courses</h1>
        <button className="add-course-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#007575" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Course
        </button>
      </div>
      <div className='courses-container'>
        {SampleClassData.map((classData, index) => (
          <ClassCard
            key={index}
            class_title={classData.class_title}
            class_duration={classData.class_duration}
            class_price={classData.class_price}
            class_description={classData.class_description}
          />
        ))}
      </div>
    </ClassesStyling>
  );
};

export default Classes;