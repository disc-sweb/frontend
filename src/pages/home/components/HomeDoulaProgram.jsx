import React from 'react';

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

export default function HomeDoulaProgram() {
  const handleLearnMore = () => {
    window.open(
      'https://www.siumed.edu/fcm/illinois-medicaid-certified-doula-program',
      '_blank'
    );
  };

  const handleRequiredTrainings = () => {
    window.open('https://sokanacollective.as.me/schedule/2268a87e', '_blank');
  };

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
      <div className='buttondiv'>
        <GenericButton
          {...TealButton}
          text='LEARN MORE'
          onClick={handleLearnMore}
        />
        <GenericButton
          {...TealButton}
          text='REQUIRED TRAININGS'
          onClick={handleRequiredTrainings}
        />
      </div>
    </div>
  );
}
