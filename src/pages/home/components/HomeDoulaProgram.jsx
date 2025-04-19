import React from 'react';

import styled from 'styled-components';

import GenericButton from 'common/components/GenericButton';
import homepagedoula from 'pages/home/images/homepagedoula.png';

import './HomeDoulaProgram.css';

const TealButton = {
  bgColor: '#007F80',
  padding: '12px 40px',
  color: 'white',
  fontSize: '16px',
  hoverBgColor: '#005F60',
};

const ButtonDiv = styled.div`
  padding: 72px 0;
  display: flex;
  gap: 72px;
  justify-content: center;
`;

export default function HomeDoulaProgram() {
  return (
    <div>
      <div className='text-container'>

        <div className='academy-description'>
          <p className='academy-description-text'>
            Sokana Collective&apos;s Training Academy offers comprehensive
            programs to meet to meet the requirements for becoming an Illinois
            Medicaid-Certified Doula. Our training will prepare you to take
            Medicaid clients and bill insurance directly, putting you on the
            path to a successful doula career.
          </p>
          <img
            src={homepagedoula}
            alt='Baby'
            className='academy-description-img'
          />
        </div>
      </div>
      <ButtonDiv>
        <GenericButton {...TealButton} text='LEARN MORE' />
        <GenericButton {...TealButton} text='REQUIRED TRAININGS' />
      </ButtonDiv>
    </div>
  );
}
