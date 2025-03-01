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

const Classes = () => {
  return (
    <ClassesStyling>
      <h1>Classes</h1>
      <div className='courses-countainer'></div>
    </ClassesStyling>
  );
};



export default Classes;
