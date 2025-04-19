import React from 'react';

import styled from 'styled-components';

import GenericButton from 'common/components/GenericButton';

import './HomeIntro.css';

const GreyText = styled.p`
  color: #474747;
`;

const ButtonDiv = styled.div`
  padding: 48px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 48px 72px;
`;

const TealButton = {
  bgColor: '#007F80',
  padding: '12px 40px',
  color: 'white',
  fontSize: '16px',
  hoverBgColor: '#005F60',
};

export default function HomeIntro() {
  return (
    <div className='homeintro'>
      <GreyText>
        Ready to embark on a transformative journey of learning and growth?
      </GreyText>
      <GreyText>
        Explore our classes below and take the first step towards becoming a
        certified doula with the Sokana Collective Doula Training Academy.
      </GreyText>
      <ButtonDiv>
        <GenericButton
          {...TealButton}
          text='FULL SPECTRUM DOULA CERTIFICATION'
        />
        <GenericButton {...TealButton} text='CREATE AN ACCOUNT' />
        <GenericButton
          {...TealButton}
          text='LABOR SUPPORT CERTIFICATION FOR POSTPARTUM DOULAS'
        />
        <GenericButton {...TealButton} text='ALL COURSES' />
      </ButtonDiv>
    </div>
  );
}
