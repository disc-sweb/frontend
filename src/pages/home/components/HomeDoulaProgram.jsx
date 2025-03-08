import React from 'react';

import homepagedoula from 'pages/home/images/homepagedoula.png';

import './HomeDoulaProgram.css';

export default function HomeDoulaProgram() {
  return (
    <div>
      <div className='text-container'>
        <p className='text-description'>
          SIU School of Medicine&apos;s Office of Certification Strategies
          administers the Illinois Medicaid-Certified Doula Program with
          oversight guidance by the Illinois Department of Healthcare and Family
          Services.
        </p>
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
            alt='Logo'
            className='academy-description-img'
          />
        </div>
      </div>
    </div>
  );
}
