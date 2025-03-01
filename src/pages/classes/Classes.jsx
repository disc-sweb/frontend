import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const ClassesStyling = styled.div`
  h1 {
    text-align: center;
  }

  .courses-countainer {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;   
  }
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
      <div className='courses-countainer'></div>
    </ClassesStyling>
  );
};



export default Classes;
