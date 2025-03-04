import React from 'react';

import GenericButton from 'common/components/GenericButton';

export default function TestPage() {
  const handleButtonClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <h1>Test GenericButton Component</h1>
      <div>
        <GenericButton
          text='Click Me'
          bgColor='#007bff'
          hoverBgColor='#0056b3'
          fontSize='18px'
          padding='10px 20px'
          onClick={handleButtonClick}
        />
      </div>
      <div>
        <GenericButton
          text='Another Button'
          color='black'
          bgColor='grey'
          hoverBgColor='darkgrey'
          fontSize='14px'
          padding='8px 16px'
          onClick={handleButtonClick}
        />
      </div>
      <div>
        <GenericButton
          text='Button with Icon'
          color='white'
          bgColor='#28a745'
          hoverBgColor='#218838'
          fontSize='16px'
          padding='12px 24px'
          hasIcon={true}
          iconSrc='https://example.com/icon.png' // Use a valid icon URL
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
}
