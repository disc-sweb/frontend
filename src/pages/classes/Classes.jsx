import React from 'react';

import styled from 'styled-components';
import ClassCard from './ClassCard';

const ClassesStyling = styled.div`
  h1 {
    text-align: center;
    color: #007575;
  }

  .courses-countainer {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;   
  }
    padding: 50px 100px 0px 100px;
    height: 100%;
    background-color:#FBE9FD;
`;

const SampleClassData = [
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
]

const Classes = () => {
  return (
    <ClassesStyling>
      <h1>Classes</h1>
      <div className='courses-countainer'>
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
