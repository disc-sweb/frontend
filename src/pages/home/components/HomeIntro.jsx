import React from 'react';

import { useNavigate } from 'react-router-dom';

import GenericButton from 'common/components/GenericButton';

import './HomeIntro.css';

const TealButton = {
  bgColor: '#007F80',
  padding: '12px 40px',
  color: 'white',
  fontSize: '16px',
  hoverBgColor: '#005F60',
};

export default function HomeIntro() {
  const navigate = useNavigate();

  const handleCertification = () => {
    window.open(
      'https://www.sokanacollective.com/what-you-will-lean',
      '_blank'
    );
  };

  const handleAllCourses = () => {
    navigate('/courses');
  };

  return (
    <div className='homeintro'>
      <p className='greytext'>
        Ready to embark on a transformative journey of learning and growth?
      </p>
      <p className='greytext'>
        Explore our classes below and take the first step towards becoming a
        certified doula with the Sokana Collective Doula Training Academy.
      </p>
      <div className='buttondiv'>
        <GenericButton
          {...TealButton}
          text='FULL SPECTRUM DOULA CERTIFICATION'
          onClick={handleCertification}
        />
        <GenericButton
          {...TealButton}
          text='ALL COURSES'
          onClick={handleAllCourses}
        />
      </div>
    </div>
  );
}
